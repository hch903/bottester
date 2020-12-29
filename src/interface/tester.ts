import express from 'express';

export default interface Tester<I, A, C, U> {
  _server: express.Application | void;
 
  _interceptor: I;
  _assertion: A;
  _userCollection: C;

  startTest(server: express.Application | void): void;
  endTest(): void;

  createUser(userId: string): U;
}