import React, {useRef, useEffect, useState, useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FONT_BOLD} from '../../styles/Fonts&Colors';

const OtpCounter = ({reSendOtp}) => {
  const [count, setCount] = useState(10);
  const [isOtpSend, setisOtpSend] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
  }, [count]);

  function setTimer() {
    setCount(10);
    setisOtpSend(true);
    reSendOtp();
  }

  return (
    <Pressable style={styles.container} onPress={() => setTimer()}>
      <Text style={styles.countTxt}>{count === 0 ? 'Resend OTP' : count}</Text>
    </Pressable>
  );
};

export default OtpCounter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    // width: 100,
    marginRight: 10,
  },
  countTxt: {
    color: 'white',
    fontFamily: FONT_BOLD,
  },
});
