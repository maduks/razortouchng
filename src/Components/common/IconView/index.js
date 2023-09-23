import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, I18nManager } from "react-native";
import FontText from "../FontText";
import { wp, hp, normalize } from "../../../styles/responsiveScreen";
import Dashed from "../Dashed/Dashed";
import { FlatList } from "react-native-gesture-handler";
import { icon } from "../../../Utils/data";

const IconView = (props) => {

  const _renderItem = (item, index) => {
    return(
    <View style={styles.itemView}>
      <View>
        <TouchableOpacity>
          <Image
            source={item.iconImg}
            style={styles.icon}
          />
          <FontText
            name={'poppins-medium'}
            size={normalize(12)}
            pTop={hp(0.5)}
            textAlign="center"
            pLeft={wp(0)}
            style={{ marginLeft: I18nManager.isRTL ? wp(0) : wp(1) }}
            color={'Violet'}>
            {item.iconName}
          </FontText>
        </TouchableOpacity>
      </View>
      <View style={styles.line1} />
    </View>
    )
  }


  return (
    <View>
      <Dashed width={wp(3)} ContainerStyle={{ marginHorizontal: wp(5), marginVertical: hp(1.5) }} />
      <FlatList scrollEnabled ={false} showsHorizontalScrollIndicator={false} style={{ flex: 1 }} horizontal={true} data={icon} renderItem={({ item, index }) => _renderItem(item, index)} keyExtractor={(item, index) => item.id} />
      <Dashed width={wp(3)} ContainerStyle={{ marginHorizontal: wp(5), marginVertical: hp(2) }} />
    </View>
  )
}

export default IconView;

const styles = StyleSheet.create({
  icon: {
    height: wp(6.5),
    marginTop: hp(2.5),
    width: wp(7.1),
    marginLeft:wp(2),
  },
  border: {
    marginTop: hp(2),
    opacity: 0.5,
    marginRight: wp(3.5),
    marginLeft: wp(2),
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  line1: {
    height: hp(6),
    borderWidth: 0.5,
    marginLeft:wp(5),
    opacity: 0.5,
    borderColor: '#8384A1',
    marginTop: hp(2),
  },

  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(-1),
    marginHorizontal: wp(5)
  },
})