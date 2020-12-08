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
    
    await testing.sendMessengerTextEvent(server, PSID, process.env.MESSENGER_PAGE_ID, "Hi"); //拆解成兩行
    // 底下結合成Hello World
    const res = mInterceptor.response();
    expect(res).toEqual('Hello World!');
  });

  // line
  it('should reply "Hello World"', async () => {
    const { server } = testing.setup();
    
    await testing.sendLineTextEvent(server, userId, "Hi");
    const res = lInterceptor.response();
    expect(res).toEqual('Hello World!');
  });
});