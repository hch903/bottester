const bottender = require('bottender');
const testing = require('../../dist/index');

const PSID = '0000000000000000';
const userId = 'U00000000000000000000000000000000';

const messengerUser = new testing.MessengerUser();
const lineUser = new testing.LineUser();

const mInterceptor = new testing.MessengerInterceptor(messengerUser);
const lInterceptor = new testing.LineInterceptor(lineUser);
const mAssertion = new testing.MessengerAssertion();
const lAssertion = new testing.LineAssertion();

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
    const server = bottender.initializeServer();
    
    await testing.sendMessengerTextEvent(server, PSID, process.env.MESSENGER_PAGE_ID, "Hi"); //拆解成兩行
    // 底下結合成Hello World
    const body = mInterceptor.parse();
    mAssertion.textWouldBe(body, "Hello World!");
  });

  // line
  it('should reply "Hello World"', async () => {
    const server = bottender.initializeServer();
    
    await testing.sendLineTextEvent(server, userId, "Hi");
    const body = lInterceptor.parse();
    lAssertion.textWouldBe(body, "Hello World!");
  });
});