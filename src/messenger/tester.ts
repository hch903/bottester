import express from 'express';
import Tester from '../interface/tester';
import MessengerInterceptor from './interceptor';
import MessengerAssertion from './assertion';
import MessengerUserCollection from './userCollection';
import { MessengerUserType } from './type';
import MessengerUser from './user';

class MessengerTester implements Tester<
  MessengerInterceptor,
  MessengerAssertion,
  MessengerUserCollection,
  MessengerUser
> {
  _server: express.Application | void = undefined;

  _userCollection: MessengerUserCollection = new MessengerUserCollection();
  _interceptor: MessengerInterceptor = new MessengerInterceptor(this._userCollection);
  _assertion: MessengerAssertion = new MessengerAssertion();

  constructor() {}

  startTest(server: express.Application | void){
    this._server = server;
    this._interceptor.use();
  }

  endTest() {
    this._server = undefined;
    this._interceptor.restore();
  }

  createUser(
    userId: string,
    name: string = 'Mark Zuckerburg',
    firstName: string = "Mark",
    lastName: string = "Zuckerburg",
    profilePic?: string
  ) {
    let userInfo: MessengerUserType = {
      psid: userId,
      name: name,
      firstName: firstName,
      lastName: lastName,
    };

    if(profilePic) {
      userInfo['profilePic'] = profilePic;
    }

    const user = new MessengerUser(userInfo);
    this._userCollection.register(user);

    return user;
  }
}

export default MessengerTester;