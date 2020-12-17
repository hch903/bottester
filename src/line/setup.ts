import LineUser from './user';
import LineMethod from './line';
import LineInterceptor from './interceptor';
import LineAssertion from './assertion';

export default () => {
  const lineUser = new LineUser();
  const lineMethod = new LineMethod();
  const lineInterceptor = new LineInterceptor(lineUser);
  const lineAssertion = new LineAssertion();
  return {
    lineUser: lineUser,
    lineMethod: lineMethod,
    lineInterceptor: lineInterceptor,
    lineAssertion: lineAssertion
  }
}