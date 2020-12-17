import MessengerUser from './user';
import MessengerMethod from './messenger';
import MessengerInterceptor from './interceptor';
import MessengerAssertion from './assertion';

export default () => {
  const messengerUser = new MessengerUser();
  const messengerMethod = new MessengerMethod();
  const messengerInterceptor = new MessengerInterceptor(messengerUser);
  const messengerAssertion = new MessengerAssertion();
  return {
    messengerUser: messengerUser,
    messengerMethod: messengerMethod,
    messengerInterceptor: messengerInterceptor,
    messengerAssertion: messengerAssertion
  }
}