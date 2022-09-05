import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PADDING_HORIZONTAL, PADDING_VERTICAL} from '../styles/GlobalStyles';
import {SvgXml} from 'react-native-svg';
import {WARNING} from '../constants/IconConstant';
import {MONTSERRAT_REGULAR, WHITE} from '../styles/Fonts&Colors';
import {HP, WP} from '../styles/Dimesions';
import RowContainer from './RowContainer';
import {useSelector} from 'react-redux';
import {Selector} from '../store/redux/localization';

const WarningBanner = ({style, title, icon, titleStyle}) => {
  return (
    <View style={[styles.container, {...style}]}>
      <RowContainer>
        {icon && <SvgXml xml={WARNING} style={{marginRight: WP(15)}} />}
        <Text adjustsFontSizeToFit style={[styles.message, {...titleStyle}]}>
          {title}
        </Text>
      </RowContainer>
    </View>
  );
};

WarningBanner.defaultProps = {
  title: 'Please Recheck the account\nNumber Before Making\nPayment!',
  icon: true,
};

export default WarningBanner;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP(PADDING_HORIZONTAL),
    marginHorizontal: PADDING_HORIZONTAL,
    // padding: PADDING_HORIZONTAL,
    height: HP(91),
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontFamily: MONTSERRAT_REGULAR,
    color: WHITE,
    fontSize: WP(14),
    width: '80%',
  },
});
