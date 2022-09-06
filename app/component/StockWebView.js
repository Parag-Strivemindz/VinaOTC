import {StyleSheet} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {HP, WINDOW_HEIGHT} from '../styles/Dimesions';

const StockWebView = ({html, containerStyle, uri}) => {
  return (
    <WebView
      containerStyle={{
        ...containerStyle,
      }}
      source={html ? {html} : {uri: uri}}
      style={{
        backgroundColor: 'transparent',
        height: WINDOW_HEIGHT * 0.55,
      }}
    />
  );
};

export default StockWebView;

const styles = StyleSheet.create({});
