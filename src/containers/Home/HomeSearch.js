import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  I18nManager,
} from 'react-native';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import BackHeader from '../../Components/BackHeader';
import FontText from '../../Components/common/FontText';
import TextInputWithLogo from '../../Components/common/TextInputWithLogo/TextInputWithLogo';
import {normalize, wp} from '../../styles/responsiveScreen';
import { upComingData } from '../../Utils/data';

const {width, height} = Dimensions.get('screen');

const HomeSearch = props => {
  const {t} = useTranslation();

  const [Focus, setFocus] = useState(true);

  const Empty = [
    {
      icon: <SvgIcons.Time width={width * 0.06} height={width * 0.06} />,
      text: 'Barkson Cuts',
    },
    {
      icon: <SvgIcons.Time width={width * 0.06} height={width * 0.06} />,
      text: 'Melipara',
    },
    {
      icon: <SvgIcons.Time width={width * 0.06} height={width * 0.06} />,
      text: 'Tony & Guy',
    },
  ];

  function renderItemFun(item, index) {
    const stars = [1, 2, 3, 4, 5];
    return (
      <View style={styles.PopularSalonsMainView}>
        <Image
          source={item.pimg}
          resizeMode="contain"
          style={styles.PopularSalonsImage}
        />

        <View style={{marginTop: width * 0.01}}>
          <Text style={styles.PopularSalonsName}>{item.salonName}</Text>

          <Text style={{color: colors.lightViolet, fontSize: 12}}>
            {item.salonAddress}
          </Text>

          <View style={styles.PopularSalonsRatingMainView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{item.ratingText}</Text>

              {stars.map((item, index) => {
                return (
                  <Image
                    source={item.stars}
                    style={[styles.image,{ tintColor: index <= 2 ? '#ff0000' : null,}]}
                  />
                );
              })}
            </View>

            <Text
              style={styles.opentxt}>
              {/* {item.shopStatus} */}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const _renderItem = (item,index) => {
    return(
      <View
        style={styles.icon}>
        {item.icon}
        <FontText
          style={{color: colors.gray}}
          pLeft={width * 0.03}
          size={normalize(15)}
          name="poppins-regular">
          {item.text}
        </FontText>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BackHeader
        style={{width: width * 0.3}}
        title={t('HOME')}
        BackonPress={() => props.navigation.goBack()}
      />
      <TextInputWithLogo
        ContainerStyle={styles.containerLogo}
        logo={true}
        onFocus={() => setFocus(!Focus)}
        navigation ={() => props.navigation.navigate('HomeMap')}
      />

      <View style={styles.MainView}>

      {Focus ?
     <View>
        <FontText
          size={normalize(16)}
          style={styles.recentText}
          name="poppins-medium">
          {t('RECENT_SEARCH')}
        </FontText>

        {/* // When Search is Empty  */}

        <FlatList
          style={{marginTop: width * 0.03}}
          data={Empty}
          keyExtractor={(value, index) => index.toString()}
          renderItem={({item, index}) => _renderItem(item,index)}
        />
      </View>
        :

<View>
         <FlatList
          data={upComingData}
          style={{
            paddingLeft: width * 0.03,
            marginTop: width * 0.02,
          }}
          keyExtractor={(value, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => renderItemFun(item, index)}
        />
        </View>

        }
      </View>

    </SafeAreaView>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  PopularSalonsMainView: {
    width: width * 0.9,
    height: width * 0.23,
    marginLeft: 5,
    marginRight: 15,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginBottom: width * 0.01,
  },
  PopularSalonsImage: {
    width: width * 0.25,
    height: width * 0.255,
    marginHorizontal: -width * 0.02,
  },
  image:{
    marginLeft: 3,
    width: 10,
    height: 10,

  },
  PopularSalonsName: {
    fontSize: 14,
    fontFamily: 'poppins-medium',
    marginTop: 10,
    marginBottom: 5,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  PopularSalonsRatingMainView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(45),
  },
  opentxt:{
    color: '#0D8B47',
    fontSize: 12,
    fontFamily: 'poppins-medium',
  },
  containerLogo:{
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.viewcolor,
    height: width * 0.13,
  },
  MainView:{flex: 1, marginTop: width * 0.05},
  mainContainer:{flex: 1, backgroundColor: colors.white},
  recentText:{width: width * 0.4, marginLeft: width * 0.05},
  icon:{
    alignSelf: 'center',
    width: width * 0.9,
    marginVertical: height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
  },

});
