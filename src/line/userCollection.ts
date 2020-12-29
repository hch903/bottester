import UserCollection from '../interface/userCollection';
import LineUser from './user';

class LineUserCollection implements UserCollection<LineUser> {
  users: LineUser[] = [];

  getUserInfo(
    userId: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.info.userId === userId;
    })
    if (userInfo !== undefined) {
      return userInfo;
    } else {
      throw new Error('unregistered userId');
    }
  }

  register(
    user: LineUser
  ) {
    this.users.push(user);
  }

  unregister(
    userId: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.info.userId === userId;
    })

    if (userInfo !== undefined) {
       const index = this.users.indexOf(userInfo);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    } else {
      throw new Error('unregistered userId');
    }
  }
}

export default LineUserCollection;