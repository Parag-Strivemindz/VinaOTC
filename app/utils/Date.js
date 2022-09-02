export const DDMMYY = (input, seperator = '-') => {
  console.log(input + ' date');
  const monthObj = [
    {
      id: '01',
      value: 'Jan',
    },
    {
      id: '02',
      value: 'Feb',
    },
    {
      id: '03',
      value: 'Mar',
    },
    {
      id: '04',
      value: 'April',
    },
    {
      id: '05',
      value: 'May',
    },
    {
      id: '06',
      value: 'June',
    },
    {
      id: '07',
      value: 'july',
    },
    {
      id: '08',
      value: 'Aug',
    },
    {
      id: '09',
      value: 'Sept',
    },
    {
      id: '10',
      value: 'Oct',
    },
    {
      id: '11',
      value: 'Nov',
    },
    {
      id: '12',
      value: 'Dec',
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
