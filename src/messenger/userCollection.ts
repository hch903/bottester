import UserCollection from '../interface/userCollection';
import MessengerUser from './user';

class MessengerUserCollection implements UserCollection<MessengerUser> {
  users: MessengerUser[] = [];

  getUserInfo(
    psid: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.info.psid === psid;
    })
    if (userInfo !== undefined) {
      return userInfo;
    } else {
      throw new Error('unregistered psid!!');
    }
  }

  register(
    user: MessengerUser
  ) {
    this.users.push(user);
  }

  unregister(
    psid: string
  ) {
    const userInfo = this.users.find((item) => {
      return item.info.psid === psid;
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

export default MessengerUserCollection;