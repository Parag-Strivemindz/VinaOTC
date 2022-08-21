import {LogBox, Text, View} from 'react-native';
import React from 'react';
import {PADDING_HORIZONTAL} from '../../styles/GlobalStyles';
import {FILLTER_EQUALIZER, WALLET} from '../../constants/IconConstant';
import {SvgXml} from 'react-native-svg';
import RowContainer from '../../component/RowContainer';
import ActionButton from '../../component/ActionButton';
import {SECONDARY_COLOR} from '../../styles/Fonts&Colors';
import CardViewDivider from '../../component/CardViewDivider';
import styles from './styles';
import {HP} from '../../styles/Dimesions';

const ProfilePaymentHistory = ({callback, data}) => {
  return (
    <View style={{paddingHorizontal: PADDING_HORIZONTAL}}>
      <RowContainer style={{marginBottom: HP(30)}}>
        <Text style={styles.paymentHistory}>PAYMENT HISTORY</Text>
        <SvgXml
          xml={FILLTER_EQUALIZER}
          width={15}
          height={15}
          onPress={() => {
            console.log('Calleds');
            callback();
          }}
        />
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
                  // alignSelf: 'flex-start',
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

export default ProfilePaymentHistory;
