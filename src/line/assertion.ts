import Assertion from '../interface/assertion';
import { LineReturnMsgObject } from './type';

class LineAssertion implements Assertion<LineReturnMsgObject> {
  textWouldBe(
    body: LineReturnMsgObject,
    text: string
  ): boolean {
    const returnMsg = body.messages.pop();
    if(returnMsg?.type === 'text') {
      return (returnMsg.text === text);
    }
    return false;
  }
}

export default LineAssertion;