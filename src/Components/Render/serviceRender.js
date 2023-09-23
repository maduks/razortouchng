import React, { createRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { wp, hp, normalize } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { salonServices } from '../../Utils/data';

const { width, height } = Dimensions.get('screen')

const ServiceRender = (item, index, ref) => {
    const serviceRef = createRef();
    const { t } = useTranslation();
    const [Selected_Services, setSelected_Services] = useState(
        new Array(salonServices.length).fill(false),
    );
    useEffect(() => {
        setSelected_Services(value => {
            value[0] = false;
            return value;
        });
    }, []);

    const _renderItem = (item,index) => {
        // console.log('item is.....',item)
        return (
            <View ref={ref}>
                <TouchableOpacity
                    onPress={() => {
                        const updatedCheckedState = Selected_Services.map(
                            (item, Mainindex) => {
                                return index === Mainindex ? !item : item;
                            },
                        );

                        setSelected_Services(updatedCheckedState);
                    }}
                    style={[styles.SalonTypeMainView]}>
                    <FontText
                        name={'poppins-regular'}
                        size={normalize(14)}
                        style={{ color: colors.black }}>
                            {/* {console.log('item data was....',item)} */}
                        {item.text}
                    </FontText>
                    {Selected_Services[index] ? (
                        <Image
                            source={require('../../assets/images/Services.png')}
                            resizeMode="stretch"
                            style={[styles.EmptyBox, { borderWidth: 0 }]}
                        />
                    ) : (
                        <View style={styles.EmptyBox} />
                    )}
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View
            style={styles.mainView}>
            <FontText
                name={'poppins-semibold'}
                size={normalize(16)}
                pLeft={width * 0.015}
                style={{ color: colors.black }}>
                {t('Services')}
            </FontText>

            <FlatList
                data={salonServices}
                ref={serviceRef}
                keyExtractor={(value, index) => index.toString()}
                scrollEnabled={false}
                style={{ marginTop: width * 0.01 }}
                renderItem={({ item, index }) =>  
                _renderItem(item, index)
            }
            />
        </View>
    )
}

export default ServiceRender;

const styles = StyleSheet.create({
    EmptyBox: {
        width: width * 0.05,
        height: width * 0.05,
        borderWidth: 1,
        borderColor: colors.black,
    },
    SalonTypeMainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: width * 0.025,
        paddingHorizontal: width * 0.02,
    },
    mainView:{
        flex: 1,
        marginTop: width * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray50,
    },
})