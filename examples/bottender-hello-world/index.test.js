const bottender = require('bottender');
const testing = require('../../dist/index');

const PSID = '0000000000000000';
const userId = 'U00000000000000000000000000000000';

const messengerTester = new testing.MessengerTester();
const lineTester = new testing.LineTester();

beforeEach(() => {
  const server = bottender.initializeServer();
  messengerTester.startTest(server);
  lineTester.endTest(server);
})

afterEach(() => {
  messengerTester.endTest();
  lineTester.endTest();  
});

describe('Hello World', () => {
  // messenger
  it('should reply "Hello World"', async () => {
    await messengerMethod.sendMessengerTextEvent(server, PSID, process.env.MESSENGER_PAGE_ID, "Hi"); 
    const body = messengerInterceptor.parse();
    messengerAssertion.textWouldBe(body, "Hello World!");
  });

  // line
  it('should reply "Hello World"', async () => {
    await lineMethod.sendLineTextEvent(server, userId, "Hi");
    const body = lineInterceptor.parse();
    lineAssertion.textWouldBe(body, "Hello World!");
  });
});