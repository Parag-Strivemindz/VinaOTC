import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CardView from './CardView';

const Indicies = () => {
  // console.log(data + ' data');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardView />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Indicies;
