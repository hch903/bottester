import express from 'express';

import { initializeServer } from 'bottender';
import { EventType } from './type';
import { sendEvent as messengerSendEvent } from '../messenger/messenger';
import { sendEvent as lineSendEvent} from '../line/line';

const timestamp = Date.now();

exports.setup = () => {
  return {
    server: initializeServer()
  };
}

async function sendEvent(
  platform: string,
  server: express.Application | void,
  event: EventType
) {
  switch(platform) {
    case 'messenger':
      return messengerSendEvent(server, event);
    case 'line':
      return lineSendEvent(server, event);
  }
}

exports.sendMessengerTextEvent = async (
  server: express.Application | void,
  psid: string,
  text: string
) => {
  return sendEvent('messenger', server, {
    'sender': {
      'id': psid
    },
    'recipient': {
      'id': process.env.MESSENGER_PAGE_ID
    },
    'timestamp': timestamp,
    'message': {
      'text': text,
    }
  })
}

exports.sendMessengerPayloadEvent = async (
  server: express.Application | void,
  psid: string,
  title: string,
  payload: string
) => {
  return sendEvent('messenger', server, {
    'sender': {
      'id': psid
    },
    'recipient': {
      'id': process.env.MESSENGER_PAGE_ID
    },
    'timestamp': timestamp,
    'postback': {
      'title': title,
      'payload': payload
    }
  }) 
}

exports.sendLineTextEvent = async (
  server: express.Application | void,
  userId: string,
  text: string
) => {
  const mockReplyToken = 'replyToken';
  const mockMessageId = 'messageId';
  return sendEvent('line', server, {
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