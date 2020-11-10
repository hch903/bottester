import { MessengerEventType } from '../messenger/type';
import { LineEventType } from '../line/type';

type EventType = 
  MessengerEventType | LineEventType;

export { EventType };