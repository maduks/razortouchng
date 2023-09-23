import React from 'react';
import StarRating from 'react-native-star-rating';
import { useTranslation } from 'react-i18next';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Dimensions,
  I18nManager,
} from 'react-native';
import colors from '../../../assets/color';
import SvgIcons from '../../../assets/SvgIcons';

import { hp, wp } from '../../../styles/responsiveScreen';
import fonts from '../../../assets/fonts';

const { width, height } = Dimensions.get('screen');

const Index = props => {
  const { t } = useTranslation();
  // alert(JSON.stringify(props))
  const cate = [props.category]
  //props =[props]
  console.log('Props: ', props);

  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      borderRadius: 10,
      shadowOffset: {
        width: 8,
        height: wp(0.5),
      },
      shadowColor: 'white',
      shadowOpacity: 0.18,
      shadowRadius: 5,
      backgroundColor: colors.offwhite,
      marginBottom: 5,
      elevation: 8,
      marginHorizontal: 10,
    }}>
      <ImageBackground source={{ uri: props.photo }}
        imageStyle={{ justifyContent: 'flex-end', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        resizeMode="cover" style={{
          width: 200,
          height: 120,
          borderRadius: 20
        }}>
      </ImageBackground>
      <View>
        <View
          style={props.ChangeWidth ? {
            flex: 1,


            marginRight: width * 0.03,

          } : {
            flexShrink: 1,


          }}>


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20
            }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.PopularSalonsName}> {props.name}</Text>

              <View style={{ flexDirection: 'row', paddingHorizontal: 3 }}>
                <SvgIcons.Location />
                {/* <StarRating
                  disabled={false}
                  maxStars={5}
                  starSize={10}

                  fullStarColor={colors.darkred}
                  rating={props.average_rating}
                /> */}
                <Text style={{ fontWeight: 'bold', marginTop: 5, color: colors.theme, fontSize: 12 }}>{props.site}</Text>
              </View>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <SvgIcons.Category />
              <Text
                style={{ marginLeft: 6, color: colors.lightViolet, fontSize: 12, marginBottom: 4 }}>
                {props.category}

              </Text>
            </View>
          </View>



          <View style={styles.PopularSalonsIconMainView}>
            <View
              style={{
                flexDirection: 'row',
                width: wp(15),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* <SvgIcons.Heart />
          <SvgIcons.Share /> */}
            </View>
            <View>
              <TouchableOpacity
                style={styles.PopularSalonsBtnView}
                onPress={props.bookNow}>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: 'poppins-medium',
                    fontSize: 12,
                  }}>
                  Book Now

                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>


    /* <View style={styles.PopularSalonsRatingMainView}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
      <StarRating
        disabled={false}
        maxStars={5}
        starSize={12}
        fullStarColor={colors.darkred}
        disabled={false}
        rating={props.average_rating}
      />
      <Text>{props.average_rating}.0</Text>
    </View>
    
    <Text
      style={{
        color: '#0D8B47',
        fontSize: 12,
        fontFamily: 'poppins-medium',
      }}>
       {props.shopStatus} 
    </Text>
    </View>  */

    // <View >
    //   <View
    //     style={[
    //       styles.PopularSalonsMainView,
    //       props.ChangeWidth
    //         ? {
    //           width: width * 0.85,
    //           marginBottom: 15,
    //           shadowOffset: { height: 8 }
    //         }
    //         : {},
    //     ]}>
    //     <Image
    //       source={{ uri: props.photo }}
    //       resizeMode="cover"
    //       style={[
    //         styles.PopularSalonsImage,
    //         props.ChangeWidth
    //           ? { width: width * 0.35, height: width * 0.35 }
    //           : {},
    //       ]}
    //     />

    //     <View
    //       style={props.ChangeWidth ? {
    //         flex: 1,

    //         marginRight: width * 0.03,

    //       } : {
    //         flexShrink: 1,




    //       }}>
    //       <Text style={styles.PopularSalonsName}> {props.name}</Text>

    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //         }}>
    //         <SvgIcons.Category />
    //         <Text
    //           style={{ marginLeft: 6, color: colors.lightViolet, fontSize: 12 }}>
    //           {props.category}

    //         </Text>
    //       </View>

    //       <View style={styles.PopularSalonsRatingMainView}>
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //           {/* <Text>{props.ratingText.val}</Text> */}



    //           <StarRating
    //             disabled={false}
    //             maxStars={5}
    //             starSize={15}
    //             fullStarColor={colors.darkred}
    //             disabled={false}
    //             rating={props.average_rating}

    //           />



    //         </View>

    //         <Text
    //           style={{
    //             color: '#0D8B47',
    //             fontSize: 12,
    //             fontFamily: 'poppins-medium',
    //           }}>
    //           {/* {props.shopStatus} */}
    //         </Text>
    //       </View>

    //       <View style={styles.PopularSalonsIconMainView}>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             width: wp(15),
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //           }}>
    //           {/* <SvgIcons.Heart />
    //           <SvgIcons.Share /> */}
    //         </View>
    //         <View>
    //           <TouchableOpacity
    //             style={styles.PopularSalonsBtnView}
    //             onPress={props.bookNow}>
    //             <Text
    //               style={{
    //                 color: colors.white,
    //                 fontFamily: 'poppins-medium',
    //                 fontSize: 12,
    //               }}>
    //               Book Now

    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  PopularSalonsMainView: {
    width: wp(70),
    maxWidth: wp(70),
    maxHeight: 170,
    minHeight: 170,
    marginLeft: 5,
    marginRight: 15,
    borderRadius: 10,
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: colors.offwhite,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: colors.darkgray,
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 20,
    paddingBottom: 10,
    paddingRight: 5
  },
  PopularSalonsImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(20) / 2,
    overflow: "hidden",
    marginRight: 20,
    marginLeft: 5,
    marginTop: 5,
    marginHorizontal: -10,
    marginVertical: -5,
  },
  PopularSalonsName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.theme,
    fontFamily: 'poppins-medium',
    marginTop: 10,
    marginBottom: 5,
    flexShrink: 1,
    flexDirection: 'row',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  PopularSalonsRatingMainView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(45),
  },
  PopularSalonsIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2,
  },
  PopularSalonsBtnView: {
    backgroundColor: colors.red,
    padding: 11,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 7,
    borderRadius: 7,
    paddingHorizontal: 15,
  },
});
