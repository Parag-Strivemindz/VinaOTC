import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';

import {BALCK, ROBOTO_MEDIUM, SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import {CONTAINER_PADDINGTOP} from '../../styles/GlobalStyles';

const PrivacyPolicy = () => {
  function OnErrorShow({errorDomain, errorCode, errorDesc}) {
    console.log(errorDomain);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 15,
            color: BALCK,
            fontFamily: ROBOTO_MEDIUM,
          }}>
          Something Went Wrong...
        </Text>
      </View>
    );
  }

  function OnLoading() {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator animating size={'large'} color={SECONDARY_COLOR} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <WebView
        onError={({event}) => {
          console.log(event);
        }}
        onLoadProgress={OnLoading}
        onHttpError={event => {
          console.log(event.nativeEvent);
        }}
        renderError={OnErrorShow}
        bounces={false}
        source={{
          uri: 'https://vinaotc.com/backend/api/privacy_policy?lang=en',
        }}
      />
    </View>
  );
};

export default PrivacyPolicy;

{
  /* <Container
        containerStyles={{
          paddingTop: HEADER_HEIGHT + PADDING_VERTICAL,
          paddingHorizontal: PADDING_HORIZONTAL,
        }}>
        <Text
          style={{
            fontFamily: POPPINS_REGULAR,
            color: 'rgba(150, 149, 168, 1)',
            lineHeight: 24,
          }}>
          To setup a campaign, ﬁrst you need to add or create a list of
          contacts. All you need is a ﬁrst name and an email address. You can
          add one at a time or upload a spread sheet list in a .csv format.
          Click here to view an example. If you need assistance, watch the
          helper video or contact us To setup a campaign, ﬁrst you need to add
          or create a list of contacts. All you need is a ﬁrst name and an email
          address. You can add one at a time or upload a spread sheet list in a
          .csv format. Click here to view an example. If you need assistance,
          watch the helper video or contact usTo setup a campaign, ﬁrst you need
          to add or create a list of contacts. All you need is a ﬁrst name and
          an email address. You can add one at a time or upload a spread sheet
          list in a .csv format. Click here to view an example. If you need
          assistance, watch the helper video or contact us To setup a campaign,
          ﬁrst you need to add or create a list of contacts. All you need is a
          ﬁrst name and an email address. You can add one at a time or upload a
          spread sheet list in a .csv format. Click here to view an example. If
          you need assistance, watch the helper video or contact us
        </Text>
      </Container> */
}
