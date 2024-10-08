import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime, timedelta, timezone
import requests

RECAPTCHA_SECRET_KEY = ''

dynamodb = boto3.resource('dynamodb')
dynamodb_table = dynamodb.Table('SP_posts')

def lambda_handler(event, context):
    print('Request event: ', event)
    response = None

    try:
        http_method = event.get('httpMethod')

        if http_method == 'OPTIONS':
            response = build_response(200, 'Preflight response', cors=True)

        elif http_method == 'GET':
            if event['queryStringParameters']:
                if 'name' in event['queryStringParameters']:
                    response = get_posts_by_name(event['queryStringParameters']['name'])
                elif 'timestamp' in event['queryStringParameters']:
                    response = get_post_by_timestamp(event['queryStringParameters']['timestamp'])
                elif 'all' in event['queryStringParameters']:
                    response = get_all_posts()
            else:
                response = get_all_approved_posts()

        elif http_method == 'POST':
            if event['queryStringParameters']:
                timestamp = event['queryStringParameters']['xtimestampx']
                response = approve_post(timestamp)
            else:
                body = json.loads(event['body'])
                
                # Validate reCAPTCHA token
                captcha_response = body.get('captchaToken')
                if not captcha_response or not validate_recaptcha(captcha_response):
                    return build_response(403, "Validation failed", cors=True)

                response = post_post(body)

        # elif http_method == 'PATCH':
        #     body = json.loads(event['body'])
        #     response = modify_employee(body['employeeId'], body['updateKey'], body['updateValue'])

        elif http_method == 'DELETE':
            timestamp = event['pathParameters']['timestamp']
            body = json.loads(event['body'])
            input_password = body['password']

            response = delete_employee(timestamp, input_password)

        else:
            response = build_response(404, '404 Not Found', cors=True)

    except Exception as e:
        print('Error:', e)
        response = build_response(400, 'Error processing request', cors=True)

    return response

def get_posts_by_name(name):
    try:
        response = dynamodb_table.scan(
            FilterExpression=Attr('name').eq(name)
        )
        items = response.get('Items', [])
        return build_response(200, items, cors=True)
    
    except ClientError as e:
        return build_response(400, e.response['Error']['Message'], cors=True)

def get_post_by_timestamp(timestamp):
    try:
        response = dynamodb_table.query(
            KeyConditionExpression=Key('timestamp').eq(timestamp)
        )
        data = response.get('Items', [])

        if data:
            return build_response(200, data[0], cors=True)
        else:
            return build_response(404, {'Error': 'Item not found'}, cors=True)
        
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'], cors=True)

def get_all_posts():
    try:
        response = dynamodb_table.scan()
        data = response.get('Items', [])

        while 'LastEvaluatedKey' in response:
            response = dynamodb_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response.get('Items', []))

        for item in data:
            item.pop('password', None)

        return build_response(200, data, cors=True)

    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'], cors=True)
    
def get_all_approved_posts():
    try:
        response = dynamodb_table.scan(
            FilterExpression=Attr('approved').eq(True) 
        )
        data = response.get('Items', [])

        while 'LastEvaluatedKey' in response:
            response = dynamodb_table.scan(
                ExclusiveStartKey=response['LastEvaluatedKey'],
                FilterExpression=Attr('approved').eq(True)
            )
            data.extend(response.get('Items', []))

        for item in data:
            item.pop('password', None)

        return build_response(200, data, cors=True)

    except ClientError as e:
        return build_response(400, e.response['Error']['Message'], cors=True)


def valid_post(request_body):
    required_keys = {"name", "class", "game", "price", "contact", "password"}
    missing_keys = required_keys - request_body.keys()

    if missing_keys:
        print(f"Invalid request body. Missing keys: {', '.join(missing_keys)}")
        return False
    
    return True

