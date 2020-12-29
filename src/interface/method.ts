import request from 'supertest';
import express from 'express';

export default interface CoreMethod<T> {
  sendEvent(server: express.Application, event: T): Promise<request.Response>;
}