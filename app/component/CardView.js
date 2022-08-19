import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RowContainer from './RowContainer';
import {SvgXml} from 'react-native-svg';
import {
  LINE_SVG,
  ZIGZAG_SVG,
  ZIGZAG_SVG_1,
  LINE_SVG_1,
} from '../constants/IconConstant';
import {
  BACKGROUND_COLOR,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  WHITE,
} from '../styles/Fonts&Colors';
import CardViewDivider from './CardViewDivider';
import {WP} from '../styles/Dimesions';
import {getItem} from '../utils/AsyncStorage';

const CardView = ({callback, url}) => {
  const RenderBack = url => {
    return (
      <View>
        {url == undefined ? (
          <>
            <Text
              style={{color: WHITE, fontFamily: POPPINS_MEDIUM, fontSize: 14}}>
              HDFC BANK
            </Text>
            <Text
              style={{
                color: WHITE,
                fontFamily: POPPINS_REGULAR,
                fontSize: 12,
                marginVertical: 2,
              }}>
              Growth | Equity - Sectoral/Thematic
            </Text>
            <Text
              style={{
                color: '#FFA500',
                fontFamily: POPPINS_REGULAR,
                fontSize: 12,
              }}>
              Stock Allocted - 11
            </Text>
          </>
        ) : (
          <RowContainer style={{alignItems: 'center'}}>
            <SvgXml xml={url} />
            <View style={{marginLeft: WP(14)}}>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: POPPINS_MEDIUM,
                  fontSize: 14,
                }}>
                HDFC BANK
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: POPPINS_REGULAR,
                  fontSize: 12,
                  marginVertical: 2,
                }}>
                Growth | Equity - Sectoral/Thematic
              </Text>
            </View>
          </RowContainer>
        )}
      </View>
    );
  };

  return (
    <Pressable
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
      style={styles.container}
      onPressIn={() => {
        callback != undefined && callback();
      }}>
      {/**
       * Bank Details
       */}
      <RowContainer>
        {RenderBack(url)}
        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
          {<SvgXml xml={ZIGZAG_SVG_1} style={{marginRight: 5}} />}
          {<SvgXml xml={LINE_SVG_1} style={{bottom: 14}} />}
        </View>
      </RowContainer>
      <CardViewDivider />
      <RowContainer>
        <View>
          <Text style={styles.invest}>Invested</Text>
          <Text style={styles.value}>$200</Text>
        </View>
        <View>
          <Text style={styles.invest}>Current</Text>
          <Text style={styles.value}>$500</Text>
        </View>
        <View>
          <Text style={[styles.invest, {color: '#E94E1B'}]}>Returns</Text>
          <Text
            style={[styles.value, {alignSelf: 'flex-end', color: '#E94E1B'}]}>
            -400
          </Text>
        </View>
      </RowContainer>
    </Pressable>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    elevation: 5,
    borderWidth: 0.3,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowRadius: 2,
    shadowColor: 'rgba(255,255,255,0.7)',
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
  },
  invest: {
    color: '#01C400',
    fontFamily: POPPINS_MEDIUM,
    fontSize: 14,
    alignSelf: 'center',
  },
  value: {
    color: WHITE,
    fontFamily: POPPINS_MEDIUM,
    fontSize: 15,
  },
});
