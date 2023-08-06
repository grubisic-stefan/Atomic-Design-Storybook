export const callbackLogger = (callbackName: string) => {
  function logger(...args: any) {
    console.log(callbackName, args);
  }
};
export default callbackLogger;
