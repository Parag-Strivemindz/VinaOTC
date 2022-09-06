import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

import {Selector} from '../../store/redux/dashboard';
import {Selector as languageSelector} from '../../store/redux/localization/index';
import {WINDOW_HEIGHT} from '../../styles/Dimesions';
import getStockList from '../../services/dashboard/GetStockList';
import Loader from '../../component/Loader';
import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';

const HomeStockWebView = () => {
  const stockList = useSelector(Selector.STOCK_LIST);
  const language = useSelector(languageSelector.Localization);

  const nav = useNavigation();

  const dispatch = useDispatch();

  const htmlRenerer = () => {
    if (language.code == 'en') {
      return stockList.data.data[0].sotck_listing_en;
    }
    if (language.code == 'vi') {
      return stockList.data.data[0].sotck_listing_viet;
    }
    if (language.code == 'zh') {
      return stockList.data.data[0].sotck_listing_chi;
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getStockList());
    }, []),
  );

  return (
    <>
      {stockList.isLoading ? (
        <Loader color={SECONDARY_COLOR} size="large" />
      ) : (
        stockList.data && (
          <WebView
            setSupportMultipleWindows={false}
            onLoadProgress={e => {
              if (e.nativeEvent.url.includes('https')) {
                const url = e.nativeEvent.url
                  .slice(-8)
                  .replace('/', '')
                  .replace('-', ':');
                console.log(url + ' url');
                nav.navigate('Portfolio', {
                  CodeID: url,
                });
              }
            }}
            source={{html: htmlRenerer()}}
            style={{
              backgroundColor: 'transparent',
              height: WINDOW_HEIGHT * 0.55,
            }}
          />
        )
      )}
    </>
  );
};

export default HomeStockWebView;

const styles = StyleSheet.create({});
