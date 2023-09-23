import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  I18nManager,
} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import colors from '../../../assets/color';
import SvgIcons from '../../../assets/SvgIcons';
import {hp, isIOS, isX, normalize, wp} from '../../../styles/responsiveScreen';

const Material_Menu = props => {
  const {t} = useTranslation();
  const [Selected, setSelected] = useState(0);
  // console.log('props: ', props);

  const hideMenu = () => props.click();

  const showMenu = () => props.click();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Menu
        style={[styles.MenuMainView, props.position]}
        visible={props.visible}
        onRequestClose={hideMenu}>
        {props.BlogIntenal ? (
          <View>
            <MenuItem
              textStyle={styles.MenuItemStyle}
              onPressIn={() => setSelected(0)}
              onPress={hideMenu}>
              <View style={styles.DotMainView}>
                <Text style={styles.Text}>{t('Report')}</Text>
              </View>
            </MenuItem>
          </View>
        ) : (
          <View>
            <MenuItem
              textStyle={styles.MenuItemStyle}
              onPressIn={() => setSelected(0)}
              onPress={hideMenu}>
              <View style={styles.DotMainView}>
                <View style={styles.DotContainer}>
                  <View
                    style={[
                      styles.Dot,
                      {
                        backgroundColor:
                          Selected == 0 ? colors.theme : 'transparent',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.Text}>
                  {props.BlogScreen ? t('Popular') : t('All')}
                </Text>
              </View>
            </MenuItem>
            <MenuItem
              textStyle={styles.MenuItemStyle}
              onPressIn={() => setSelected(1)}
              onPress={hideMenu}>
              <View style={styles.DotMainView}>
                <View style={styles.DotContainer}>
                  <View
                    style={[
                      styles.Dot,
                      {
                        backgroundColor:
                          Selected == 1 ? colors.theme : 'transparent',
                      },
                    ]}
                  />
                </View>

                <Text style={styles.Text}>
                  {props.BlogScreen ? t('Latest') : t('Completed')}
                </Text>
              </View>
            </MenuItem>
            <MenuItem
              textStyle={styles.MenuItemStyle}
              onPressIn={() => setSelected(2)}
              onPress={hideMenu}>
              <View style={styles.DotMainView}>
                <View style={styles.DotContainer}>
                  <View
                    style={[
                      styles.Dot,
                      {
                        backgroundColor:
                          Selected == 2 ? colors.theme : 'transparent',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.Text}>
                  {props.BlogScreen ? t('My Favorites') : t('In Dispute')}
                </Text>
              </View>
            </MenuItem>
          </View>
        )}
      </Menu>
    </TouchableWithoutFeedback>
  );
};

export default Material_Menu;

const styles = StyleSheet.create({
  MenuMainView: {
    width: '40%',
    height: 150,
    top: isIOS ? hp(78) : hp(72),
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowColor: 'rgba(14, 32, 97, 0.2)',
    shadowOpacity: 0.5,
    shadowRadius: 50,
    borderRadius: 10,
  },
  Text: {
    fontSize: normalize(14),
    width: '100%',
    marginLeft: 10,
    textAlign: I18nManager.isRTL ? 'center' : 'left',
  },
  DotContainer: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: colors.theme,
    borderRadius: 50,
    alignItems: 'center',

    // marginLeft: I18nManager.isRTL ? -10 : 0,
    justifyContent: 'center',
  },
  Dot: {
    width: '60%',
    height: '60%',
    borderRadius: 50,
    // marginLeft:10
  },
  MenuItemStyle: {
    width: Platform.OS == 'ios' ? '90%' : '100%',
    height: '90%',
    alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    marginTop: hp(3),
    marginLeft: I18nManager.isRTL ? null : Platform.OS == 'ios' ? 0 : -20,
    marginRight: I18nManager.isRTL ? (Platform.OS == 'ios' ? 0 : -20) : null,
  },
  DotMainView: {
    flexDirection: 'row',
    width: wp(25),
    // marginRight: 20,
  },
});
