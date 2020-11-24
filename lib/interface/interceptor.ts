import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import UserInterface from './user';
import { UserType } from '../core/type';
import { MessengerUserType } from '../messenger/type';
import { LineUserType } from '../line/type';

export default interface Interceptor {
  calledRequests: InterceptedRequest[];
  interceptor: RequestInterceptor;

  messengerUser: UserInterface<MessengerUserType>;
  lineUser: UserInterface<LineUserType>;

  setUser(platform: string, user: UserInterface<UserType>): void;
  use(): void;
  restore(): void;
}