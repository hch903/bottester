import express from 'express';
import Tester from '../interface/tester';
import LineInterceptor from './interceptor';
import LineAssertion from './assertion';
import LineUserCollection from './userCollection';
import { LineUserType } from './type';
import LineUser from './user';

class LineTester implements Tester<
  LineInterceptor,
  LineAssertion,
  LineUserCollection,
  LineUser
> {
  _server: express.Application | void = undefined;

  _userCollection: LineUserCollection = new LineUserCollection();
  _interceptor: LineInterceptor = new LineInterceptor(this._userCollection);
  _assertion: LineAssertion = new LineAssertion();

  startTest(server: express.Application | void) {
    this._server = server;
    this._interceptor.use();
  }

  endTest() {
    this._server = undefined;
    this._interceptor.restore();
  }

  createUser(
    userId: string,
    displayName: string = 'default name',
    language?: string,
    pictureUrl?: string,
    statusMessage?: string
  ) {
    let userInfo: LineUserType = {
      userId: userId,
      displayName: displayName
    };

    if(language) {
      userInfo['language'] = language;
    }
    if(pictureUrl) {
      userInfo['pictureUrl'] = pictureUrl;
    }
    if(statusMessage) {
      userInfo['statusMessage'] = statusMessage;
    }

    const user = new LineUser(userInfo);
    this._userCollection.register(user);

    return user;
  }
}

export default LineTester;