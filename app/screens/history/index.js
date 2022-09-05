import {View} from 'react-native';
import React from 'react';
import HistoryTabs from '../../navigations/paymenhistory/index';

import Header from '../../component/Header';
import GlobalStyles, {CONTAINER_PADDINGTOP} from '../../styles/GlobalStyles';
import {BACKGROUND_COLOR} from '../../styles/Fonts&Colors';
import WantToExit from '../../component/WantToExit';

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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: CONTAINER_PADDINGTOP,
      }}>
      <Header />
      <HistoryTabs />
      {WantToExit()}
    </View>
  );
};

export default PaymentHistory;
