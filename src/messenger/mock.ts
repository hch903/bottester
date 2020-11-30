import crypto from 'crypto'
import request from 'supertest';
import express from 'express';
import { MessengerEventType, MessengerHttpPostRequestType } from './type';

const timestamp = Date.now();
const mockMessegnerAppSecret = '2ea1bf0198a9458257b8194ab32839bf';
const mockMessengerPageId = '107079634244094';

async function sendRequest(
  server: express.Application | void,
  body: MessengerHttpPostRequestType
) {
  const signature = produceSignature(body);
  return request(server)
    .post('/webhooks/messenger')
    .set('X-Hub-Signature', signature)
    .send(body);
}

function produceSignature(
  body: MessengerHttpPostRequestType
) {
  let signature = crypto
    .createHmac('sha1', mockMessegnerAppSecret)
    .update(JSON.stringify(body), 'utf8')
    .digest()
    .toString('hex');
  signature = 'sha1=' + signature;
  return signature;
}

export async function sendEvent(
  server: express.Application | void,
  event: MessengerEventType
) {
  const body = {
    'object': 'page',
    'entry': [
      {
        'id': mockMessengerPageId,
        'time': timestamp,
        'messaging': [event]
      }
    ]
  };
  return sendRequest(server, body);
}