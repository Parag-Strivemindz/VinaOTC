import React from 'react';
import {useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {Neomorph, NeomorphFlex, Shadow} from 'react-native-neomorph-shadows';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import CommonHeader from '../../component/CommonHeader';
import Container from '../../component/Container';
import Loader from '../../component/Loader';
import RowContainer from '../../component/RowContainer';
import {READ_INDICATOR} from '../../constants/IconConstant';
import {EMAIL_SVG} from '../../constants/ImageConstant';

import getNotification from '../../services/user/Notification';
import readNotification from '../../services/user/ReadNotification';

import {Selector} from '../../store/redux/user';
import {HP, WINDOW_HEIGHT, WINDOW_WIDTH, WP} from '../../styles/Dimesions';

import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  ROBOTO_BOLD,
  ROBOTO_MEDIUM,
  ROBOTO_REGULAR,
  SECONDARY_COLOR,
  WHITE,
  WHITE_80,
} from '../../styles/Fonts&Colors';
import GlobalStyles, {
  CONTAINER_PADDINGTOP,
  PADDING_HORIZONTAL,
} from '../../styles/GlobalStyles';

function Neumor({style, children, inner, darkShadow, lightShadow}) {
  return (
    <Neomorph
      inner={inner}
      darkShadowColor={darkShadow} // <- set this
      lightShadowColor={lightShadow} // <- this
      style={{
        shadowOpacity: 0.3, // <- and this or yours opacity
        shadowRadius: 3,
        borderRadius: 30,
        backgroundColor: '#1D1E1E',
        width: 60,
        height: 60,
        ...style,
      }}>
      {children}
    </Neomorph>
  );
}

const data = [
  {
    id: '1',
    sender: 'Jhoan Harper',
    time: 'Monday 10-mar-2022',
    message: `Sharing insights into different aspects of Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, w`,
  },
  {
    id: '2',
    sender: 'Jhoan Harper',
    time: 'Monday 10-mar-2022',
    message: `Sharing insights into different aspects of..`,
  },
];

function Notification() {
  const notification = useSelector(Selector.GET_NOTIFICATION);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotification());
  }, []);

  return (
    <View style={{flex: 1}}>
      <CommonHeader title="Notification" />
      <Container
        scrollViewContainerStyle={{
          paddingTop: CONTAINER_PADDINGTOP,
          paddingHorizontal: PADDING_HORIZONTAL,
        }}>
        {notification.data ? (
          notification.data.data && (
            <>
              {notification.data.data.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      dispatch(readNotification(item.notification_id, index));
                    }}
                    key={item.notification_id}
                    style={[
                      GlobalStyles.dropShadow,
                      {
                        // shadowOffset: {width: 10, height: 10},
                        marginTop: HP(20),
                        padding: 15,
                        // shadowOpacity: 0.2,
                        // shadowRadius: 10,
                        borderRadius: 10,
                        borderWidth: 0,
                        width: WINDOW_WIDTH * 0.9,
                        borderTopLeftRadius: 30,
                      },
                    ]}>
                    <RowContainer
                      onPress={() => {
                        dispatch(readNotification(item.notification_id, index));
                      }}
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Neumor
                          inner={true}
                          darkShadow={'#000000'}
                          lightShadow={WHITE}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <SvgXml
                            xml={EMAIL_SVG}
                            stroke={WHITE_80}
                            width={20}
                            height={20}
                          />
                        </Neumor>
                        <View style={{marginLeft: WP(15)}}>
                          <Text
                            style={{
                              color: SECONDARY_COLOR,
                              fontFamily: ROBOTO_MEDIUM,
                              fontSize: WP(17),
                            }}>
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: ROBOTO_REGULAR,
                              color: WHITE,
                              fontSize: WP(10),
                              marginTop: HP(2),
                            }}>
                            {item.created_at}
                          </Text>
                        </View>
                      </View>

                      {!Boolean(item.is_read) && (
                        <SvgXml
                          xml={READ_INDICATOR}
                          style={{
                            tintColor: SECONDARY_COLOR,
                            width: 15,
                            height: 15,
                          }}
                        />
                      )}
                    </RowContainer>
                    <Text
                      style={{
                        lineHeight: 20,
                        marginTop: HP(20),
                        fontFamily: MONTSERRAT_REGULAR,
                        color: WHITE,
                        fontSize: WP(13),
                      }}>
                      {item.message}
                    </Text>
                  </Pressable>
                );
              })}
            </>
          )
        ) : notification.isLoading ? (
          <Loader
            size={'large'}
            color={SECONDARY_COLOR}
            style={{marginTop: WINDOW_HEIGHT / 2}}
          />
        ) : (
          <Text
            style={{
              color: WHITE,
              fontFamily: MONTSERRAT_MEDIUM,
              alignSelf: 'center',
              marginTop: WINDOW_HEIGHT / 2,
              fontSize: WP(12),
            }}>
            You don't have any notification
          </Text>
        )}
      </Container>
    </View>
  );
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  roundedButtonContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#252525',
    shadowColor: '#181818',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 5,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    border: 1,
    marginBottom: 20,
    elevation: 5,
  },
  roundedButton: {
    height: 80,

    width: 80,
    shadowColor: '#2b2b2b',
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 5,
    shadowOffset: {
      height: -3,
      width: -3,
    },
    border: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: WP(16),
    fontFamily: ROBOTO_BOLD,
  },
});
