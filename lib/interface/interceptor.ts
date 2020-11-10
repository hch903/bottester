import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import UserInterface from './user';

export default interface Interceptor<T> {
  user: UserInterface<T>;
  calledRequests: InterceptedRequest[];
  interceptor: RequestInterceptor;
  use(): void;
  restore(): void;
}