import { MessengerEventType } from '../messenger/type';
import { LineEventType } from '../line/type';

type EventType = 
  MessengerEventType | LineEventType;

export { EventType };

import { MessengerUserType } from '../messenger/type';
import { LineUserType } from '../line/type';

type UserType = 
  MessengerUserType | LineUserType;

export { UserType };
