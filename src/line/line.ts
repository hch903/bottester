
import express from 'express';

import CoreMethod from '../core/method';
import { LineEventType } from './type';
import { sendEvent as LineSendEvent} from './mock';

const timestamp = Date.now();

class LineMethod extends CoreMethod<LineEventType> {
  async sendEvent(
    server: express.Application | void,
    event: LineEventType
  ) {
    return LineSendEvent(server, event);
  }
  
  async sendLineTextEvent (
    server: express.Application | void,
    userId: string,
    text: string
  ) {
    const mockReplyToken = 'replyToken';
    const mockMessageId = 'messageId';
    return this.sendEvent(server, {
      'type': 'message',
      'replyToken': mockReplyToken,
      'source': {
        'type': 'user',
        'userId': userId
      },
      'timestamp': timestamp,
      'mode': 'active',
      'message': {
        'type': 'text',
        'id': mockMessageId,
        'text': text
      }
    })
  }
}

export default LineMethod;