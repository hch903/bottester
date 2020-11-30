import UserInterface from '../interface/user';
import { MessengerUserType } from './type';

class MessengerUser implements UserInterface<MessengerUserType> {
  users: MessengerUserType[] = [];

  getUserInfo(
    psid: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.psid === psid;
    })
    if (userInfo !== undefined) {
      return userInfo;
    } else {
      throw new Error('unregistered psid!!');
    }
  }

  register(
    userInfo: MessengerUserType
  ) {
    this.users.push(userInfo);
  }

  unregister(
    psid: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.psid === psid;
    })

    if (userInfo !== undefined) {
       const index = this.users.indexOf(userInfo);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    } else {
      throw new Error('unregistered psid');
    }
  }
}

export default MessengerUser;