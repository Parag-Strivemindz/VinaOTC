import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const CommonFilterModal = ({
  children,
  containerStyle,
  close,
  isVisible,
  style,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={() => close(false)}
      {...style}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => close()}
        style={{
          ...styles.container,
          ...containerStyle,
        }}>
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

export default CommonFilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
