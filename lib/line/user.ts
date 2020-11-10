import userInterface from '../interface/user';
import { LineUserType } from './LineType';

class LineUser implements userInterface<LineUserType> {
  users: LineUserType[] = [];

  getUserInfo(
    userId: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.userId === userId;
    })
    if (userInfo !== undefined) {
      return userInfo;
    } else {
      throw new Error('unregistered userId');
    }
  }

  register(
    userInfo: LineUserType
  ) {
    this.users.push(userInfo);
  }

  unregister(
    userId: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.userId === userId;
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

export default LineUser;