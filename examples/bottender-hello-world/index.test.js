const bottender = require('bottender');
const testing = require('../../dist/index');

const PSID = '0000000000000000';
const userId = 'U00000000000000000000000000000000';

const {
  messengerAssertion,
  messengerInterceptor,
  messengerMethod
} = testing.MessengerSetup();

const {
  lineAssertion,
  lineInterceptor,
  lineMethod
} = testing.LineSetup();

beforeEach(() => {
  messengerInterceptor.use();
  lineInterceptor.use();
})

afterEach(() => {
  messengerInterceptor.restore();
  lineInterceptor.restore();
});

describe('Hello World', () => {
  // messenger
  it('should reply "Hello World"', async () => {
    const server = bottender.initializeServer();

    await messengerMethod.sendMessengerTextEvent(server, PSID, process.env.MESSENGER_PAGE_ID, "Hi"); 
    const body = messengerInterceptor.parse();
    messengerAssertion.textWouldBe(body, "Hello World!");
  });

  // line
  it('should reply "Hello World"', async () => {
    const server = bottender.initializeServer();
    
    await lineMethod.sendLineTextEvent(server, userId, "Hi");
    const body = lineInterceptor.parse();
    lineAssertion.textWouldBe(body, "Hello World!");
  });
});