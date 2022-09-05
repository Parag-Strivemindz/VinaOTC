import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

import RowContainer from './RowContainer';

import {ZIGZAG_SVG, ZIGZAG_SVG_1, LINE_SVG_1} from '../constants/IconConstant';
import CardViewDivider from './CardViewDivider';

import {
  BACKGROUND_COLOR,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
} from '../styles/Fonts&Colors';
import {WP} from '../styles/Dimesions';
import {i18n} from '../i18n/lang';
import {useSelector} from 'react-redux';
import {Selector} from '../store/redux/localization';

const GrowthAndEquity = (
  <Text
    style={{
      color: WHITE,
      fontFamily: POPPINS_REGULAR,
      fontSize: 12,
      marginVertical: 2,
    }}>
    Growth | Equity - Sectoral/Thematic
  </Text>
);

const CardView = ({callback, url, data}) => {
  const language = useSelector(Selector.Localization);

  const {
    total_price,
    stock_amount,
    order_type,
    qty,
    title,
    stock_id,
    status,
    code,
    created_at,
  } = data;

  const RenderBack = url => {
    return (
      <View>
        {url == undefined ? (
          <>
            <Text
              style={{color: WHITE, fontFamily: POPPINS_MEDIUM, fontSize: 14}}>
              {title}
            </Text>
            <Text
              style={{
                color: WHITE,
                fontFamily: POPPINS_REGULAR,
                fontSize: 12,
                marginVertical: 2,
              }}>
              {code}
            </Text>
            {/**
             * Stock and Equity
             */}
            <Text
              style={{
                color: '#FFA500',
                fontFamily: POPPINS_REGULAR,
                fontSize: 12,
              }}>
              Stock Allocted - {qty || 0}
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
                {title}
              </Text>
              {/**
               * Stock and Equity
               */}
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
      style={[styles.container, {paddingTop: 30}]}
      onPress={() => {
        callback != undefined && callback();
      }}>
      {/**
       * Bank Details
       */}
      <RowContainer
        callback={() => {
          if (callback != undefined) {
            callback();
          }
        }}>
        {RenderBack(url)}
        <Text
          style={{
            color: SECONDARY_COLOR,
            fontSize: WP(14),
            fontFamily: ROBOTO_REGULAR,
            textTransform: 'capitalize',
          }}>
          {order_type}
        </Text>
      </RowContainer>
      <CardViewDivider />
      <RowContainer callback={() => callback != undefined && callback()}>
        <View>
          <Text style={styles.invest}>{i18n[language.code].invested}</Text>
          <Text style={styles.value}>{total_price}</Text>
        </View>
        <View>
          <Text style={styles.invest}>{i18n[language.code].current}</Text>
          <Text style={styles.value}>{stock_amount}</Text>
        </View>
        <View>
          <Text
            style={[
              styles.invest,
              {color: status ? WHITE : '#E94E1B', textTransform: 'capitalize'},
            ]}>
            {status ? i18n[language.code].status : i18n[language.code].return}
          </Text>
          <Text
            style={[
              styles.value,
              {
                alignSelf: 'flex-end',
                color: status == 'pending' ? '#E94E1B' : SECONDARY_COLOR,
                textTransform: 'capitalize',
                fontFamily: POPPINS_MEDIUM,
                fontSize: WP(14),
              },
            ]}>
            {status
              ? status == 'pending'
                ? i18n[language.code].pending
                : i18n[language.code].approved
              : '-400'}
          </Text>
        </View>
      </RowContainer>
      <View
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          right: 10,
          top: 5,
        }}>
        {status != 'pending' ? (
          <>
            <SvgXml xml={ZIGZAG_SVG} style={{marginRight: 5}} />
            <SvgXml xml={LINE_SVG_1} style={{bottom: 3}} />
          </>
        ) : (
          <>
            <SvgXml xml={ZIGZAG_SVG_1} style={{marginRight: 5}} />
            <SvgXml xml={LINE_SVG_1} style={{bottom: 14}} />
          </>
        )}
      </View>
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
    fontSize: WP(14),
    alignSelf: 'center',
  },
  value: {
    color: WHITE,
    fontFamily: POPPINS_MEDIUM,
    fontSize: 15,
  },
});
