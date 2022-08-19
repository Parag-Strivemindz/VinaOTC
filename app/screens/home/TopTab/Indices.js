import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Selector} from '../../../store/redux/dashboard/index';
import CardView from './CardView';

const Indicies = () => {
  const Stock = useSelector(Selector.Stock_Details);
  const {data, isLoading, error} = Stock;
  // console.log(data + ' data');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardView value={data} />
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
