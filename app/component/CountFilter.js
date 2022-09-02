import React, {useState} from 'react';
import {View, Text, Pressable, Modal, StyleSheet} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import ActionButton from './ActionButton';
import RowContainer from './RowContainer';
import {ARROW_DOWN} from '../constants/IconConstant';

import {HP, WP} from '../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR_90,
  ROBOTO_MEDIUM,
  WHITE,
  WHITE_30,
} from '../styles/Fonts&Colors';

const CountFilter = ({
  style,
  numberOfItems,
  paymentSetter,
  disableLeftButton,
  disableRightButton,
}) => {
  const [getter, setter] = useState({
    isVisible: false,
  });
  // console.log(numberOfItems + ' numberOfItems');
  const numberItem = [
    {
      id: '1',
      value: 3,
    },
    {
      id: '2',
      value: 4,
    },
    {
      id: '3',
      value: 5,
    },
    {
      id: '4',
      value: 10,
    },
  ];

  const itemSelecthandler = value => {
    try {
      setter(prev => ({
        ...prev,
        isVisible: false,
      }));
      paymentSetter(prev => ({
        ...prev,
        numberOfItemOnPage: value,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const hideMenu = () => setter(prev => ({...prev, isVisible: false}));

  const showMenu = () => setter(prev => ({...prev, isVisible: true}));

  const ArrowDown = ({style}) => (
    <SvgXml
      style={[
        style,
        {
          transform: [
            {
              rotate: getter.isVisible ? '0deg' : '180deg',
            },
          ],
          width: 16,
          height: 16,
          marginLeft: 10,
        },
      ]}
      stroke={WHITE_30}
      xml={ARROW_DOWN}
    />
  );

  const Picker = () => {
    const tabBarHeight = useBottomTabBarHeight();

    return (
      <Modal
        transparent
        visible={getter.isVisible}
        onRequestClose={hideMenu}
        animationType="fade">
        <Pressable
          onPress={hideMenu}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: tabBarHeight || HP(50),
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              width: WP(100),
              borderRadius: 10,
              backgroundColor: BLACK_COLOR_90,
              justifyContentL: 'space-between',
            }}>
            {numberItem.map((item, index) => (
              <Pressable
                onPress={() => itemSelecthandler(item.value)}
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>{item.value}</Text>
                {/* {index == 0 && <ArrowDown />} */}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View
      style={{
        height: HP(50),
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center',
        ...style,
      }}>
      <RowContainer style={{paddingHorizontal: 20}}>
        <ActionButton
          disabled={disableLeftButton}
          style={{width: WP(90), height: HP(36), padding: 5}}
          callBack={() =>
            paymentSetter(prev => ({
              ...prev,
              pageNumber: prev.pageNumber - 1,
            }))
          }>
          <Text style={styles.actionBtnTxt}>Previous</Text>
        </ActionButton>
        <ActionButton callBack={showMenu} style={styles.actionBtn}>
          <Text style={{color: 'white'}}>{numberOfItems}</Text>
          <ArrowDown />
        </ActionButton>
        <ActionButton
          disabled={disableRightButton}
          callBack={() =>
            paymentSetter(prev => ({
              ...prev,
              pageNumber: prev.pageNumber + 1,
            }))
          }
          style={{width: WP(90), height: HP(36), padding: 5}}>
          <Text style={styles.actionBtnTxt}>Next</Text>
        </ActionButton>
      </RowContainer>
      <Picker />
    </View>
  );
};

const styles = StyleSheet.create({
  actionBtnTxt: {
    color: WHITE,
    fontFamily: ROBOTO_MEDIUM,
    fontSize: 14,
  },
  actionBtn: {
    width: WP(63),
    height: HP(36),
    padding: 5,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: WHITE_30,
    backgroundColor: 'transparent',
    borderRadius: 3,
  },
});

export default CountFilter;
