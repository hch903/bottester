export default interface User<T> {
  users: Array<T>;
  register(user: T): void;
  getUserInfo(id: string): T;
}