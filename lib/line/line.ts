
import express from 'express';
import { LineEventType } from './type';
import { sendEvent as LineSendEvent} from './mock';

const timestamp = Date.now();

async function sendEvent(
  server: express.Application | void,
  event: LineEventType
) {
  return LineSendEvent(server, event);
}

export async function sendLineTextEvent (
  server: express.Application | void,
  userId: string,
  text: string
) {
  const mockReplyToken = 'replyToken';
  const mockMessageId = 'messageId';
  return sendEvent(server, {
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