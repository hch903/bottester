const testing = require('../../dist/index');

const PSID = '0000000000000000';
const userId = 'U00000000000000000000000000000000';

const messengerUser = new testing.MessengerUser();
const lineUser = new testing.LineUser();

const mInterceptor = new testing.MessengerInterceptor(messengerUser);
const lInterceptor = new testing.LineInterceptor(lineUser);

beforeEach(() => {
  mInterceptor.use();
  lInterceptor.use();
})

afterEach(() => {
  mInterceptor.restore();
  lInterceptor.restore();
});

describe('Hello World', () => {
  // messenger
  it('should reply "Hello World"', async () => {
    const { server } = testing.setup();
    
    await testing.sendMessengerTextEvent(server, PSID, process.env.MESSENGER_PAGE_ID, "Hi");
    const res = mInterceptor.calledRequests.pop().body;
    
    expect(JSON.parse(res)).toEqual({
      "message": {
        "text": "Hello World!",
      },
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": "0000000000000000",
      },
    })
  });

  // line
  it('should reply "Hello World"', async () => {
    const { server } = testing.setup();
    
    await testing.sendLineTextEvent(server, userId, "Hi");
    const res = lInterceptor.calledRequests.pop().body;
    
    expect(JSON.parse(res)).toEqual({
      "messages": [
        {
          "text": "Hello World!",
          "type": "text",
        },
      ],
      "replyToken": "replyToken",
    })
  });
});