import express from 'express';
import { MessengerEventType } from './type';
import { sendEvent as MessengerSendEvent} from './mock';

const timestamp = Date.now();

async function sendEvent(
  server: express.Application | void,
  event: MessengerEventType
) {
  return MessengerSendEvent(server, event);
}

export async function sendMessengerTextEvent (
  server: express.Application | void,
  psid: string,
  messengerPageId: string,
  text: string
) {
  return sendEvent(server, {
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

export async function sendMessengerPayloadEvent (
  server: express.Application | void,
  psid: string,
  messengerPageId: string,
  title: string,
  payload: string
) {
  return sendEvent(server, {
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