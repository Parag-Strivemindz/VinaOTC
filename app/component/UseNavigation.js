import {useCallback, useState, useEffect} from 'react';
import {useNavigation as nativeNavigation} from '@react-navigation/native';

export default useNavigation = screenName => {
  const navigation = nativeNavigation();
  return params => {
    if (screenName) {
      navigation.navigate(screenName, {
        ...params,
      });
    }
  };
};
