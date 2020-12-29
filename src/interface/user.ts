import express from 'express';
export default interface User<I, M> {
  info: I;
  _method: M;
  _server: express.Application | void;

  sendText(text: string): void;
}