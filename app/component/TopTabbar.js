import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Pressable, Animated} from 'react-native';

import {WINDOW_WIDTH, WP} from '../styles/Dimesions';
import {
  BACKGROUND_COLOR,
  POPPINS_MEDIUM,
  SECONDARY_COLOR,
} from '../styles/Fonts&Colors';
import IndicesFuture from '../screens/home/TopTab/IndicesFuture';
import Shares from '../screens/home/TopTab/Shares';
import Indicies from '../screens/home/TopTab/Indices';

const TopTabbar = () => {
  const tab = [
    {
      id: '1',
      name: 'Indicies',
      value: Indicies(),
    },
    {
      id: '2',
      name: 'Indicies Future',
      value: IndicesFuture(),
    },
    {
      id: '3',
      name: 'Shares',
      value: Shares(),
    },
    {
      id: '4',
      name: 'Indicies',
      value: Indicies(),
    },
    {
      id: '5',
      name: 'Indicies Future',
      value: IndicesFuture(),
    },
    {
      id: '6',
      name: 'Shares',
      value: Shares(),
    },
  ];

  const [getter, setter] = useState({
    currentIndex: 0,
    layout: {
      x: [],
    },
  });

  const AnimatedTab = useRef(new Animated.Value(0));
  const scollXTabBar = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
  const tabScrollRef = useRef();

  let offSet_X = 10;
  // let

  const onLayoutMeasure = useCallback(e => {
    e.persist();
    setter(prev => ({
      ...prev,
      layout: {
        x: prev.layout.x.concat(e.nativeEvent.layout.x),
      },
    }));
  }, []);

  const scrollToTab = useCallback(itemIndex => {
    scrollRef.current.scrollTo({
      x: itemIndex * WINDOW_WIDTH,
      y: 0,
      animated: true,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = AnimatedTab.current.addListener(e => {
      if (e.value > WINDOW_WIDTH * 3) {
        tabScrollRef.current.scrollTo({
          x: WINDOW_WIDTH,
          y: 0,
          animated: true,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const TabItems = tab => {
    return (
      <Animated.ScrollView
        ref={tabScrollRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scollXTabBar,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: offSet_X}}
        horizontal>
        {tab.map((item, index) => (
          <Pressable
            key={item.id}
            onLayout={onLayoutMeasure}
            onPress={() => scrollToTab(index)}
            style={{
              marginRight: WP(20),
              // width: WINDOW_WIDTH * 0.25,
              backgroundColor: BACKGROUND_COLOR,
            }}>
            <Text
              style={{
                fontFamily: POPPINS_MEDIUM,
                color: SECONDARY_COLOR,
                fontSize: 15,
              }}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </Animated.ScrollView>
    );
  };

  const Indicator = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                getter.layout.x.length == tab.length
                  ? AnimatedTab.current.interpolate({
                      inputRange: tab.map(
                        (item, index) => index * WINDOW_WIDTH,
                      ),
                      outputRange: getter.layout.x,
                      extrapolate: 'clamp',
                    })
                  : offSet_X,
            },
          ],
          marginTop: 10,
          alignSelf: 'flex-start',
          width: 20,
          backgroundColor: SECONDARY_COLOR,
          height: 2,
        }}></Animated.View>
    );
  };

  const TabContainer = tab => {
    return (
      <Animated.ScrollView
        ref={scrollRef}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: AnimatedTab.current,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {tab.map((item, index) => (
          <View
            key={item.id}
            style={{
              width: WINDOW_WIDTH,
              backgroundColor: BACKGROUND_COLOR,
            }}>
            {item.value}
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  return (
    <View>
      {TabItems(tab)}
      {Indicator()}
      {TabContainer(tab)}
    </View>
  );
};

export default TopTabbar;

const styles = StyleSheet.create({});
