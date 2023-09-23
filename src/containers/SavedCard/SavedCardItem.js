//import liraries
import React, {Component,useEffect,useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SvgIcons from '../../assets/SvgIcons';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import FontText from '../../Components/common/FontText';
import globals from '../../assets/globals';
import axios from 'axios';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../assets/color';

// create a component
const SavedCardItem = ({item, onPress}) => {
  
  const [card,setCard] = useState([]);
 
  
  // const apiGetCards=(token)=>{
  //   AsyncStorage.getItem('userData').then(
  //     (value) =>{
  //       const user = JSON.parse(value);
  //   const url = globals.base_url + "cards/"+user.id;
    
  //   axios
  //     .get(url,{
  //       headers: {
  //         "Content-type": "application/json",
  //         "Accept": "application/json",
  //         "Authorization": `Bearer ${token}` 
  //       }})
  //     .then(function (response) {
  //       console.log(token)
  //       // handle success
  //       setCard(JSON.stringify(response.data));
  //       //alert(JSON.stringify(response.data))
  //       //alert(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       // handle error
  //      alert("" +error);
  //     })
  //     .finally(function () {
  //       // always executed
  //      // alert('Finally called');
  //     });

  //   } ); 
  //   }
    
  //   useEffect(() => {
  //     apiGetCards();
    
  //   }, []);

  return (
    <View style={styles.container}>
      {/* {item.map((item, index) => ( */}
        <View>
      <ImageBackground
        style={styles.imgebg}
        imageStyle={{borderRadius: 25}}
        source={require('../../assets/images/Effects.png')}>
        <FontText
          name={'rubik-bold'}
          style={styles.number}>
          {item.cardnumber}
          {item}
        </FontText>
       
          <View
            style={styles.nameView}>
            <FontText
              name={'rubik-regular'}
              style={styles.nameText}>
              {item.name}
            </FontText>
            <SvgIcons.Seprator
              height={hp(3)}
              width={hp(3)}
              style={{paddingHorizontal: wp(2)}}
            />
            <FontText style={{color: 'white'}}>22/11</FontText>
          </View>
   
      </ImageBackground>

      <TouchableOpacity
        style={{
          padding: wp(5),
        }}
        onPress={onPress}>
        <SvgIcons.Trash
          height={hp(3)}
          width={hp(3)}
        />
      </TouchableOpacity>
      </View>
        {/* ))}  */}
      
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  imgebg:{
    height: hp(22),
    width: wp(80),
    marginVertical: hp(1),
  },
  number:{
    marginTop: hp(13),
    marginHorizontal: hp(4),
    color: 'white',
  },
  visaView:{
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  visaText:{
    color: 'white',

    marginLeft: wp(7),
  },dateText:{color: 'white', marginHorizontal: wp(4)},
  nameView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText:{
    color: 'white',
    // backgroundColor: 'yellow',
    marginLeft: wp(7),
  },
});

//make this component available to the app
export default SavedCardItem;
