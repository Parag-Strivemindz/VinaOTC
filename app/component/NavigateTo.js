import React, {useCallback} from 'react';

export default NavigateTo = (screenName, navigation) => {
  const callme = useCallback((screenName, navigation) => {
    navigation.navigate(screenName);
  }, []);

  if (screenName && navigation) {
    callme(screenName, navigation);
  }
};
