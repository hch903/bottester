import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import withDefaultInterceptors from 'node-request-interceptor/lib/presets/default';

import Interceptor from '../interface/interceptor';
import UserInterface from '../interface/user';
import { MessengerUserType } from './type';


class MessengerInterceptor implements Interceptor<MessengerUserType>{
  interceptor: RequestInterceptor = new RequestInterceptor(withDefaultInterceptors);
  calledRequests: InterceptedRequest[] = [];
  user: UserInterface<MessengerUserType>;

  constructor(user: UserInterface<MessengerUserType>) {
    this.user = user;
  };

  use() {
    // this.interceptor.use((req) => {
    //   // Will print to stdout any outgoing requests
    //   // without affecting their responses
    //   console.log(req.method, req.url);
    //   console.log({ headers: req.headers, body: req.body });
    // });

    this.interceptor.use((req) => {
      if (['https://graph.facebook.com'].includes(req.url.origin)) {
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
    });
  }

  restore() {
    this.calledRequests = [];
  }
}

export default MessengerInterceptor;