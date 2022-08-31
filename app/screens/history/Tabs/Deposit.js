import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';

import {paymentRequestSelector} from '../../../store/redux/paymentRequest/index';
import getMyDepositeList from '../../../services/paymentRequest/DepositeRequest';

import RowContainer from '../../../component/RowContainer';
import CardViewDivider from '../../../component/CardViewDivider';
import Container from '../../../component/Container';
import CountFilter from '../../../component/CountFilter';
import {stocks} from '..';
import FilterModal from './FilterModal';

import styles from './styles';
import {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../styles/GlobalStyles';
import {FILLTER_EQUALIZER} from '../../../constants/IconConstant';
import {HP, WINDOW_HEIGHT} from '../../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  ROBOTO_MEDIUM,
  SECONDARY_COLOR,
} from '../../../styles/Fonts&Colors';
import Loader from '../../../component/Loader';

const FilterItem = ({requestData}) => {
  return (
    <View>
      {requestData.map((item, index) => {
        return (
          <RowContainer
            key={item.id}
            style={{
              ...styles.itemContainer,
              backgroundColor: index % 2 === 0 ? '#01C4000F' : undefined,
            }}>
            <View>
              <Text style={styles.itemContainerLeftTitTxt}>
                {item.total_price}
              </Text>
              <Text style={styles.itemContainerLeftSubTitTxt}>
                {item.created_at}
              </Text>
            </View>
            <Text
              style={{
                ...styles.status,
                color:
                  item.status == 'Approved'
                    ? SECONDARY_COLOR
                    : 'rgba(233,78,27,1)',
              }}>
              {item.status}
            </Text>
          </RowContainer>
        );
      })}
    </View>
  );
};

const Deposit = () => {
  const DepositeRequest = useSelector(paymentRequestSelector.DEPOSITE_REQUEST);

  const [getter, setter] = useState({
    isVisible: false,
  });

  const [dateFilter, setdateFilter] = useState({
    from: {
      date: new Date(),
      name: 'from',
    },
    to: {
      date: new Date(),
      name: 'to',
    },
  });

  const [pageFilter, setPageFilter] = useState({
    pageNumber: 0,
    numberOfItemOnPage: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMyDepositeList(
        pageFilter.pageNumber,
        pageFilter.numberOfItemOnPage,
        dateFilter,
      ),
    );
  }, [setdateFilter, setPageFilter]);

  const CloseModal = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <CardViewDivider style={{marginVertical: PADDING_VERTICAL}} />
      <RowContainer style={{paddingHorizontal: PADDING_HORIZONTAL}}>
        <Text style={styles.filter}>Filter</Text>
        <SvgXml xml={FILLTER_EQUALIZER} width={16} onPress={CloseModal} />
      </RowContainer>
      <Container containerStyles={{paddingTop: HP(15)}}>
        {DepositeRequest.data ? (
          DepositeRequest.data.data && (
            <FilterItem requestData={DepositeRequest.data.data} />
          )
        ) : DepositeRequest.isLoading ? (
          <Loader size={'large'} color={SECONDARY_COLOR} />
        ) : (
          <Text
            style={{
              color: 'white',
              marginTop: WINDOW_HEIGHT / 2,
              fontFamily: ROBOTO_MEDIUM,
            }}>
            No Request Is Found
          </Text>
        )}
      </Container>
      <CountFilter
        style={{paddingBottom: 10}}
        numberOfItems={getter.numberOfItemOnPage}
        paymentSetter={setPageFilter}
      />
      <FilterModal
        setter={setdateFilter}
        dateSetter={dateFilter}
        close={CloseModal}
        getter={getter}
      />
    </View>
  );
};

export default Deposit;
