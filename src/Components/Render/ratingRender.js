import React, { createRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { wp, hp, normalize } from '../../styles/responsiveScreen';
import colors from '../../assets/color';
import FontText from '../common/FontText';
import SvgIcons from '../../assets/SvgIcons';
import { Ratings } from '../../Utils/data';

const { width, height } = Dimensions.get('screen')

const RatingRender = (ref) => {

    const { t } = useTranslation();

    const [Selected_Ratings, setSelected_Ratings] = useState(0);
    const ratingRef = createRef();

    const _renderItem = (item, index) => {
        return (
            <View >
                <TouchableOpacity
                    onPress={() => setSelected_Ratings(index)}
                    style={[styles.container, {
                        flexDirection: item.icon ? 'row' : 'column',
                        backgroundColor:
                            Selected_Ratings == index ? '#FD883925' : 'transparent',
                    }]}>
                    <FontText
                        name={'poppins-regular'}
                        size={normalize(14)}
                        style={{
                            color:
                                Selected_Ratings == index ? colors.theme : colors.black,
                        }}>
                            {console.log('data is ...',item)}
                        {item.text}
                    </FontText>
                    {item.icon ? (
                        <SvgIcons.Star
                            style={styles.star}
                            width={width * 0.04}
                            height={width * 0.04}
                        />
                    ) : null}
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
                {t('Ratings')}
            </FontText>

            <FlatList
                data={Ratings}
                ref={ratingRef}
                style={styles.flat}
                keyExtractor={(value, index) => index.toString()}
                scrollEnabled={false}
                horizontal={true}
                renderItem={({ item, index }) => 
                _renderItem(item, index)
            }

            />
        </View>

    )
}
export default RatingRender;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginTop: width * 0.02,
        borderBottomWidth: 1,
        borderColor: colors.gray80,
        paddingBottom: width * 0.035,
        // backgroundColor:'red'
    },
    container: {
        width: width * 0.2,
        height: width * 0.12,

        backgroundColor:'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    star: {
        marginBottom: width * 0.007,
        marginHorizontal: width * 0.005,
    },
    flat: {
        borderWidth: 1,
        borderColor: colors.gray70,
        flex: 1,
        marginTop: width * 0.015,
        alignSelf: 'center',
        borderRadius: width * 0.02,
        // backgroundColor:'red'
    },
})