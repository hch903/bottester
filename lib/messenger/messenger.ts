import crypto from 'crypto'
import request from 'supertest';
import express from 'express';
import { MessengerEventType, MessengerHttpPostRequestType } from './type';

const timestamp = Date.now();

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
    .createHmac('sha1', process.env.MESSENGER_APP_SECRET)
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
        'id': process.env.MESSENGER_PAGE_ID,
        'time': timestamp,
        'messaging': [event]
      }
    ]
  };
  return sendRequest(server, body);
}