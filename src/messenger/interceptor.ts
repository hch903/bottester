import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import withDefaultInterceptors from 'node-request-interceptor/lib/presets/default';

import InterceptorInterface from '../interface/interceptor';
import UserInterface from '../interface/user';
import { MessengerUserType } from './type';

class MessengerInterceptor implements InterceptorInterface<MessengerUserType>{
  interceptor: RequestInterceptor = new RequestInterceptor(withDefaultInterceptors);
  calledRequests: InterceptedRequest[] = [];
  user: UserInterface<MessengerUserType>;

  constructor(user: UserInterface<MessengerUserType>) {
    this.user = user;
  };

  use() {
    this.interceptor.use((req) => {
      if(['https://graph.facebook.com'].includes(req.url.origin)) {
        this.calledRequests.push(req);

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
      }
      return;
    })
  }

  response() {
    return this.calledRequests[this.calledRequests.length - 1].body;
  }

  parse() {
    const body = this.response();
    if(body) {
      return JSON.parse(body);
    } else {
      throw Error;
    }
  }

  restore() {
    this.calledRequests = [];
  }
}

export default MessengerInterceptor;