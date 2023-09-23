//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import FontText from '../common/FontText';
import colors from '../../assets/color';
// create a component
const TitleSubTitle = props => {
  const {Title, SubTitle, textalign, Textstyle, pTop, pLeft, style, subText} =
    props;

  return (
    <View style={[styles.container, style]}>
      <FontText
        textAlign={textalign}
        style={[styles.text, Textstyle]}
        size={normalize(22)}
        name="Poppins"
        color="violet"
        pLeft={pLeft}>
        {Title}
      </FontText>
      <FontText
        textAlign={textalign}
        pTop={pTop}
        style={{...styles.subtext, Textstyle}}
        size={normalize(14)}
        name={'poppins-medium'}
        color={'lightViolet'}
        pLeft={pLeft}>
        {SubTitle}
      </FontText>
      {/* <FontText
        textAlign={textalign}
        pTop={pTop}
        style={styles.subtextc}
        size={normalize(14)}
        name={'poppins-medium'}
        color={'lightViolet'}>
        {SubTitleC}
      </FontText> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    margin: wp(3),
  },
  text: {
    // marginHorizontal: wp(3),
    fontWeight: 'bold',
    justifyContent: 'center',
    marginHorizontal: wp(6),
    // marginTop: hp(-2),
  },
  subtext: {
    // marginHorizontal: wp(-5),
    fontWeight: '400',
    marginTop: hp(0),
    marginLeft: wp(0.5),
    marginRight: wp(4),
  },
  // subtextc: {
  //   // marginHorizontal: wp(-5),
  //   fontWeight: '400',
  //   marginTop: hp(-3),
  //   marginLeft: wp(4),
  //   marginRight: wp(4),
  // },
});

//make this component available to the app
export default TitleSubTitle;
