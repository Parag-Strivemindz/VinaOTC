import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../styles/Dimesions';

export default function HtmlRenderer() {
  //   console.log(html);
  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'iframe') {
      const a = node.attribs;
      const iframeHtml = `<script src="${a.src}"></script>`;
      return (
        <View
          key={index}
          style={{width: Number(a.width), height: Number(a.height)}}>
          <WebView source={{html: iframeHtml}} />
        </View>
      );
    }
  }

  const html = `<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
  <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
      {
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": false,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
      "isTransparent": false,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "tabs": [
        {
          "title": "Indices",
          "symbols": [
            {
              "s": "HNX:CEO"
            },
            {
              "s": "HNX:PVS"
            },
            {
              "s": "HNX:SHS"
            },
            {
              "s": "HNX:HUT"
            },
            {
              "s": "HNX:IDC"
            },
            {
              "s": "HNX:HNXINDEX"
            }
          ],
          "originalTitle": "Indices"
        }
      ]
    }
      </script>
    </div>`;

  const htmlContent = `
  <div>
    <iframe src="http://info.cern.ch/" width="360" height="300" />
  </div>
`;
  return (
    <View style={styles.a}>
      <HTMLView value={html} renderNode={renderNode} />
    </View>
  );
}

const styles = StyleSheet.create({
  a: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.55,

    borderWidth: 1,
    borderColor: 'red',
    // make links coloured pink
  },
});
