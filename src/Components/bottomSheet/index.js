//import liraries
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import { hp, wp, normalize, isAndroid } from '../../styles/responsiveScreen';
import Button from '../common/Button';
import FontText from '../common/FontText';
import TitleSubTitle from '../TitleSubTitle';

const { width, height } = Dimensions.get('screen')

// create a component
const BottomSheet = props => {
  const {
    refname,
    title,
    RightItemIcon,
    bottombutton,
    icon,
    subTitle,
    textrightbutton,
    textleftbutton,
    oncancelpress,
    subTitlec,
    pTop,
    Textstyle,
  } = props;

  function customRenderer() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flex: 0.04, backgroundColor: colors.theme }}></View>
        <View style={styles.row}>
          {RightItemIcon != null && (
            <TouchableOpacity onPress={oncancelpress}>
              <SvgIcons.Cross
                height={hp(5)}
                width={hp(5)}

                marginHorizontal={wp(85)}
                marginTop={hp(2)}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.view}>
          {icon}
          {/* <TitleSubTitle Textstyle ={{flex:1}} Title = {title} SubTitle ={subTitle}  /> */}
          <TitleSubTitle
            Title={title}
            pTop={hp(1)}
            Textstyle={{ fontWeight: isAndroid ? 'bold ' : '600' }}
            textalign={'center'}
          />
          <TitleSubTitle
            SubTitle={subTitle}
            pTop={hp(0)}
            Textstyle={{ fontWeight: '100' }}
            textalign={'center'}
          />
          <FontText
            textAlign={'center'}
            pTop={pTop}
            style={{ ...styles.subtext, Textstyle }}
            size={normalize(14)}
            name={'poppins-medium'}
            color={'lightViolet'}>
            {subTitlec}
          </FontText>
        </View>

        {bottombutton == true ? (
          <View style={styles.leftbtn}>
            {textleftbutton != null && (
              <Button
                height={hp(7)}
                width={wp(50)}
                onPress={oncancelpress}
                style={styles.btnborder}>
                <FontText
                  size={normalize(16)}
                  name={'poppins-medium'}
                  color={'lightViolet'}>
                  {textleftbutton}
                </FontText>
              </Button>
            )}
            {textrightbutton != null && (
              <Button height={hp(7)} width={wp(50)} style={styles.rightbtn}>
                <FontText
                  size={normalize(16)}
                  name={'poppins-medium'}
                  color={'white'}>
                  {textrightbutton}
                </FontText>
              </Button>
            )}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <Modalize
      withHandle={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        scrollEnabled: false,
      }}
      ref={refname}
      modalHeight={width * 0.8}
      customRenderer={customRenderer}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subtext: {

    fontWeight: '400',
    marginTop: hp(-8),
    marginLeft: wp(4),
    marginRight: wp(4),
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  view: {
    flex: 5,
    // marginTop: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftbtn: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  btnborder: {
    borderRadius: 20,
    marginHorizontal: wp(4),
  },
  rightbtn: {
    backgroundColor: colors.red,
    borderRadius: 10,
    marginHorizontal: wp(4),
  },
});

//make this component available to the app
export default BottomSheet;
