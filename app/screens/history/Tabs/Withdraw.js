import {View, Text, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';

import {paymentRequestSelector} from '../../../store/redux/paymentRequest/index';
import getMyWithDrawRequest from '../../../services/paymentRequest/WithDrawalRequest';
import {Selector as languageSelector} from '../../../store/redux/localization';

import styles from './styles';
import FilterModal from './FilterModal';
import FilterItem from './RenderFilterItemList';
import Loader from '../../../component/Loader';
import CountFilter from '../../../component/CountFilter';
import RowContainer from '../../../component/RowContainer';
import CardViewDivider from '../../../component/CardViewDivider';
import Container from '../../../component/Container';
import {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../styles/GlobalStyles';
import {FILLTER_EQUALIZER} from '../../../constants/IconConstant';
import {
  BACKGROUND_COLOR,
  MONTSERRAT_MEDIUM,
  SECONDARY_COLOR,
  ROBOTO_MEDIUM,
} from '../../../styles/Fonts&Colors';
import {HP, WP, WINDOW_HEIGHT} from '../../../styles/Dimesions';

const WithDrawal = () => {
  const withdraw_request = useSelector(paymentRequestSelector.WITHDRAW_REQUEST);
  const language = useSelector(languageSelector.Localization);

  const [getter, setter] = useState({
    isVisible: false,
  });

  const [pageFilter, setPageFilter] = useState({
    pageNumber: 1,
    numberOfItemOnPage: 10,
  });

  const dispatch = useDispatch();

  const CloseModal = useCallback(() => {
    setter(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  const fetchRequestList = useCallback(filterType => {
    CloseModal();
    if (filterType) {
      dispatch(
        getMyWithDrawRequest(
          pageFilter.pageNumber,
          pageFilter.numberOfItemOnPage,
          filterType,
        ),
      );
    } else {
      dispatch(
        getMyWithDrawRequest(
          pageFilter.pageNumber,
          pageFilter.numberOfItemOnPage,
        ),
      );
    }
  }, []);

  useEffect(() => {
    dispatch(
      getMyWithDrawRequest(
        pageFilter.pageNumber,
        pageFilter.numberOfItemOnPage,
      ),
    );
  }, [setPageFilter, pageFilter]);

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
        {withdraw_request.data ? (
          withdraw_request.data.data && (
            <FilterItem requestData={withdraw_request.data.data} />
          )
        ) : withdraw_request.isLoading ? (
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
        {withdraw_request.isLoading && (
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
        disableLeftButton={pageFilter.pageNumber <= 1 ? true : false}
        disableRightButton={withdraw_request.noRecordFound}
        style={{paddingBottom: 10}}
        numberOfItems={pageFilter.numberOfItemOnPage}
        paymentSetter={setPageFilter}
      />
      <FilterModal
        onSearch={fetchRequestList}
        close={CloseModal}
        visible={getter.isVisible}
      />
    </View>
  );
};

export default WithDrawal;
