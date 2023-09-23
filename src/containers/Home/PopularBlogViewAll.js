import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {hp, normalize, wp} from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import BlogItem from '../Blog/BlogItem';
import TextInputWithLogo from '../../Components/common/TextInputWithLogo/TextInputWithLogo';
import FontText from '../../Components/common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import Material_Menu from '../../Components/common/Material_Menu/Material_Menu';
import { popularBlogData, popularData } from '../../Utils/data';

const {width, height} = Dimensions.get('screen');

const PopularBlogViewAll = props => {
  const [searchvalue, setSearchValue] = useState();
  const [isGrid, isGridSelected] = useState(true);
  const [islist, issetlist] = useState(false);

  const [visible, setVisible] = useState(false);
  const [match, setismatch] = useState('');
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
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

  function MaterialMenu() {
    setVisible(!visible);

    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: width * 0.03}}>
        <View
          style={styles.MainView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../assets/images/BackBtn.png')}
              resizeMode="contain"
              style={styles.back}
            />
          </TouchableOpacity>
          <FontText
            size={normalize(20)}
            pLeft={width * 0.05}
            name={'poppins-semibold'}
            color="blackColor">
            {'POPULAR_BLOG'}
          </FontText>
        </View>
        <TextInputWithLogo
          PlaceHolder={'SEARCH_SAL'}
          ContainerStyle={styles.containerStyle}
          logo={true}
        />
      </View>

      <View style={styles.filter}>
        <Material_Menu
          position={{
            position: 'absolute',
            top: height * 0.25,
          }}
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
                {'FILTER'}
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

      <View style={{flex: 1, marginTop: width * 0.03}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={popularBlogData}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={(value, index) => index.toString()}
          renderItem={({item}) => (
            <BlogItem navigation={props.navigation} item={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS == 'ios' ? width * 0.13 : width * 0.04,
  },
  input: {
    marginHorizontal: hp(3),
  },
  filter: {
    flexDirection: 'row',
    marginTop: width * 0.05,
    justifyContent: 'space-between',
    width: width * 0.85,
    alignSelf: 'center',
  },
  iconview: {
    width: hp(2.5),
    height: hp(2.5),
  },
  filtericon: {
    flexDirection: 'row',
    marginVertical: hp(0.5),
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  timedetail: {
    fontWeight: '500',
    marginLeft: wp(1),
  },
  MainView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.03,
    width: width * 0.9,
    alignSelf: 'center',
  },
  back:{
    width: width * 0.05,
    height: width * 0.05,
    tintColor: colors.black,
  },
  containerStyle:{
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.viewcolor,
    height: width * 0.13,
    borderRadius: width * 0.035,
  },
  subView:{
    flexDirection: 'row',
    width: width * 0.35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PopularBlogViewAll;
