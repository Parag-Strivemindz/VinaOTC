import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import CommonHeader from '../../component/CommonHeader';

import {
  BACKGROUND_COLOR,
  POPPINS_MEDIUM,
  SECONDARY_COLOR,
  WHITE,
} from '../../styles/Fonts&Colors';
import {HP, WP} from '../../styles/Dimesions';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const ADMIN_ID = 'ebe55bad-b8b1-4671-8414-1100d787707a';
  const CLIENT_ID = '13445abc';
  const chatID =
    ADMIN_ID > CLIENT_ID
      ? ADMIN_ID.concat(CLIENT_ID)
      : CLIENT_ID.concat(ADMIN_ID);

  const CollectionId = 'Chat';
  const chatsRef = firestore()
    .collection(CollectionId)
    .doc(chatID)
    .collection('messages');

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  function handleSend(messages) {
    const {text, _id, createdAt, user} = messages[0];
    const writes = chatsRef.add({
      text,
      _id,
      createdAt,
      user,
    });
    Promise.all(writes);
  }

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          console.log(messages);
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      // .filter(item => item.email === email)
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={{
          backgroundColor: BACKGROUND_COLOR,
          borderRadius: 5,
          height: 40,
          alignItems: 'center',
        }}
        containerStyle={{
          elevation: 5,
          borderTopWidth: 0,
          height: 60,
          backgroundColor: 'black',
          padding: 10,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Text>hello</Text>
      </InputToolbar>
    );
  };

  const customeOnSend = ({text, onSend, containerStyle}) => {
    return (
      <Send
        text={text}
        alwaysShowSend
        onSend={onSend}
        containerStyle={{
          backgroundColor: 'black',
          width: WP(100),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: HP(40),
            width: WP(75),
            borderRadius: 5,
            backgroundColor: SECONDARY_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: WHITE,
              fontFamily: POPPINS_MEDIUM,
            }}>
            Send
          </Text>
        </View>
      </Send>
    );
  };

  function renderBubble(props) {
    const {currentMessage, wrapperStyle, user} = props;
    console.log(user);
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderRadius: 3,
            borderBottomColor: 'rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
          left: {
            borderRadius: 3,
            backgroundColor: 'rgba(1, 196, 0, 0.1)',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <CommonHeader title="Chat" />
      <GiftedChat
        showAvatarForEveryMessage
        wrapInSafeArea
        messagesContainerStyle={{
          backgroundColor: BACKGROUND_COLOR,
          paddingBottom: 20,
        }}
        keyboardShouldPersistTaps={'handled'}
        renderInputToolbar={customtInputToolbar}
        renderSend={customeOnSend}
        messages={messages}
        onSend={handleSend}
        renderBubble={renderBubble}
        showUserAvatar
        user={{
          _id: CLIENT_ID,
          name: 'Parag Sharma',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  borderSolid: {
    borderBottomWidth: 30,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
