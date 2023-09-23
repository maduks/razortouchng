import React, { useEffect, useRef, useState, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputWithLogo from '../../Components/common/TextInputWithLogo/TextInputWithLogo';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Index from '../../Components/common/PopularSalonAndBestInRating_HomePage/Index';
import FontText from '../../Components/common/FontText';
import { normalize } from '../../styles/responsiveScreen';
import { Modalize } from 'react-native-modalize';
import InternalServices, {
  routeName as InternalServicesRouteName,
} from '../InternalServices';
import { routeName as BookinggenderRouteName } from '../Booking/Bookinggender';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/color';
import CommonRender from '../../Components/CommonRender';
import { upComingData } from '../../Utils/data';

const { width, height } = Dimensions.get('screen');

const HomeMap = props => {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  // For View List
  const ModalizeRef = useRef(null);


  const [Markers, setMarkers] = useState([
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.79, longitude: -122.4324 },
    { latitude: 37.788, longitude: -122.435 },
    { latitude: 37.788, longitude: -122.43 },
  ]);

  const bookNow = (item) => {
    props.navigation.navigate(BookinggenderRouteName,{ddata:item});
  };

  const onNavigate = (item) =>{
  props.navigation.navigate(InternalServicesRouteName, { pdata: item })
}

const onInterNavigate =(item) =>{
props.navigation.navigate(InternalServicesRouteName, {
  pdata: item
})
}
  const OpenModalize = () => {
    Keyboard.dismiss();

    setTimeout(() => {
      ModalizeRef.current.open();
    }, 50);
  };
  const CloseModalize = () => {
    ModalizeRef.current.close();
  };

  const OpenModel = () => {
    // alert(modalVisible)
    setModalVisible(true);
  };


  return (
    <SafeAreaView style={styles.safe}>
      <TextInputWithLogo
        ContainerStyle={styles.containerInput}
        logo={true}
        filter={true}
        BackPress={() => props.navigation.goBack()}
        filterPressed={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            OpenModel()
          }, 50);
        }}
        navigation={() => props.navigation.navigate('HomeSearch')}
      />

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {Markers.map((item, index) => (
          <MapView.Marker
            key={index}
            coordinate={item}
            title={`${index} - Title`}
            description={`${index} - Description`}
            onRegionChangeComplete={region => setMarkers(region)}
          />
        ))}
      </MapView>

      {/* Shown in DownSide of Map */}
      <View
        style={styles.flatView}>
        <FlatList
          data={upComingData}
          keyExtractor={(value, index) => index.toString()}
          horizontal={true}
          style={{ marginLeft: width * 0.06 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Index
              {...item}
              navigation={() => onNavigate(item)}
              bookNow={() => bookNow(item)}
            />
          )}
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={height * 0.05}
        behavior={'padding'}
        style={styles.Round}>

        <View style={styles.RoundIcon}>
          <Image
            source={require('../../assets/images/ListView.png')}
            resizeMode="contain"
            style={styles.Image}
          />
        </View>

        <TouchableOpacity
          style={styles.ViewLIstMainView}
          onPress={() => OpenModalize()}>
          <Image
            source={require('../../assets/images/ListViewIcon.png')}
            resizeMode="contain"
            style={styles.Image}
          />
          <FontText
            name={'poppins-semibold'}
            size={normalize(14)}
            pLeft={width * 0.015}
            style={{ color: '#397DFF' }}>
            {t('VIEW_LIST')}
          </FontText>
        </TouchableOpacity>

      </KeyboardAvoidingView>

      {/* For View List */}
      <Modalize
        modalStyle={styles.modelView}
        modalHeight={height * 0.8}
        ref={ModalizeRef}
        customRenderer={() => (
          <View style={{ flex: 1 }}>
            <FlatList
              data={upComingData}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (

                <Index
                  {...item}
                  ChangeWidth={true}
                  navigation={() => onInterNavigate(item)}
                />
              )}
            />
          </View>
        )}
      />

      {/* For Filter */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

 <CommonRender Header={true} filterView={true} headerTitle={t('FILTER')} crossPress={() => setModalVisible(!modalVisible)
        } />


      </Modal>
    </SafeAreaView>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  safe:{ flex: 1, backgroundColor: colors.white },
  map: {
    flex: 1,
    marginTop: 10,
  },
  Image: {
    width: width * 0.07,
    height: width * 0.07,
  },
  Round: {
    flex: 1,
    position: 'absolute',
    top: height * 0.4,
    right: width * 0.05,
    shadowOffset: { width: 0, height: 3.09 },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 16.2,
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.viewcolor,
    height: width * 0.13,
  },
  RoundIcon: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 50,
    width: width * 0.12,
    alignSelf: 'flex-end',
    marginBottom: width * 0.02,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewLIstMainView: {
    width: width * 0.33,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    elevation: 15,
  },
  ModalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height * 0.82,
    flex: 1,
  },
  Container: {
    backgroundColor: colors.white,
    width: width,
    paddingHorizontal: 20,
    flex: 1,
  },
  modelView: {
    alignItems: 'center',
    paddingTop: width * 0.05,
  },
  flatView: {
    position: 'absolute',
    bottom: height * 0.03,
  },
});
