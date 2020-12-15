import request from 'supertest';

export default interface Method {
  sendEvent(): Promise<request.Response>;
  sendTextEvent(): Promise<request.Response>;
  sendPayloadEvent(): Promise<request.Response>;
}