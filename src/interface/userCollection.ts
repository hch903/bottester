export default interface UserCollection<T> {
  users: Array<T>;
  register(user: T): void;
  getUserInfo(id: string): T;
}