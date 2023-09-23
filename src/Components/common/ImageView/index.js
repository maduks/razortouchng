
import React from 'react'
import ImageSlider from '../../ImageSlider/ImageSlider';
import FontText from '../FontText';
import { View, Image, StyleSheet, I18nManager, } from 'react-native';
import { wp, hp, normalize } from '../../../styles/responsiveScreen';
import colors from '../../../assets/color';



const ImageView = props => {

    const { pdata } = props;
    return (
        <View>
            <ImageSlider data={pdata.image} />
            <View style={{ marginHorizontal: wp(5) }}>
                <FontText
                    name={'poppins-medium'}
                    size={normalize(18)}
                    pTop={hp(1)}
                    pLeft={wp(2)}>
                    {pdata.salonName}
                </FontText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <FontText
                        name={'poppins-medium'}
                        size={normalize(14)}
                        color={'lightViolet'}
                        style={styles.rattxt}
                        pLeft={wp(2)}
                        pTop={hp(0.5)}>
                        {pdata.ratingText}
                    </FontText>
                    <Image
                        source={pdata.stars}
                        style={styles.star}
                    />
                    <FontText
                        name={'poppins-medium'}
                        size={normalize(14)}
                        color={'lightViolet'}
                        pRight={wp(25)}
                        style={styles.rattxt}
                        pTop={hp(0.5)}>
                        {pdata.review}
                    </FontText>
                    <View style={styles.line} />
                    <FontText
                        name={'poppins-medium'}
                        size={normalize(14)}
                        color={'Violet'}
                        style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
                        pLeft={wp(2)}
                        pRight={wp(2)}
                        pTop={hp(0.5)}>
                        {pdata.desti}
                    </FontText>
                </View>
            </View>
        </View>
    )
}

export default ImageView;

const styles = StyleSheet.create({
    rattxt: {
        fontWeight: '600',
    },
    star: {
        height: wp(4),
        marginTop: hp(0.7),
        width: wp(28),
    },
    line: {
        height: hp(2.5),
        borderWidth: 0.5,
        opacity: 0.5,
        marginTop: hp(0.5),
        marginLeft: wp(10),

        borderColor: colors['lightViolet'],
    },
    line1: {
        height: hp(6),
        borderWidth: 0.5,
        opacity: 0.5,
        borderColor: colors['lightViolet'],
        marginTop: hp(2),
    },
})