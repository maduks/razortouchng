import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {
  hp,
  wp,
  normalize,
} from '../../styles/responsiveScreen';
import fonts from '../../assets/fonts';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import SvgIcons from '../../assets/SvgIcons';
import { useTranslation } from 'react-i18next';
import { CONTENT } from '../../Utils/data';

const ExpandableComponent = ({ item, onClickFunction }) => {
  const { t } = useTranslation();

  const [layoutHeight, setLayoutHeight] = useState(0);
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <View style={styles.Container}>
          <FontText
            name={'poppins-medium'}
            size={normalize(14)}
            color={'Violet'}
            textAlign={'left'}>
            {t(item.category_name)}
          </FontText>

          <TouchableOpacity onPress={() => onClickFunction(!item.isExpanded)}>
            {item.isExpanded ? (
              <SvgIcons.Vectors style={{ marginTop: hp(0.8) }} />
            ) : (
              <SvgIcons.Down style={{ marginTop: hp(0.8) }} />
            )}
          </TouchableOpacity>
        </View>
        {item.isExpanded ? (
          <View style={styles.lineE} />
        ) : (
          <View style={styles.line0} />
        )}
        <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
          }}>

          {item.subcategory.map((item, key, index) => (
            <View key={key}>
              <View style={styles.itemView}>
                <View
                  style={{

                    width: '50%',
                  }}>
                  <FontText style={styles.text01}>{t(item.val)}</FontText>
                </View>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',

                  }}>
                  <FontText style={styles.text02}>{item.sub}</FontText>

                  <FontText style={styles.text03}>{item.price}</FontText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Services = () => {
  const [listDataSource, setListDataSource] = useState(CONTENT);

  const [multiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <View>
      <ScrollView>
        {listDataSource.map((item, key) => (
          <ExpandableComponent
            key={item.category_name}
            onClickFunction={() => {
              updateLayout(key);
            }}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  Container: { flexDirection: 'row', justifyContent: 'space-between' },
  header: {
    marginLeft: wp(5),
    marginRight: wp(3.5),
    padding: 15,
    borderColor: colors.lightgrey,
    marginTop: hp(2),
    borderRadius: 14,
    borderWidth: 0.5,
  },
  line0: {
    borderWidth: 0,
    borderColor: colors['lightgrey'],
    marginTop: hp(2),
    marginBottom: hp(-1.8),
    marginLeft: wp(-4.2),
    width: wp(91),
  },
  lineE: {
    borderWidth: 0.5,
    borderColor: colors['lightgrey'],
    marginTop: hp(2),
    marginBottom: hp(3),
    marginLeft: wp(-4.2),
    width: wp(91),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(1.5),
  },
  text01: {
    fontFamily: fonts['poppins-medium'],
    fontSize: normalize(14),
    fontWeight: '500',
    color: colors['violet'],
  },
  text02: {
    fontFamily: fonts['poppins-medium'],
    fontSize: normalize(12),
    fontWeight: '500',
    marginLeft: wp(0),
    opacity: 0.5,
    width: '60%',
    textAlign: 'right',
    color: colors['violet'],
  },
  text03: {
    textAlign: 'right',
    fontFamily: fonts['poppins-medium'],
    fontSize: normalize(14),
    fontWeight: '500',
    color: colors['violet'],
    width: '35%',
  },
});
