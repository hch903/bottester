type LineUserType = {
  displayName: string,
  userId: string,
  language?: string,
  pictureUrl?: string,
  statusMessage?: string
}

type LineTextEventType = {
  'type': string,
  'replyToken': string,
  'source': {
    'type': string,
    'userId': string
  },
  'timestamp': number,
  'mode': string,
  'message': {
    'type': string,
    'id': string,
    'text': string 
  }
}
type LineEventType = 
  LineTextEventType;

type LineHttpPostRequestType = {
  'destination': string,
  'events': LineEventType[]
}

type LineReturnMsgObject = {
  'messages': {
    'text': string,
    'type': string,
  }[],
  'replyToken': string
}

export {
  LineUserType,
  LineEventType,
  LineHttpPostRequestType,
  LineReturnMsgObject
};