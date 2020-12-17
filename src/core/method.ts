import request from 'supertest';
import express from 'express';

abstract class CoreMethod<T> {
  abstract sendEvent(
    server: express.Application | void,
    event: T 
  ): Promise<request.Response>;
}

export default CoreMethod;