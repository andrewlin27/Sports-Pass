import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from datetime import datetime, timedelta, timezone


dynamodb = boto3.resource('dynamodb')
dynamodb_table = dynamodb.Table('SP_posts')


def lambda_handler(event, context):
    print('Request event: ', event)
    response = None
   
    try:
        http_method = event.get('httpMethod')

        if http_method == 'GET':
            if event['queryStringParameters']:
                if 'name' in event['queryStringParameters']:
                    response = get_posts_by_name(event['queryStringParameters']['name'])
                elif 'timestamp' in event['queryStringParameters']:
                    response = get_post_by_timestamp(event['queryStringParameters']['timestamp'])
            else:
                response = get_all_posts()

        elif http_method == 'POST':
            body = json.loads(event['body'])
            response = post_post(body)

        elif http_method == 'PATCH':
            body = json.loads(event['body'])
            response = modify_employee(body['employeeId'], body['updateKey'], body['updateValue'])

        elif http_method == 'DELETE':
            timestamp = event['queryStringParameters']['timestamp']
            name = event['queryStringParameters']['name']

            response = delete_employee(timestamp, name)

        else:
            response = build_response(404, '404 Not Found')

    except Exception as e:
        print('Error:', e)
        response = build_response(400, 'Error processing request')
   
    return response

def get_posts_by_name(name):
    try:
        response = dynamodb_table.query(
            IndexName='name-index',
            KeyConditionExpression=Key('name').eq(name)
        )
        data = response.get('Items', [])
        
        
        while 'LastEvaluatedKey' in response:
            response = dynamodb_table.query(
                IndexName='name-index',
                KeyConditionExpression=Key('name').eq(name),
                ExclusiveStartKey=response['LastEvaluatedKey']
            )
            data.extend(response.get('Items', []))
        
        return build_response(200, data)
        
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])
    
def get_post_by_timestamp(timestamp):
    try:
        response = dynamodb_table.query(
            KeyConditionExpression=Key('timestamp').eq(timestamp)
        )
        data = response.get('Items', [])
        
        return build_response(200, data[0])
    
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def get_all_posts():
    try:
        response = dynamodb_table.scan()
        data = response.get('Items', [])
        
        while 'LastEvaluatedKey' in response:
            response = dynamodb_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response.get('Items', []))
        
        return build_response(200, data)
    
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def post_post(request_body):
    try:
        time = datetime.now(timezone.utc)
        cstOffset = timedelta(hours=-5)
        request_body['timestamp'] = str(time + cstOffset)[:-6]

        dynamodb_table.put_item(Item=request_body)

        return build_response(200, request_body)
    
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

def delete_employee(timestamp, name):
    
    try:
        response = dynamodb_table.delete_item(
            # for composite primary key, need both partition and sort key. for simple primary key, only partition key
            # could remove name as sort key so that can use path parameter
            Key={
                'timestamp': timestamp,
                'name': name
            },
            ReturnValues='ALL_OLD'
        )

        # Item was found and deleted
        if 'Attributes' in response:
            body = {
                'Item': response['Attributes'],
                'Operation': 'DELETE',
                'Message': 'SUCCESS'
            }
            return build_response(200, body)
        
        else:
            body ={'Error': 'Item not found'}

            return build_response(404, body)
    
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'])

def build_response(status_code, body):
    return {
        'statusCode': status_code,
        'body': json.dumps(body),
        'headers': {'Content-Type': 'application/json'}
    }