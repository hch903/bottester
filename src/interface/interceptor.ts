import { InterceptedRequest, RequestInterceptor } from 'node-request-interceptor';
import UserInterface from './user';
// import { UserType } from '../core/type';

export default interface Interceptor<T> {
  calledRequests: InterceptedRequest[];
  interceptor: RequestInterceptor;

  user: UserInterface<T>;

  use(): void;
  restore(): void;
  response(): string;
}