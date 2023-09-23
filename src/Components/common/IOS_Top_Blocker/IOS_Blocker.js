import React from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('screen');

const IOS_Blocker = () => {
  return (
    <View>
      <View
        style={{
          height: Platform.OS == 'ios' ? height * 0.045 : null,
          width: width,
        }}
      />
    </View>
  );
};

export default IOS_Blocker;

const styles = StyleSheet.create({});
