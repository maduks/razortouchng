import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import NotificationHeader from '../../Components/common/NotificationHeader/NotificationHeader';
import {normalize} from '../../styles/responsiveScreen';
import { NotificationData } from '../../Utils/data';

const {width, height} = Dimensions.get('screen');

const Home_Notification = props => {
  const {t} = useTranslation();
  function RenderItems(item, index) {
    return (
      <View style={styles.RenderBox}>
        <View style={styles.TitleMainView}>
          <View style={styles.TitleSubView}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={styles.img}
            />
            <FontText
              name={'poppins-semibold'}
              textAlign={'center'}
              pLeft={10}
              size={normalize(14)}>
              {t(item.title)}
            </FontText>
          </View>
          <FontText
            name={'poppins-regular'}
            textAlign={'center'}
            pLeft={10}
            style={{color: colors.gray80}}
            size={normalize(12)}>
            {item.time}
          </FontText>
        </View>
        <FontText
          name={'poppins-regular'}
          textAlign={'left'}
          style={styles.text}
          size={normalize(14)}>
          {t(item.text)}
        </FontText>
        <View style={styles.HorizontalBar} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safe}>
      <NotificationHeader
        Name={t('NOTI')}
        navigation={() => props.navigation.goBack()}
        icon={true}
      />
      <View>
        <FlatList
          data={NotificationData}
          keyExtractor={(value, index) => index.toString()}
          renderItem={({item, index}) => RenderItems(item, index)}
        />
        <View style={styles.NewEraMainView}>
          <Image
            source={require('../../assets/images/NotificationGirl.png')}
            resizeMode="cover"
            style={styles.notiImage}
          />
          <FontText
            name={'poppins-medium'}
            textAlign={'left'}
            style={{width: width * 0.6, alignSelf: 'center'}}
            color={colors.lightViolet}
            size={normalize(14)}>
            {t(
              'CHANGE_GAME',
            )}
          </FontText>
          <FontText
            name={'poppins-regular'}
            textAlign={'center'}
            style={styles.time}
            size={normalize(12)}>
            10m ago
          </FontText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home_Notification;

const styles = StyleSheet.create({
  RenderBox: {
    borderBottomColor: colors.black,
    paddingVertical: width * 0.02,
    marginTop: 5,
  },
  TitleMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
  },
  TitleSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.6,
  },
  HorizontalBar: {
    borderWidth: 0.5,
    borderColor: '#00000050',
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: width * 0.05,
  },
  NewEraMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
    marginVertical: width * 0.02,
  },
  img:{
    width: width * 0.08,
    height: width * 0.08,
  },
  text:{
    width: width * 0.67,
    alignSelf: 'center',
    color: colors.gray80,
  },
  safe:{flex: 1, backgroundColor: colors.white},
  time:{
    position: 'absolute',
    bottom: width * 0.01,
    right: width * 0.07,
    color: colors.gray80,
  },
  notiImage:{width: width * 0.27, height: width * 0.2, borderRadius: 10},
});
