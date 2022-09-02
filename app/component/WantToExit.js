import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonFilterModal from './CommonFilterModal';
import RowContainer from './RowContainer';
import ActionButton from './ActionButton';
import {
  BLACK_70,
  ROBOTO_MEDIUM,
  SECONDARY_COLOR,
  WHITE,
} from '../styles/Fonts&Colors';

import {HP, WINDOW_WIDTH, WP} from '../styles/Dimesions';
import {PADDING_HORIZONTAL} from '../styles/GlobalStyles';

const WantToExit = ({isVisible, onClose, onQuit}) => {
  return (
    <CommonFilterModal
      close={onClose}
      isVisible={isVisible}
      containerStyle={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          padding: PADDING_HORIZONTAL,
          backgroundColor: WHITE,
          width: WINDOW_WIDTH * 0.8,
          borderRadius: 11,
          height: HP(140),
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: BLACK_70,
            fontFamily: ROBOTO_MEDIUM,
            alignSelf: 'center',
          }}>
          Are you sure you want to exit
        </Text>
        <RowContainer
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActionButton
            callBack={() =>
              onQuit(prev => ({
                ...prev,
                isVisible: false,
                isQuit: true,
              }))
            }
            style={{
              ...styles.resetBtn,
              backgroundColor: 'red',
              marginRight: HP(20),
            }}>
            <Text style={[styles.titletxt, {color: WHITE}]}>Yes</Text>
          </ActionButton>
          <ActionButton
            callBack={() =>
              onClose(prev => ({
                ...prev,
                isVisible: false,
              }))
            }
            style={{
              ...styles.resetBtn,
              backgroundColor: SECONDARY_COLOR,
            }}>
            <Text style={[styles.titletxt, {color: WHITE}]}>No</Text>
          </ActionButton>
        </RowContainer>
      </View>
    </CommonFilterModal>
  );
};

export default WantToExit;

const styles = StyleSheet.create({
  resetBtn: {
    height: HP(35),
    width: WP(70),
  },
  titletxt: {
    color: 'rgba(0,0,0,0.7)',
    fontFamily: ROBOTO_MEDIUM,
    fontSize: WP(15),
  },
});
