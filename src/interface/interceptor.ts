import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import UserCollection from './userCollection';

export default interface Interceptor<T> {
  calledRequests: InterceptedRequest[];
  interceptor: RequestInterceptor;

  users: UserCollection<T>;

  use(): void;
  restore(): void;
  getLastReceivedJsonString(): string | undefined;
  getLastReceivedJsonBody(): any;
}