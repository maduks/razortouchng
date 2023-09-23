import React, {Component, useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
  SectionList,
} from 'react-native';
import {hp, wp, normalize, isIOS, isX} from '../../../styles/responsiveScreen';
import colors from '../../../assets/color';
import {useNavigation} from '@react-navigation/core';
import ShowVideo, {routeName as ShowVideoRouteName} from './showVideo';
import { videoData } from '../../../Utils/data';

const VideoData = item => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={videoData}
        renderItem={({item}) => (
          <View
            style={styles.videoView}>
            <View>
              <ImageBackground
                style={styles.imagebg}
                source={require('../../../assets/images/photo.png')}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(ShowVideoRouteName)}>
                  <Image
                    style={styles.imagePlay}
                    source={require('../../../assets/images/play.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
             
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default VideoData;


const styles = StyleSheet.create({
videoView:{
  width: wp(88),
  height: hp(21),
  alignSelf: 'center',
  backgroundColor: colors.lightgrey,
  borderRadius: wp(5),
  marginVertical: hp(1),
},
imagebg:{width: wp(88), height: hp(21)},
imagePlay:{alignSelf: 'center', marginVertical: hp(8)},
})