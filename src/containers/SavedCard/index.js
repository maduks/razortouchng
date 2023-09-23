// import React, {Component} from 'react';
// import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import Button from '../../Components/common/Button/index';
// import FontText from '../../Components/common/FontText';
// import SvgIcons from '../../assets/SvgIcons';
// import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
// import colors from '../../assets/color';
// import {routeName as PaymentsMethodsRouteName} from '../PaymentsMethods';
// import BackHeader from '../../Components/BackHeader';
// import { useTranslation } from 'react-i18next';
// import BigButton from '../../Components/BigButton';
// export const routeName = 'SavedCard';

// const Data = [{id: 0}, {id: 1}, {id: 2}];

// // create a component
// const SavedCard = ({navigation}) => {
//   const {t} = useTranslation();
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <BackHeader
//           title={t("SAVE_CARD")}
//           titleColor="violet"
//           BackonPress={() => navigation.goBack()}
//         />
//         <TouchableOpacity activeOpacity={0.7}
//           onPress={navigation.navigate(PaymentsMethodsRouteName)}>
//           <FontText
//             size={normalize(14)}
//             name={'poppins-semibold'}
//             style={styles.card}>
//             {t('USE_NEW_CARD')}
//           </FontText>
//         </TouchableOpacity>
//       </View>
//       <View>
//         <BigButton title ={t("CONTINUE")}  />
//       </View>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   button: {color: colors.white},
//   card: {
//     color: colors.theme,
//     marginTop: hp(7),
//     paddingRight: hp(2.5),
//   },
// });

// //make this component available to the app
// export default SavedCard;
