//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import Title_And_ViewAll_ForHomeComponent from '../Title_And_ViewAll_ForHomeComponent';
import { useTranslation } from 'react-i18next';
import BottomIndex from '../../Components/common/PopularSalonAndBestInRating_HomePage/bottomIndex';
import { routeName as bookinggenderrouteName } from '../../containers/Booking/Bookinggender';
import {
    BarIndicator,

} from 'react-native-indicators';
import { routeName as InternalServicesRouteName } from '../../containers/InternalServices';
import globals from '../../assets/globals';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// create a component

const BottomProf = ({ navigation, func }) => {
    const { t } = useTranslation();


    const booknow = (item) => {
        func()
        navigation.navigate(bookinggenderrouteName, { ddata: item });
    };

    const onNavigate = (item) => {
        navigation.navigate(InternalServicesRouteName, {
            pdata: item
        }
        );
    };

    const [token, setToken] = useState('');

    const [professionals, setProfessionals] = useState([]);
    const [spaprofessionals, setSpaProfessionals] = useState([]);
    const url = globals.base_url + "professionals";
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        getBanners();
        getSpa();
    }, []);

    const getSpa = async () => {
        await axios
            .get(globals.base_url + "spaprofessionals", {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                'axios-retry': {
                    retries: 5
                },
                timeout: 50000
            })
            .then(function (response) {
                //console.log(token)
                // handle success
                setShowLoader(false)
                const spaProfessionals = response.data;
                setSpaProfessionals(spaProfessionals);


            })
            .catch(function (error) {
                // handle error

            })
            .finally(function () {
                // always executed
                //alert('Finally called');
            });
    }
    const getBanners = () => {
        AsyncStorage.getItem('token').then(
            (value) => {
                // AsyncStorage returns a promise
                // Adding a callback to get the value
                if (value) {
                    setToken(value);

                }
                else {
                    //redirect to login page
                    //AsyncStorage.setItem('token',globals.token_key);
                    // alert('Not Logged')
                }
            });

        axios
            .get(url, {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                'axios-retry': {
                    retries: 5
                },
                timeout: 50000
            })
            .then(function (response) {
                //console.log(token)
                // handle success
                const allProfessionals = response.data;
                setProfessionals(allProfessionals);


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



    return (
        <View>
            <View style={{ marginVertical: 10 }}>
                <Title_And_ViewAll_ForHomeComponent
                    Title={t('Our Groomers')}
                    ViewAll={true}
                    ViewAllPress={() => navigation.navigate('HomeMap')}
                />

            </View>

            {showLoader == true ? <BarIndicator color='red' style={{ marginTop: 50 }} count={9} size={10} animating={showLoader} /> : <View style={{ flexDirection: 'row' }}>
                <FlatList
                    data={professionals}
                    keyExtractor={(value, index) => index.toString()}
                    horizontal={true}
                    style={{ paddingLeft: wp(4) }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (

                        <BottomIndex
                            {...item}
                            navigation={() =>
                                onNavigate(item)
                            }
                            rateBarber={() => booknow(item)}
                            bookNow={() => booknow(item)}
                        />
                    )}
                />
            </View>
            }

        </View>


    );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BottomProf;
