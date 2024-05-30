import json
import boto3
from botocore.exceptions import ClientError
from datetime import datetime, timedelta, timezone

# tz = pytz.timezone('America/Chicago')
# timestamp = datetime.now(tz).strftime('%Y-%m-%d %H:%M:%S.%f')

dynamodb = boto3.resource('dynamodb')
dynamodb_table = dynamodb.Table('SP_posts')


def lambda_handler(event, context):
    print('Request event: ', event)
    response = None
   
    try:
        http_method = event.get('httpMethod')

        if http_method == 'GET':
            if event['queryStringParameters']:
                response = get_post(event['queryStringParameters']['name'])
            else:
                response = get_all_posts()

        elif http_method == 'POST':
            time = datetime.now(timezone.utc)
            cstOffset = timedelta(hours=-5)

            body = json.loads(event['body'])
            body['timestamp'] = str(time + cstOffset)[:-6]
            
            response = save_employee(body)

        elif http_method == 'PATCH':
            body = json.loads(event['body'])
            response = modify_employee(body['employeeId'], body['updateKey'], body['updateValue'])

        elif http_method == 'DELETE':
            body = json.loads(event['body'])
            response = delete_employee(body['employeeId'])
        else:
            response = build_response(404, '404 Not Found')

    except Exception as e:
        print('Error:', e)
        response = build_response(400, 'Error processing request')
   
    return response

def get_post(employee_id):
    try:
        response = dynamodb_table.get_item(Key={'name': employee_id})
        return build_response(200, response.get('Item'))
        
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def get_all_posts():
    try:
        response = dynamodb_table.scan()
        data = response.get('Items', [])
        
        # Continue scanning if there are more pages of data
        while 'LastEvaluatedKey' in response:
            response = dynamodb_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response.get('Items', []))
        
        return build_response(200, data)
    
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def save_employee(request_body):
    try:
        dynamodb_table.put_item(Item=request_body)
        body = {
            'Item': request_body,
            'Message': 'SUCCESS',
            'Operation': 'POST'
        }
        return build_response(200, body)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def modify_employee(employee_id, update_key, update_value):
    try:
        response = dynamodb_table.update_item(
            Key={'employeeid': employee_id},
            UpdateExpression=f'SET {update_key} = :value',
            ExpressionAttributeValues={':value': update_value},
            ReturnValues='UPDATED_NEW'
        )
        body = {
            'Operation': 'UPDATE',
            'Message': 'SUCCESS',
            'UpdatedAttributes': response
        }
        return build_response(200, body)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def delete_employee(employee_id):
    try:
        response = dynamodb_table.delete_item(
            Key={'employeeid': employee_id},
            ReturnValues='ALL_OLD'
        )
        body = {
            'Operation': 'DELETE',
            'Message': 'SUCCESS',
            'Item': response
        }
        return build_response(200, body)
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def build_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json'
            },
        'body': json.dumps(body)
    }