def approve_post(timestamp):
    try:
        response = dynamodb_table.query(
            KeyConditionExpression=Key('timestamp').eq(timestamp)
        )
        
        items = response.get('Items', [])
        if not items:
            return build_response(404, "Post not found", cors=True)

        name = items[0]['name']

        dynamodb_table.update_item(
            Key={
                'timestamp': timestamp,
                'name': name
            },
            UpdateExpression="SET approved = :approved",
            ExpressionAttributeValues={
                ':approved': True
            }
        )

        return build_response(200, "Post approved", cors=True)

    except ClientError as e:
        return build_response(400, e.response['Error']['Message'], cors=True)

def post_post(request_body):
    try:
        allowed_games = ["Notre Dame","McNeese State","Bowling Green","Arkansas","Missouri","LSU","NM State","Texas"]
        if request_body['game'] not in allowed_games:
            return build_response(400, "Invalid game", cors=True)
        
        allowed_class = ["U1","U2","U3","U4"]
        if request_body['class'] not in allowed_class:
            return build_response(400, "Invalid class", cors=True)
        
        price = float(request_body['price'])
        if price > 400 or price < -400 or len(str(price)) > 7: # max length '-888.88'
            return build_response(400, "Invalid price", cors=True)
        
        contact = request_body['contact']
        if len(contact.split(" ")) > 4 or len(contact) > 22:
            return build_response(400, "Invalid contact", cors=True)
        
        name = request_body['name']
        if len(name.split(" ")) > 4 or len(name) > 22:
            return build_response(400, "Invalid name", cors=True)
        
        password = request_body['password']
        if len(password) > 12:
            return build_response(400, "Invalid password", cors=True)
        
        print("creating post request")
        time = datetime.now(timezone.utc)
        cstOffset = timedelta(hours=-5)
        timestamp = str(time + cstOffset)[:-6]

        timestamp = timestamp.replace(" ", "T").replace(":", "-")
        print("request body" , request_body)

        if not valid_post(request_body):
            return build_response(400, "invalid request body", cors=True)
        
        request_body['timestamp'] = timestamp
        request_body['approved'] = False

        dynamodb_table.put_item(Item=request_body)
        return build_response(200, request_body, cors=True)
    
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'], cors=True)

# def modify_employee(employee_id, update_key, update_value):
#     try:
#         response = dynamodb_table.update_item(
#             Key={'employeeid': employee_id},
#             UpdateExpression=f'SET {update_key} = :value',
#             ExpressionAttributeValues={':value': update_value},
#             ReturnValues='UPDATED_NEW'
#         )
#         body = {
#             'Operation': 'UPDATE',
#             'Message': 'SUCCESS',
#             'UpdatedAttributes': response
#         }
#         return build_response(200, body, cors=True)
#     except ClientError as e:
#         print('Error:', e)
#         return build_response(400, e.response['Error']['Message'], cors=True)

def validate_recaptcha(captcha_response):
    """Validate reCAPTCHA response."""
    payload = {
        'secret': RECAPTCHA_SECRET_KEY,
        'response': captcha_response,
    }
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
    result = response.json()

    # Check if the reCAPTCHA was successful
    return result.get('success', False) and result.get('score', 0) >= 0.5

def delete_employee(timestamp, input_password):
    try:
        query = dynamodb_table.query(
            KeyConditionExpression=Key('timestamp').eq(timestamp)
        )
        data = query.get('Items', [])

        if not data:
            return build_response(404, {'error': 'Item not found'}, cors=True)
        
        name = data[0]['name']
        password = data[0]['password']
        if password != input_password:
            return build_response(403, {'error': 'Invalid password'}, cors=True)
        
        dynamodb_table.delete_item(
            Key={
                'timestamp': timestamp,
                'name': name
            }
        )

        body = {
            'Operation': 'DELETE',
            'Message': 'SUCCESS',
            'timestamp': timestamp,
            'name': name
        }
        
        return build_response(200, body, cors=True)
    
    except ClientError as e:
        print('Error:', e)
        return build_response(400, e.response['Error']['Message'], cors=True)

def build_response(status_code, body, cors=False):
    headers = {'Content-Type': 'application/json'}
    if cors:
        headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
        })

    return {
        'statusCode': status_code,
        'body': json.dumps(body),
        'headers': headers
    }