import express from 'express';

import CoreMethod from '../core/method';
import { MessengerEventType } from './type';
import { sendEvent as MessengerSendEvent} from './mock';

const timestamp = Date.now();

class MessengerMethod extends CoreMethod<MessengerEventType> {
  async sendEvent(
    server: express.Application | void,
    event: MessengerEventType
  ) {
    return MessengerSendEvent(server, event);
  }
  
  async sendMessengerTextEvent (
    server: express.Application | void,
    psid: string,
    messengerPageId: string,
    text: string
  ) {
    return this.sendEvent(server, {
      'sender': {
        'id': psid
      },
      'recipient': {
        'id': messengerPageId
      },
      'timestamp': timestamp,
      'message': {
        'text': text,
      }
    })
  }
  
  async sendMessengerPayloadEvent (
    server: express.Application | void,
    psid: string,
    messengerPageId: string,
    title: string,
    payload: string
  ) {
    return this.sendEvent(server, {
      'sender': {
        'id': psid
      },
      'recipient': {
        'id': messengerPageId
      },
      'timestamp': timestamp,
      'postback': {
        'title': title,
        'payload': payload
      }
    }) 
  }
}

export default MessengerMethod;