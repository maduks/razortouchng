import React, {Component, useState, useEffect} from 'react';
import {View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {useNavigation} from '@react-navigation/core';

export const routeName = 'ShowVideo';

const ShowVideo = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <VideoPlayer navigator ={props.navigation}  source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}} />
    </View>
  );
};

export default ShowVideo;

// http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4
