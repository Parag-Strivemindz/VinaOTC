import {View, Text, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';

import {paymentRequestSelector} from '../../../store/redux/paymentRequest/index';
import getMyDepositeList from '../../../services/paymentRequest/DepositeRequest';

import RowContainer from '../../../component/RowContainer';
import CardViewDivider from '../../../component/CardViewDivider';
import Container from '../../../component/Container';
import CountFilter from '../../../component/CountFilter';
import FilterModal from './FilterModal';
import FilterItem from './RenderFilterItemList';

import styles from './styles';
import {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../styles/GlobalStyles';
import {FILLTER_EQUALIZER} from '../../../constants/IconConstant';
import {HP, WINDOW_HEIGHT, WP} from '../../../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  MONTSERRAT_MEDIUM,
  ROBOTO_MEDIUM,
  SECONDARY_COLOR,
} from '../../../styles/Fonts&Colors';
import Loader from '../../../component/Loader';

const Deposit = () => {
  const DepositeRequest = useSelector(paymentRequestSelector.DEPOSITE_REQUEST);

  const [getter, setter] = useState({
    isVisible: false,
  });

  const [pageFilter, setPageFilter] = useState({
    pageNumber: 0,
    numberOfItemOnPage: 10,
  });

  const CloseModal = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  const dispatch = useDispatch();

  const fetchRequestList = useCallback(filterType => {
    CloseModal();
    if (filterType) {
      dispatch(
        getMyDepositeList(
          pageFilter.pageNumber,
          pageFilter.numberOfItemOnPage,
          filterType,
        ),
      );
    } else {
      dispatch(
        getMyDepositeList(pageFilter.pageNumber, pageFilter.numberOfItemOnPage),
      );
    }
  }, []);

  useEffect(() => {
    dispatch(
      getMyDepositeList(pageFilter.pageNumber, pageFilter.numberOfItemOnPage),
    );
  }, [pageFilter, setPageFilter]);

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <CardViewDivider style={{marginVertical: PADDING_VERTICAL}} />
      <RowContainer style={{paddingHorizontal: PADDING_HORIZONTAL}}>
        <Text style={styles.filter}>Filter</Text>
        <Pressable
          android_ripple={{
            borderless: true,
            // radius: 100,
          }}>
          <SvgXml
            xml={FILLTER_EQUALIZER}
            width={20}
            height={20}
            onPress={CloseModal}
          />
        </Pressable>
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
        {DepositeRequest.isLoading && (
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontFamily: MONTSERRAT_MEDIUM,
              fontSize: WP(15),
            }}>
            Loading....
          </Text>
        )}
      </Container>
      <CountFilter
        disableLeftButton={pageFilter.pageNumber == 1 ? true : false}
        disableRightButton={DepositeRequest.noRecordFound}
        style={{paddingBottom: 10}}
        numberOfItems={pageFilter.numberOfItemOnPage}
        paymentSetter={setPageFilter}
      />
      <FilterModal
        close={CloseModal}
        visible={getter.isVisible}
        onSearch={fetchRequestList}
      />
    </View>
  );
};

export default Deposit;
