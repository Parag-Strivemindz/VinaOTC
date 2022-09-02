import {BackHandler, View} from 'react-native';
import React from 'react';
import HistoryTabs from '../../navigations/paymenhistory/index';

import Header from '../../component/Header';
import GlobalStyles, {CONTAINER_PADDINGTOP} from '../../styles/GlobalStyles';
import {BACKGROUND_COLOR} from '../../styles/Fonts&Colors';
import {useState} from 'react';
import WantToExit from '../../component/WantToExit';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export const stocks = [
  {
    id: '1',
    price: '$120',
    time: '12-jan-2022',
    status: 'pending',
  },
  {
    id: '2',
    price: '$120',
    time: '12-jan-2022',
    status: 'Approved',
  },
  {
    id: '3',
    price: '$120',
    time: '12-jan-2022',
    status: 'pending',
  },
  {
    id: '4',
    price: '$120',
    time: '12-jan-2022',
    status: 'Approved',
  },
];

// const paymentHeader = () => {
//   return (
//     <RowContainer style={{paddingHorizontal: PADDING_HORIZONTAL}}>
//       <View>
//         <Text style={styles.balance}>$12,000</Text>
//         <Text style={styles.lablename}>Total Available Balance</Text>
//       </View>
//       <ActionButton style={styles.actionBtnContainer}>
//         <Text style={styles.deposite}>Deposit</Text>
//       </ActionButton>
//     </RowContainer>
//   );
// };

const PaymentHistory = () => {
  const [getter, setter] = useState({
    isVisible: false,
  });
  const onClose = () => setter(prev => ({...prev, isVisible: !prev.isVisible}));

  const onQuite = () => {
    BackHandler.exitApp();
  };

  useFocusEffect(
    useCallback(() => {
      console.log('called');
      const unsubscribe = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          onClose();
          return true;
        },
      );
      return () => unsubscribe.remove();
    }),
  );
  // useEffect(() => {
  //   const unsubscribe = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       onClose();
  //       return true;
  //     },
  //   );
  //   return () => {
  //     unsubscribe.remove();
  //   };
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: CONTAINER_PADDINGTOP,
      }}>
      <Header />
      <HistoryTabs />
      <WantToExit
        isVisible={getter.isVisible}
        onClose={onClose}
        onQuit={onQuite}
      />
    </View>
  );
};

export default PaymentHistory;
