import React, {Component, useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import ProfileHeader from '../../Components/Home/ProfileHeader';
import {hp, wp, normalize, isIOS, isX} from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import BlogItem from './BlogItem';
import BlogList from './BlogList';
import TextInputWithLogo from '../../Components/common/TextInputWithLogo/TextInputWithLogo';
import Material_Menu from '../../Components/common/Material_Menu/Material_Menu';
import {useTranslation} from 'react-i18next';
import { popularBlogData } from '../../Utils/data';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const routeName = 'Blog';

const Blog = props => {
  const {t} = useTranslation();
  const [token,setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const url = globals.base_url + "blogs";
  const [searchvalue, setSearchValue] = useState();
  const [isGrid, isGridSelected] = useState(true);
  const [islist, issetlist] = useState(false);
  
  const [visible, setVisible] = useState(false);
  const [match, setismatch] = useState('');
  const onselectlist = () => {
    
    isGridSelected(true);
    issetlist(false);
  };
  const onselectitem = () => {
    isGridSelected(false);
    issetlist(true);
   
  };
  const onpopupfilter = () => {
    setVisible(true);
    
  };
  const onpopmatch = value => {
    setismatch(value);
  };
  function MaterialMenu() {
    setVisible(!visible);
    return null;
  }




  const getBlogs =()=>{
    
    AsyncStorage.getItem('token').then(
      (value) =>{
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        if(value){
          setToken(value);
         
        }
        else{
          //redirect to login page
          //AsyncStorage.setItem('token',globals.token_key);
          //alert('Not Logged')
        }
       } );
      
          axios
        .get(url,{
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}` 
          }})
        .then(function (response){
          console.log(token)
          // handle success
          const allBlogs = response.data;
          setBlogs(allBlogs);
          
          
         
          
        })
        .catch(function (error) {
          // handle error
         alert(error);
        })
        .finally(function () {
          // always executed
         //alert('Finally called');
        });
   }

  useEffect(()=>{
    getBlogs();
    //alert(blogs)
   },[]);





  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        Blog={true}
        style={styles.profile}
        navigation={() => props.navigation.navigate('HomeNotificationEmpty')}
      />
      {/* <TextInputWithLogo
        PlaceHolder={t('SEARCH_BLOG')}
        ContainerStyle={styles.Search}
        logo={true}
      /> */}
      <View style={styles.filter}>
        <FontText
          size={normalize(18)}
          name={'poppins-semibold'}
          color="blackColor">
          {t('LATEST_BLOG')}
        </FontText>
        <Material_Menu
          position={styles.material}
          visible={visible}
          BlogScreen={true}
          click={() => MaterialMenu()}
        />
        <View
          style={styles.subView}>
          <TouchableOpacity onPress={onpopupfilter}>
            <View style={styles.filtericon}>
              <Image
                source={require('../../assets/images/filter-edit.png')}
                style={styles.iconview}
              />
              <FontText
                style={styles.timedetail}
                size={normalize(14)}
                name="Poppins-Regular"
                color="lightViolet">
                {t('FILTER')}
              </FontText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onselectitem}>
            {islist ? (
              <SvgIcons.Themeorange height={hp(2)} width={hp(2)} />
            ) : (
              <SvgIcons.Theme height={hp(2)} width={hp(2)} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onselectlist}>
            {isGrid ? (
              <SvgIcons.Category height={hp(2.5)} width={hp(2.5)} />
            ) : (
              <SvgIcons.Categoryblank height={hp(2)} width={hp(2)} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        {isGrid ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={blogs}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <BlogItem navigation={props.navigation} item={blogs}></BlogItem>
              );
            }}
            scrollEnabled={true}
            keyExtractor={(value, index) => index.toString()}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={blogs}
            style={{marginTop: hp(1)}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(value, index) => index.toString()}
            scrollEnabled={true}
            renderItem={({item}) => {
              return (
                <BlogList navigation={props.navigation} item={blogs}></BlogList>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS == 'ios' ? wp(13) : wp(0.4),
  },
  input: {
    marginHorizontal: hp(3),
  },
  filter: {
    marginVertical: hp(0.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(85),
    alignSelf: 'center',
  },
  iconview: {
    width: hp(2.5),
    height: hp(2.5),
  },
  filtericon: {
    flexDirection: 'row',
    marginVertical: hp(0.5),
    justifyContent: 'center',
  },
  timedetail: {
    fontWeight: '500',
    marginLeft: wp(1),
  },
  profile:{width:wp(90), alignSelf: 'center', marginVertical: 8},
  Search:{
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: colors.viewcolor,
    height: wp(13),
    borderRadius: wp(0.5),
  },
  material:{
    position: 'absolute',
    top: hp(25),
  },
  subView:{
    flexDirection: 'row',
    width:wp(35),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Blog;
