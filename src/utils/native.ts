export const isReactNative = () => {
  return false;
  // try {
  //   // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  //   require('react-native');
  //   return true;
  // } catch (e) {
  //   return false;
  // }
};
