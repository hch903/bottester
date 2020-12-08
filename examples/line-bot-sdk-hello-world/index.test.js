const testing = require('../../dist/index');

const userId = 'U00000000000000000000000000000000';

const lineUser = new testing.LineUser();

const interceptor = new testing.LineInterceptor(lineUser);

beforeEach(() => {
  interceptor.use();
})

afterEach(() => {
  interceptor.restore();
});

describe('Hello World', () => {
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