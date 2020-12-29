import express from 'express';
import User from '../interface/user';
import { LineUserType } from './type';
import LineUserMethod from './method';

class LineUser implements User<LineUserType, LineUserMethod> {
  info: LineUserType;
  _method: LineUserMethod;
  _server;
  
  constructor(
    userInfo: LineUserType,
    server: express.Application | void
  ) {
    this.info = userInfo;
    this._method = new LineUserMethod();
    this._server = server;
  }

  sendText(
    text: string
  ) {
    this._method.sendLineTextEvent(this._server, this.info.userId, text);
  }
}

export default LineUser;