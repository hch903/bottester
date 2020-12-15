import Assertion from '../interface/assertion';
import { MessengerReturnMsgObject } from './type';

class MessengerAssertion implements Assertion<MessengerReturnMsgObject> {
  textWouldBe(
    body: MessengerReturnMsgObject,
    text: string
  ): boolean {
    if(body.messaging_type === 'RESPONSE') {
      return (body.message.text === text);
    }
    return false;
  }
}

export default MessengerAssertion;