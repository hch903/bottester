import crypto from 'crypto'
import request from 'supertest';
import express from 'express';
import { LineEventType, LineHttpPostRequestType } from './type';

const timestamp = Date.now();

async function sendRequest(
  server: express.Application | void,
  body: LineHttpPostRequestType
) {
  const signature = produceSignature(body);
  return request(server)
    .post('/webhooks/line')
    .set('X-Line-Signature', signature)
    .send(body);
}

function produceSignature(
  body: LineHttpPostRequestType
) {
  const signature = crypto
    .createHmac('sha256', process.env.LINE_CHANNEL_SECRET)
    .update(JSON.stringify(body), 'utf8')
    .digest()
    .toString('base64');
  return signature;
}

export async function sendEvent(
  server: express.Application | void,
  event: LineEventType
) {
  const mockDestination = 'destination';
  const body = {
    'destination': mockDestination,
    'events': [event]
  }
  return sendRequest(server, body);
}