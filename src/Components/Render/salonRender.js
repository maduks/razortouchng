import React, { createRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { wp, hp, normalize } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { salonType } from '../../Utils/data';

const { width, height } = Dimensions.get('screen')

const SalonRender = (item, index, ref) => {

    const { t } = useTranslation();
    const salonRef = createRef();
    const [Selected_SalonType, setSelected_SalonType] = useState(0);

    const _renderItem = (item) => {
        return (
            <View>
                <TouchableOpacity ref={ref}
                    onPress={() => setSelected_SalonType(item)}
                    style={styles.SalonTypeMainView}>
                    <FontText
                        name={'poppins-regular'}
                        size={normalize(14)}
                        style={{ color: colors.black }}>
                        {item}
                    </FontText>
                    {Selected_SalonType == item ? (
                        <SvgIcons.RadioOn />
                    ) : (
                        <SvgIcons.RadioOff />
                    )}
                </TouchableOpacity>
            </View>

        )
    }

    return (

        <View
            style={styles.salonView}>
            <FontText
                name={'poppins-semibold'}
                size={normalize(16)}
                pLeft={width * 0.015}
                style={{ color: colors.black }}>
                {t('Salon type')}
            </FontText>


            <FlatList
                data={salonType}
                ref={salonRef}
                keyExtractor={(value, index) => index.toString()}
                scrollEnabled={false}
                style={{ marginTop: width * 0.03 }}
                renderItem={({ item, index }) =>
                    _renderItem(item, index)
                }
            />
        </View>
    )
}

export default SalonRender;

const styles = StyleSheet.create({
    SalonTypeMainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: width * 0.025,
        paddingHorizontal: width * 0.02,
    },
    salonView: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray50,
        zIndex: -1,
    },
})