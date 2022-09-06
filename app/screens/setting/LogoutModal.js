import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import CommonFilterModal from '../../component/CommonFilterModal';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../..//component/ActionButton';
import {
  BLACK_70,
  ROBOTO_MEDIUM,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WINDOW_WIDTH, WP} from '../../styles/Dimesions';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {useSelector} from 'react-redux';
import {Selector} from '../../store/redux/localization';
import {i18n} from '../../i18n/lang';

const LogoutModal = ({onClose, getter}) => {
  const language = useSelector(Selector.Localization);
  return (
    <CommonFilterModal
      close={onClose}
      isVisible={getter.isVisible}
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
          {i18n[language.code].areYouSure} {i18n[language.code].logout}
        </Text>
        <RowContainer
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActionButton
            callBack={() => onClose(true)}
            style={{
              ...styles.resetBtn,
              backgroundColor: 'red',
              marginRight: HP(20),
            }}>
            <Text style={[styles.titletxt, {color: WHITE}]}>
              {i18n[language.code].logout}
            </Text>
          </ActionButton>
          <ActionButton
            callBack={() => onClose(false)}
            style={{
              ...styles.resetBtn,
              backgroundColor: SECONDARY_COLOR,
            }}>
            <Text
              style={[styles.titletxt, {color: WHITE}]}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {i18n[language.code].no}
            </Text>
          </ActionButton>
        </RowContainer>
      </View>
    </CommonFilterModal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  resetBtn: {
    height: HP(35),
    width: WP(70),
  },
  titletxt: {
    color: 'rgba(0,0,0,0.7)',
    fontFamily: ROBOTO_MEDIUM,
    // fontSize: WP(15),
  },
});
