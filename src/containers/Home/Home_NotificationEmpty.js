import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/color';
import EmptyDefault from '../../Components/EmptyDefault';
import SvgIcons from '../../assets/SvgIcons';
import BackHeader from '../../Components/BackHeader';

const { width, height } = Dimensions.get('screen');

const Home_NotificationEmpty = props => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <BackHeader
        title={t('Notification')}
        BackonPress={() => props.navigation.goBack()}
      />
      <EmptyDefault icon={<SvgIcons.NotificationDefault />} onPress={() => props.navigation.navigate('HomeNotification')} Title={t('NOTI_TAG')} Subtitle={t(
        'WHETHER',
      )} />
      
    </SafeAreaView>
  );
};

export default Home_NotificationEmpty;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
});
