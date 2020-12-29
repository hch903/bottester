import crypto from 'crypto'
import request from 'supertest';
import express from 'express';
import { LineEventType, LineHttpPostRequestType } from './type';

// 應由外部帶入
const mockLineChannelSecret = '8999cb96fde2cdffe5da6f533082caa9';

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
    .createHmac('sha256', mockLineChannelSecret)
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