import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

/** Define all your fonts here */
export default {
  default: isIOS ? 'Poppins-Medium' : 'Poppins-Medium',
  'poppins-medium': 'Poppins-Medium',
  'poppins-semibold': 'Poppins-SemiBold',
  'poppins-regular': 'Poppins-Regular',
  'rubik-light': 'Rubik-Light',
  'rubik-regular': 'Rubik-Regular',
  'rubik-bold': 'Rubik-Bold',
  'rubik-extrabold': 'rubik-ExtraBold',
};
