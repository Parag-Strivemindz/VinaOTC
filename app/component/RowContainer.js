import {StyleSheet, Pressable} from 'react-native';
import React from 'react';

const RowContainer = ({children, style, callback}) => {
  return (
    <Pressable
      
      onPress={() => {
        callback != undefined && callback();
      }}
      style={[styles.container, {...style}]}>
      {children}
    </Pressable>
  );
};

export default RowContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
});
