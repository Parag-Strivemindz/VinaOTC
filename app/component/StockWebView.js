import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {HP, WINDOW_HEIGHT} from '../styles/Dimesions';
import {PADDING_VERTICAL} from '../styles/GlobalStyles';

// const html = `<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0\">\n<div class=\"tradingview-widget-container\">\n    <div class=\"tradingview-widget-container__widget\"></div>\n    <script type=\"text/javascript\" src=\"https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js\" async>\n    {\n    \"colorTheme\": \"dark\",\n    \"dateRange\": \"12M\",\n    \"showChart\": false,\n    \"locale\": \"en\",\n    \"width\": \"100%\",\n    \"height\": \"100%\",\n    \"largeChartUrl\": \"\",\n    \"isTransparent\": false,\n    \"showSymbolLogo\": true,\n    \"showFloatingTooltip\": false,\n    \"tabs\": [\n      {\n        \"title\": \"Indices\",\n        \"symbols\": [\n          {\n            \"s\": \"HNX:CEO\"\n          },\n          {\n            \"s\": \"HNX:PVS\"\n          },\n          {\n            \"s\": \"HNX:SHS\"\n          },\n          {\n            \"s\": \"HNX:HUT\"\n          },\n          {\n            \"s\": \"HNX:IDC\"\n          },\n          {\n            \"s\": \"HNX:HNXINDEX\"\n          }\n        ],\n        \"originalTitle\": \"Indices\"\n      }\n    ]\n  }\n    </script>\n  </div>`;
const StockWebView = ({html, containerStyle}) => {
  return (
    <WebView
      containerStyle={{
        ...containerStyle,
      }}
      source={{html}}
      style={{
        backgroundColor: 'transparent',
        height: WINDOW_HEIGHT * 0.55,
      }}
    />
  );
};

export default StockWebView;

const styles = StyleSheet.create({});
