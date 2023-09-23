import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../../assets/color';
import {hp, wp} from '../../../styles/responsiveScreen';
import Input from '../../../Components/common/Input';

// create a component
const Cardview = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.viewcolor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: hp(6),
          alignItems: 'center',
          width: wp(90),
          borderRadius: 10,
        }}>
        <Input
          ref={el => {
            inputRef = el;
          }}
          maxLength={20}
          placeholder={props.name}
          returnKeyType={props.returnKeyType}
          inputStyle={{
            backgroundColor: 'red',
            backgroundColor: colors.viewcolor,

            color: 'black',
            paddingLeft: wp(3),
          }}
          onSubmit={props.onSubmit}
          onChangeText={props.onChangeText}
          value={props.value}
          fontName={'poppins-regular'}
          style={styles.input}
          height={hp(6)}

          // width={wp(90)}
        ></Input>
        <View>{props.righticon}</View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginHorizontal: hp(3),
  },
  input: {
    // marginHorizontal: hp(1.5),
  },
});

//make this component available to the app
export default Cardview;
