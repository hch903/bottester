export default interface Assertion<T> {
  textWouldBe( body: T, text: string ): boolean;
}