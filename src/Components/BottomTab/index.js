//import libraries
import React, {Component, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {hp, wp, normalize} from '../../styles/responsiveScreen';

// create a component
const Imagepicker = props => {
  const {refname, value} = props;

  const modalizeRef = useRef();
  // const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <Modalize ref={refname} withHandle={false} modalHeight={hp(30)}>
      {value}
    </Modalize>
  );
};

export default Imagepicker;
