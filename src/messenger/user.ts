import express from 'express';
import User from '../interface/user';
import { MessengerUserType } from './type';
import MessengerUserMethod from './method';

class MessengerUser implements User<MessengerUserType, MessengerUserMethod> {
  info: MessengerUserType;
  _method: MessengerUserMethod;
  _server: express.Application | void;
  
  constructor(
    userInfo: MessengerUserType,
    server: express.Application | void;
  ) {
    this.info = userInfo;
    this._method = new MessengerUserMethod();
    this._server = server;
  }

  sendText(
    text: string
  ) {
    this._method.sendMessengerTextEvent(this._server, this.info.psid, text);
  }
}

export default MessengerUser;