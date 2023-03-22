from twilio.rest import Client
from keys import account_sid, auth_token

def sendMessage(message, mobile):
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_='+15075007047',
        to=mobile,
        body=message
    )