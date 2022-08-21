import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

import RowContainer from './RowContainer';

import {ARROW_BACK} from '../constants/IconConstant';
import {WP} from '../styles/Dimesions';
import {BACKGROUND_COLOR, POPPINS_MEDIUM, WHITE} from '../styles/Fonts&Colors';
import {HEADER_HEIGHT} from '../styles/GlobalStyles';

const CommonHeader = ({title, rightItem}) => {
  const navigate = useNavigation();

  const navigateBack = () => navigate.goBack();

  return (
    <View style={styles.container}>
      <RowContainer style={{alignItems: 'center'}}>
        <SvgXml
          hitSlop={{
            right: 20,
            left: 20,
          }}
          onPress={navigateBack}
          xml={ARROW_BACK}
          style={styles.icon}
          // viewBox={`0 0 ${100} ${100}`}
        />
        <Text style={styles.headerTitleTxt}>{title}</Text>
      </RowContainer>
      <View>{rightItem && rightItem()}</View>
    </View>
  );
};

CommonHeader.propTypes = {
  title: PropTypes.string.isRequired,
  rightItem: PropTypes.func,
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    shadowRadius: 5,
    shadowColor: 'rgba(255,255,255,0.7)',
    backgroundColor: BACKGROUND_COLOR,
  },
  icon: {
    marginRight: WP(30),
  },
  headerTitleTxt: {
    color: WHITE,
    fontFamily: POPPINS_MEDIUM,
    fontSize: WP(20),
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 14,
    elevation: 1,
  },
});
