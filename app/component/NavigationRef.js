import React, {useCallback, useRef} from 'react';
import {BackHandler} from 'react-native';

function useNavigationRef() {
  const ref = useRef();
  console.log(ref + ' ref');
  const resetNavigationState = value => {
    if (ref.current) {
      console.log('from ResetREf');
      if (ref.current.isReady()) {
        ref.current.resetRoot({index: 0, routes: [{name: 'HomeStack'}]});
      }
    }
  };

  return [ref, resetNavigationState];
}

export default useNavigationRef;
