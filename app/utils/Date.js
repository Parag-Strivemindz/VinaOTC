import {useSelector} from 'react-redux';
import {i18n} from '../i18n/lang';
import {Selector} from '../store/redux/localization';

export const DDMMYY = (input, seperator = '-') => {
  const language = useSelector(Selector.Localization);

  console.log(input + ' date');
  const monthObj = [
    {
      id: '01',
      value: i18n[language.code].jan,
    },
    {
      id: '02',
      value: i18n[language.code].feb,
    },
    {
      id: '03',
      value: i18n[language.code].mar,
    },
    {
      id: '04',
      value: i18n[language.code].april,
    },
    {
      id: '05',
      value: i18n[language.code].may,
    },
    {
      id: '06',
      value: i18n[language.code].june,
    },
    {
      id: '07',
      value: i18n[language.code].july,
    },
    {
      id: '08',
      value: i18n[language.code].aug,
    },
    {
      id: '09',
      value: i18n[language.code].sept,
    },
    {
      id: '10',
      value: i18n[language.code].oct,
    },
    {
      id: '11',
      value: i18n[language.code].nov,
    },
    {
      id: '12',
      value: i18n[language.code].dec,
    },
  ];
  const currentDate = new Date();
  const dateMonthYear = input.slice(0, 11);
  //   console.log(dateMonthYear);
  const month = dateMonthYear.slice(5, 7);
  const date = currentDate.getDate(dateMonthYear);
  const year = currentDate.getFullYear(dateMonthYear);
  const value = monthObj.filter(item => month == item.id);
  //   console.log(month);
  return `${date}${seperator}${value[0].value}${seperator}${year}`;
};
