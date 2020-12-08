type MessengerUserType = {
  psid: string,
  name: string,
  firstName: string,
  lastName: string,
  profilePic?: string
}

type MessengerTextEventType = {
  'sender': {
    'id': string
  },
  'recipient': {
    'id': string
  },
  'timestamp': number,
  'message': {
    'text': string,
  }
}

type MessengerPayloadEventType = {
  'sender': {
    'id': string
  },
  'recipient': {
    'id': string
  },
  'timestamp': number,
  'postback': {
    'title': string,
    'payload': string
  }
}

type MessengerEventType = 
  MessengerTextEventType |
  MessengerPayloadEventType;

type MessengerHttpPostRequestType = {
  'object': string,
  'entry': {
    'id': string,
    'time': number,
    'messaging': MessengerEventType[]
  }[]
}

type MessengerReturnMsgObject = {
  "message": {
    "text": string,
  },
  "messaging_type": string,
  "recipient": {
    "id": string,
  },
}

export {
  MessengerUserType,
  MessengerEventType,
  MessengerHttpPostRequestType,
  MessengerReturnMsgObject
};