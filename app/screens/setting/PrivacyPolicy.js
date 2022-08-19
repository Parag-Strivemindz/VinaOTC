import {View, Text} from 'react-native';
import React from 'react';
import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import {POPPINS_REGULAR} from '../../styles/Fonts&Colors';
import {WP} from '../../styles/Dimesions';
import {
  HEADER_HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../styles/GlobalStyles';

const PrivacyPolicy = () => {
  return (
    <View style={{flex: 1}}>
      <CommonHeader title={'Privacy Policy'} />
      <Container
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
      </Container>
    </View>
  );
};

export default PrivacyPolicy;
