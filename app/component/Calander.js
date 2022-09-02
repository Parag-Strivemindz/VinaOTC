import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const Calander = ({setDate, setOpen, date, open}) => {
  const SelecteData = date => {
    setOpen();
    if (open.from == 'from') {
      setDate(prev => ({
        ...prev,
        from: {
          start_date: date,
          name: 'from',
        },
      }));
    } else {
      setDate(prev => ({
        ...prev,
        to: {
          to_date: date,
          name: 'to',
        },
      }));
    }
  };

  return (
    <>
      <DatePicker
        locale="en"
        mode="date"
        modal
        open={open.open}
        date={date}
        onConfirm={SelecteData}
        onCancel={() => setOpen()}
      />
    </>
  );
};

export default Calander;

const styles = StyleSheet.create({});
