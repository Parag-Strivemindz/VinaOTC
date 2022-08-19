import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  LOGIN_CENTER_IMAGE,
  VEENA_OTC_LOGO,
} from '../../../constants/ImageConstant';
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
  WHITE,
} from '../../../styles/Fonts&Colors';
import {WP, HP} from '../../../styles/Dimesions';
import HifenDivider from '../../../component/HifenDivider';

function CommonAuthComponent({
  containerStyle,
  imageContainer,
  logoContainer,
  source,
  text,
}) {
  return (
    <View style={[containerStyle]}>
      <View style={[{height: WP(150)}, imageContainer]}>
        <Image
          source={source}
          style={{height: '100%', width: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          height: WP(40),
          marginTop: HP(50),
        }}>
        <Image
          source={VEENA_OTC_LOGO}
          style={{height: '100%', width: '100%'}}
          resizeMode="contain"
        />
      </View>
      <HifenDivider />
      <Text
        style={[
          {
            alignSelf: 'center',
            color: WHITE,
            fontFamily: MONTSERRAT_SEMIBOLD,
            fontSize: 16,
            marginTop: HP(25),
          },
        ]}>
        {text}
      </Text>
    </View>
  );
}
export default CommonAuthComponent;

const styles = StyleSheet.create({});
