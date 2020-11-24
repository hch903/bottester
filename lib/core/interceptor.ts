import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import withDefaultInterceptors from 'node-request-interceptor/lib/presets/default';

import MessengerInterceptor from '../messenger/interceptor';
import LineInterceptor from '../line/interceptor';
import InterceptorInterface from '../interface/interceptor';
import UserInterface from '../interface/user';

import { LineUserType } from '../line/type';
import { MessengerUserType } from '../messenger/type';

class Interceptor implements InterceptorInterface{
  interceptor: RequestInterceptor = new RequestInterceptor(withDefaultInterceptors);
  calledRequests: InterceptedRequest[] = [];
  messengerUser: any;
  lineUser: any;

  setUser(
    platform: string,
    user: UserInterface<MessengerUserType | LineUserType>
  ) {
    switch(platform) {
      case 'messenger':
        this.messengerUser = user;
        break;
      case 'line':
        this.lineUser = user;
        break;
    }
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
        const messengerInterceptor = new MessengerInterceptor(this.messengerUser);
        
        return messengerInterceptor.use(req);
      } else if(['https://api.line.me'].includes(req.url.origin)) {
        this.calledRequests.push(req);
        const lineInterceptor = new LineInterceptor(this.lineUser);
        
        return lineInterceptor.use(req);
      } else {
        return;
      }
    });
  }

  restore() {
    this.calledRequests = [];
  }
}

export default Interceptor;