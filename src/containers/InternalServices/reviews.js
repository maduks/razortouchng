import React, { Component, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import colors from '../../assets/color';
import { reviewData } from '../../Utils/data';

const Reviews = () => {
  stars = [1, 2, 3, 4, 5]

  function _renderItem(item, index) {

    return (<View style={styles.reviewBox}>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image
          style={styles.image}
          source={item.image}
        />
        <View style={{ flexDirection: 'column' }}>
          <FontText

            pLeft={wp(2)}
            pTop={hp(1)}
            size={normalize(16)}
            name={'poppins-medium'}>
            {item.name}
          </FontText>
          <View style={{ flexDirection: "row" }}>
            <View
              style={styles.rating}>
              {stars.map(item => {
                return (
                  <Image
                    source={require('../../assets/images/Star.png')}
                    style={styles.star}
                  />
                );
              })}
              <FontText
                name={'poppins-medium'}
                size={normalize(16)}

                color={colors.violet}>
                {item.rating}
              </FontText>
            </View>
          </View>
        </View>
        <FontText
          style={{ flex: 1 }}
          name={'poppins-medium'}
          size={normalize(14)}
          textAlign={'right'}
          // pLeft={wp(11)}
          pTop={hp(4)}
          opacity={0.5}
          color={colors.lightViolet}>
          {item.date}
        </FontText>
      </View>

      <FontText
        name={'poppins-medium'}
        size={normalize(14)}
        pLeft={wp(1)}
        pTop={hp(1.5)}
        textAlign={'left'}
        opacity={0.5}
        color={colors.lightViolet}>
        {item.Detail}
      </FontText>
      <View
        style={styles.line}
      />
    </View>
    )
  }

  return (
    <FlatList
      data={reviewData}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) =>
        _renderItem(item, index)}
    />
  );
};

export default Reviews;

const styles = StyleSheet.create({
  reviewBox: {
    flex: 1,
    marginVertical: hp(1.5),
    marginHorizontal: wp(5),
    alignSelf: 'center',
  },

  image: {
    width: wp(14),
    height: wp(14),
    marginTop: hp(1),
    marginHorizontal: wp(1),
  },
  rating: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    display: 'flex',
    marginTop: hp(0.5)
  },
  star: {
    marginLeft: wp(-1.5),
    width: wp(5),
    height: hp(3),
    tintColor: colors.theme,
    marginRight: wp(2),
  },
  line: {
    borderColor: colors.lightViolet,
    width: wp(90),
    borderWidth: wp(0.2),
    marginTop: hp(1),
    opacity: 0.2,
  },
});
