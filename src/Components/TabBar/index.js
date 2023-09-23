import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { hp, wp, isX, normalize, isIOS } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import LinearGradient from 'react-native-linear-gradient';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        let iconName;

        if (route.name === 'Home') {
          iconName = (
            <View style={{ alignSelf: 'center' }}>
              <SvgIcons.Home
                height={hp(3)}
                width={hp(3)}
                fill={isFocused ? colors.box : 'none'}
                stroke={isFocused ? '#FCE77D' : colors.offwhite}
                style={styles.icon}
              />
              <Text style={{ fontFamily: 'poppins-regular', fontWeight: 'bold', fontSize: 12, color: '#fff' }}>Home</Text>
            </View>
          );
        }
        // else if (route.name === 'Appointment') {
        //   iconName = isFocused ? (
        //     <View style={{ alignSelf: 'center', right: wp(3) }}>
        //       <SvgIcons.ActiveCalendar
        //         height={hp(3)}
        //         width={hp(3)}
        //         style={styles.icon}
        //       />
        //     </View>
        //   ) : (
        //     <View style={{ alignSelf: 'center', right: wp(3) }}>
        //       <SvgIcons.Calendar
        //         height={hp(3)}
        //         width={hp(3)}
        //         style={styles.icon}
        //       />
        //     </View>
        //   );
        // }
        else if (route.name === 'Add') {
          iconName = (
            <View
              style={{
                alignSelf: 'center',
                shadowColor: colors.tabPlusShadow,
                shadowOffset: { width: 0, height: 15 },
                shadowOpacity: 1,
                shadowRadius: 15,
                elevation: 5,
              }}>
              <LinearGradient
                colors={[colors.darkorange, colors.darkred]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <SvgIcons.Add
                  height={hp(3)}
                  width={hp(3)}
                  style={styles.icon}
                />
              </LinearGradient>
            </View>
          );
        }
        else if (route.name === 'Blog') {
          iconName = (
            <View style={{ alignSelf: 'center' }}>
              <SvgIcons.Document
                height={hp(3)}
                width={hp(3)}
                fill={isFocused ? colors.box : 'none'}
                stroke={isFocused ? '#FCE77D' : colors.offwhite}
                style={styles.icon}
              />
              <Text style={{ fontFamily: 'poppins-regular', fontWeight: 'bold', fontSize: 12, color: '#fff' }}>Transactions</Text>
            </View>
          );
        }
        else if (route.name === 'Setting') {
          iconName = (
            <View style={{ alignSelf: 'center' }}>
              <SvgIcons.Setting
                height={hp(3)}
                width={hp(3)}
                fill={isFocused ? colors.box : 'none'}
                stroke={isFocused ? '#FCE77D' : colors.offwhite}
                style={styles.icon}
              />
              <Text style={{ fontFamily: 'poppins-regular', fontWeight: 'bold', fontSize: 12, color: '#fff' }}>Profile</Text>
            </View>
          );
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}>
            {iconName}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 80,
    justifyContent: 'space-evenly',
    backgroundColor: colors.theme,
    paddingBottom: hp(3),
    paddingTop: hp(0.8),
    alignItems: 'center',
  },
  linearGradient: {
    height: hp(8),
    width: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: hp(4),
  },
  icon: {
    alignSelf: 'center',
  },
});
