import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {BACKGROUND_COLOR} from '../styles/Fonts&Colors';
import {HEADER_HEIGHT} from '../styles/GlobalStyles';
import {HP} from '../styles/Dimesions';

function Container({containerStyles, scrollViewContainerStyle, children}) {
  const paddingBottom = useBottomTabBarHeight();
  return (
    <View style={[styles.mainContainer, {...containerStyles}]}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: paddingBottom || HP(50),
          ...scrollViewContainerStyle,
        }}>
        {children}
      </ScrollView>
    </View>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
