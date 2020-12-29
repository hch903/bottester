import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import withDefaultInterceptors from 'node-request-interceptor/lib/presets/default';

import InterceptorInterface from '../interface/interceptor';
import UserCollection from '../interface/userCollection';
import LineUser from './user';

class LineInterceptor implements InterceptorInterface<LineUser>{
  interceptor: RequestInterceptor = new RequestInterceptor(withDefaultInterceptors);
  calledRequests: InterceptedRequest[] = [];
  users: UserCollection<LineUser>;

  constructor(users: UserCollection<LineUser>) {
    this.users = users;
  };

  use() {
    this.interceptor.use((req) => {
      if(['https://api.line.me'].includes(req.url.origin)) {
        this.calledRequests.push(req);

        // Ex: `/v2/bot/profile/${userId}`
        if (req.url.pathname.match(/^\/v[0-9]\/bot\/profile\/U[0-9a-f]{32}/)) {
          const userId = req.url.pathname.split('/')[4];
          const userInfo = this.users.getUserInfo(userId);
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

  getLastReceivedJsonString() {
    return this.calledRequests[this.calledRequests.length - 1].body;
  }

  getLastReceivedJsonBody() {
    const body = this.getLastReceivedJsonString();
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