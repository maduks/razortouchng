import React, {useState} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import {hp, wp, isAndroid} from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import {SliderBox} from 'react-native-image-slider-box';

const ImageSlider = (props) => {
  const ImageData = [
    require('../../assets/images/img.png'),
    require('../../assets/images/img.png'),
    require('../../assets/images/img.png'),
    require('../../assets/images/img.png'),
  ];

  const [ActiveDots, setActiveDots] = useState(0);

  const SlideImage = (item, index) => {
    return (
      <View style={{width: wp(92.5), height: '100%'}}>
        <Image
          source={require('../../assets/images/img.png')}
          style={styles.img}></Image>
      </View>
    );
  };

  const onScrollOfExclusiveOffers = e => {
    // Slides and gets the value of X axis
    // console.log('e = 1: ', e.nativeEvent.contentOffset.x);

    // get the value of device's width
    // console.log('e = 2: ', e.nativeEvent.layoutMeasurement.width);

    if (e.nativeEvent) {
      const Slide = Math.ceil(
        e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width,
      );

      // console.log('Slide: ', Slide);

      if (Slide != ActiveDots) {
        setActiveDots(Slide);
      }
    }
  };

  return (
    <View style={styles.slider}>
      <View>
     
 <SliderBox
         
          images={props.data}
          sliderBoxHeight={hp(25)}
    parentWidth ={wp(90)}
          ImageComponentStyle={{borderRadius: 15, width: '100%', marginTop: hp(2)}}
          dotColor="white"
          inactiveDotColor="rgba(0, 0, 0, 0)"
          resizeMode={'cover'}
          dotStyle={{
            width: wp(2.5),
            height: wp(2.5),
            borderRadius:20,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            borderWidth: 1.5,
            borderColor: 'white',
          }}

        />
        {/* <FlatList
          data={ImageData}
          onScroll={e => onScrollOfExclusiveOffers(e)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(value, index) => index.toString()}
          renderItem={({item}) => SlideImage(item)}
        /> */}

        {/* <View style={styles.DotsView}>
          {ImageData.map((value, index) => (
            <View key={index}>
              <View
                style={[
                  styles.Dots,
                  {
                    backgroundColor:
                      ActiveDots == index ? colors.white : 'transparent',
                  },
                ]}
              />
            </View>
          ))}
        </View> */}
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  DotsView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp(1),
    alignSelf: 'center',
  },
  Dots: {
    width: isAndroid ? wp(2) : wp(2.5),
    height: hp(1.2),
    borderRadius: wp(5),
    borderWidth: wp(0.2),
    borderColor: colors.white,
    marginHorizontal: wp(0.5),
  },
  img: {
    alignSelf: 'center',
    marginTop: hp(3),
    width: wp(88),
    height: hp(28),
    borderRadius: wp(5),
  },
  slider: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: wp(-1),
    // marginHorizontal: wp(1),
  },
});
