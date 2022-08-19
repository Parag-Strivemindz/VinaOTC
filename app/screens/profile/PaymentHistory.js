import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {FILLTER_EQUALIZER, WALLET} from '../../constants/IconConstant';
import {SvgXml} from 'react-native-svg';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';
import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import CardViewDivider from '../../component/CardViewDivider';
import styles from './styles';

const data = [
  {
    id: '1',
    payment_type: 'Deposite',
    value: '-11,300',
    time: 'march 12, 6:30 pm',
  },
  {
    id: '2',
    payment_type: 'Withdrawal',
    value: '+8,000',
    time: 'march 12, 6:30 pm',
  },
  {
    id: '3',
    payment_type: 'Deposite',
    value: '-11,300',
    time: 'march 12, 6:30 pm',
  },
  {
    id: '4',
    payment_type: 'Withdrawal',
    value: '+8,000,',
    time: 'march 12, 6:30 pm',
  },
];
const PaymentHistory = () => {
  return (
    <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
      <RowContainer style={{marginBottom: HP(30)}}>
        <Text style={styles.paymentHistory}>PAYMENT HISTORY</Text>
        <SvgXml xml={FILLTER_EQUALIZER} width={15} height={15} />
      </RowContainer>
      {data.map(item => {
        return (
          <React.Fragment key={item.id}>
            <RowContainer>
              <RowContainer>
                <ActionButton
                  style={{
                    ...styles.walletContainer,
                    backgroundColor:
                      item.payment_type == 'Deposite'
                        ? SECONDARY_COLOR
                        : '#E94E1B',
                  }}>
                  <SvgXml xml={WALLET} />
                </ActionButton>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.payment_type}>
                    Payment {item.payment_type}
                  </Text>
                  <Text style={styles.payment_time}>{item.time}</Text>
                </View>
              </RowContainer>
              <Text
                style={{
                  color:
                    item.payment_type == 'Deposite'
                      ? SECONDARY_COLOR
                      : 'rgba(233, 78, 27, 1)',
                }}>
                {item.value}
              </Text>
            </RowContainer>
            <CardViewDivider style={{marginVertical: HP(20)}} />
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default PaymentHistory;
