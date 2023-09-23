import React from 'react';
import {useTranslation, withTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import colors from '../../assets/color';
import BackHeader from '../../Components/BackHeader';
import FontText from '../../Components/common/FontText';
import {hp, isX, normalize, wp} from '../../styles/responsiveScreen';
import RNRestart from 'react-native-restart';
import i18next from 'i18next';

export const routeName = 'ChangeLanguage';

const ChangeLanguage = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const languageList = [
    {id: 1, name: 'English', value: 'en'},
    {id: 2, name: 'Arabic', value: 'ar'},
  ];

  const renderItem = ({item, index}) => {
    const onLanguagePress = item => {
      if (item.name === 'Arabic') {
        i18n.changeLanguage(item.value).then(() => {
          I18nManager.forceRTL(true);
          RNRestart.Restart();
        });
        ``;
      } else {
        i18n.changeLanguage(item.value).then(() => {
          I18nManager.forceRTL(false);
          RNRestart.Restart();
        });
        console.log('Country.......................', i18next.language);
      }
    };

    return (
      <TouchableOpacity
        onPress={() => onLanguagePress(item, index)}
        style={styles.container}>
        <FontText
          size={normalize(18)}
          name={'poppins-medium'}
          pTop={hp(1.5)}
          pLeft={wp(4)}
          pBottom={hp(1.5)}>
          {item.name}
        </FontText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader
        style={styles.header}
        title={t('CHANGE_LAN')}
        titleColor="violet"
        BackonPress={() => navigation.goBack()}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={languageList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
  header: {
    paddingTop: isX ? hp(6) : hp(3.5),
    paddingHorizontal: wp(1),
  },
  separator: {
    height: hp(0.1),
    width: '100%',
    backgroundColor: colors.lightgrey,
    alignSelf: 'center',
  },
});

export default withTranslation()(ChangeLanguage);
