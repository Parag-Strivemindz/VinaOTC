import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const Calander = ({setDate, setOpen, date, open}) => {
  const SelecteData = date => {
    setOpen(prev => ({
      ...prev,
      open: !prev.open,
    }));
    if (open.from == 'from') {
      setDate(prev => ({
        ...prev,
        from: {
          date: date,
          name: 'from',
        },
      }));
    } else {
      setDate(prev => ({
        ...prev,
        to: {
          date: date,
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
        androidVariant="nativeAndroid"
        modal
        open={open.open}
        date={date}
        onConfirm={SelecteData}
        onCancel={() => {
          setOpen(prev => ({
            ...prev,
            open: !prev.open,
          }));
        }}
      />
    </>
  );
};

export default Calander;

const styles = StyleSheet.create({});
