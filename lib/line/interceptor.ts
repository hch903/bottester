import { InterceptedRequest } from 'node-request-interceptor';

import UserInterface from '../interface/user';
import { LineUserType } from './type';

class LineInterceptor{
  user: UserInterface<LineUserType>;

  constructor(user: UserInterface<LineUserType>) {
    this.user = user;
  };

  use(
    req: InterceptedRequest
  ) {
    // Ex: `/v2/bot/profile/${userId}`
    if (req.url.pathname.match(/^\/v[0-9]\/bot\/profile\/U[0-9a-f]{32}/)) {
      const userId = req.url.pathname.split('/')[4];
      const userInfo = this.user.getUserInfo(userId);
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

    // Ex: `/v2/bot/message/reply`
    if (req.url.pathname.match(/^\/v[0-9]\/bot\/message\/reply/)) {
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

export default LineInterceptor;