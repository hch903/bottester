import { InterceptedRequest } from 'node-request-interceptor';

import UserInterface from '../interface/user';
import { MessengerUserType } from './type';

class MessengerInterceptor{
  user: UserInterface<MessengerUserType>;

  constructor(user: UserInterface<MessengerUserType>) {
    this.user = user;
  };

  use(
    req: InterceptedRequest
  ) {
    // Ex: `/v4.0/${PSID}`
    if (req.url.pathname.match(/^\/v[0-9].[0-9]\/\d{16}$/)) {
      const psid = req.url.pathname.split('/')[2];
      const userInfo = this.user.getUserInfo(psid);
      return {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          userInfo
        ),
      };
    }

    // Ex: `/v4.0/me/messages
    if (req.url.pathname.match(/^\/v[0-9].[0-9]\/me\/messages/)) {
      return {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({}),
      };
    }
    return;
  }
}

export default MessengerInterceptor;