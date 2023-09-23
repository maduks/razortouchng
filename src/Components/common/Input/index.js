import React, {
  createRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  findNodeHandle,
  Image,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  Keyboard
} from 'react-native';
import colors from '../../../assets/color';
import fonts from '../../../assets/fonts';
import {hp, normalize, wp} from '../../../styles/responsiveScreen';

const {width, height} = Dimensions.get('screen');

const Input = forwardRef(
  (
    {
      value,
      editable,
      height,
      fontSize,
      fontName,
      color,
      placeholder,
      placeholderTextColor,
      blurOnSubmit,
      returnKeyType,
      multiline,
      multilineHeight,
      keyboardType,
      autoCapitalize,
      maxLength,
      secureTextEntry,
      inputStyle,
      children,
      style,
      onFocus,
      onBlur,
      autoFocus,
      textAlign,
      caretHidden,
      contextMenuHidden,
      selectTextOnFocus,
      pointerEvents,
      onSubmit,
      clearOnSubmit,
      willCheckPosition,
      checkPosition,
      onChangeText,
      onEndEditing,
      onKeyPress,
      righticon,
      withrighticon,
      rightImage,
      customeStyles,
      BackBtn,
      navigation,
    },
    ref,
  ) => {
    const [inputValue, setValue] = useState(value);
    const [inputEditable, setEditable] = useState(editable);
    let inputRef = createRef();

    const onChangeTextHandler = text => {
      setValue(text);
      if (typeof onChangeText === 'function') {
        onChangeText(text);
      }
    };

    const onSubmitEditingHandler = () => {
      if (typeof onSubmit === 'function') {
        onSubmit(inputValue);
      }
      if (clearOnSubmit) {
        setValue('');
      }
      Keyboard.dismiss();
    };

    const onFocusHandler = () => {
      if (typeof onFocus === 'function') {
        onFocus();
      }
      if (willCheckPosition && typeof checkPosition === 'function') {
        checkPosition(findNodeHandle(inputRef));
      }
    };

    const _inputStyle = {
      height: multiline ? multilineHeight : height,
      fontSize,
      fontFamily: fonts[fontName],
      color: colors[color],
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.focus(),
      blur: () => inputRef.blur(),
      disable: () => setEditable(false),
      enable: () => setEditable(true),
    }));

    return (
      <View style={[styles.wrapper, style]}>
        {BackBtn && (
          <TouchableOpacity onPress={navigation}>
            <Image
              source={require('../../../assets/images/BackBtn.png')}
              resizeMode="contain"
              style={{
                width: width * 0.05,
                height: width * 0.05,
                marginLeft: width * 0.025,
                tintColor: colors.gray80,
              }}
            />
          </TouchableOpacity>
        )}

        <TextInput
          ref={el => {
            inputRef = el;
          }}
          selectionColor={'black'}
          textContentType="none"
          pointerEvents={pointerEvents}
          editable={inputEditable}
          value={value}
          textAlign={textAlign}
          autoComplete="off"
          autoCorrect={false}
          allowFontScaling={false}
          placeholder={placeholder}
          placeholderTextColor={
            colors[placeholderTextColor]
              ? `${colors[placeholderTextColor]}4d`
              : ''
          }
          onChangeText={onChangeTextHandler}
          onSubmitEditing={onSubmitEditingHandler}
          blurOnSubmit={multiline ? false : blurOnSubmit}
          returnKeyType={returnKeyType}
          multiline={multiline}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onFocus={onFocusHandler}
          onBlur={onBlur}
          onEndEditing={onEndEditing}
          autoFocus={autoFocus}
          caretHidden={caretHidden}
          contextMenuHidden={contextMenuHidden}
          selectTextOnFocus={selectTextOnFocus}
          rightImage={rightImage}
          onKeyPress={onKeyPress}
          style={[
            multiline ? styles.inputMultiline : null,
            styles.input,
            _inputStyle,
            inputStyle,
            customeStyles,
          ]}
        />

        {children}
        {withrighticon ? righticon : null}
        {/* <Image
          source={require('../../../assets/images/Search.png')}
          style={{width: 25, height: 25, tintColor: colors.gray}}
        /> */}
      </View>
    );
  },
);

Input.defaultProps = {
  height: 40,
  fontSize: normalize(16),
  fontName: 'default',
  color: 'default',
  // placeholder: 'Type something...',
  placeholderTextColor: colors.placeholder,
  // defaultValue: '',
  clearOnSubmit: false,
  blurOnSubmit: false,
  returnKeyType: 'default',
  multiline: false,
  multilineHeight: hp(10),
  autoCapitalize: null,
  editable: true,
  keyboardType: 'default',
  maxLength: null,
  secureTextEntry: false,
  onFocus: null,
  onBlur: null,
  autoFocus: false,
  textAlign: null,
  onChangeText: null,
  caretHidden: false,
  contextMenuHidden: false,
  selectTextOnFocus: false,
  willCheckPosition: true,
};

const styles = StyleSheet.create({
  input: {
    // paddingLeft: 10,
    // paddingRight: 10,
    backgroundColor: colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
    width: wp(80),
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.viewcolor,
    borderRadius: 10,
    alignItems: 'center',
    width: wp(90),
  },
});

export default Input;
