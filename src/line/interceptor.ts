import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import withDefaultInterceptors from 'node-request-interceptor/lib/presets/default';

import InterceptorInterface from '../interface/interceptor';
import UserInterface from '../interface/user';
import { LineUserType } from './type';

class LineInterceptor implements InterceptorInterface<LineUserType>{
  interceptor: RequestInterceptor = new RequestInterceptor(withDefaultInterceptors);
  calledRequests: InterceptedRequest[] = [];
  user: UserInterface<LineUserType>;

  constructor(user: UserInterface<LineUserType>) {
    this.user = user;
  };

  use() {
    this.interceptor.use((req) => {
      if(['https://api.line.me'].includes(req.url.origin)) {
        this.calledRequests.push(req);

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

export default LineInterceptor;