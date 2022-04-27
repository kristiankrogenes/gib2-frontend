export const labels = {
  diesel: {
    title: 'Histogram of diesel prices',
    subheader:
      'x-axis counts the number of occurences of different diesel prices per liter in NOK ',
    donutTitle: 'Histogram of octane prices represented in a donut diagram',
  },
  octane_95: {
    title: 'Histogram of octane prices',
    subheader:
      'x-axis counts the number of occurences of different octane prices per liter in NOK ',
    donutTitle: 'Histogram of diesel prices represented in a donut diagram',
  },
  electric: {
    title: 'Histogram of electric prices',
    subheader:
      'x-axis counts the number of occurences of different electric prices in kWh in NOK',
    donutTitle: 'Histogram of electric prices represented in a donut diagram',
  },
};

export const options = {
  xaxis: {
    categories: [
      '0 - 16',
      '16 - 17',
      '17 - 18',
      '18 - 19',
      '19 - 20',
      '20 - 21',
      '21 - 22',
      '22 - 23',
      '23+',
    ],
  },
};

export const optionsDonut = {
  labels: [
    '0 - 16',
    '16 - 17',
    '17 - 18',
    '18 - 19',
    '19 - 20',
    '20 - 21',
    '21 - 22',
    '22 - 23',
    '23+',
  ],
};

export const optionsLocation = {
  labels: [
    'Vestland',
    'Agder',
    'Oslo',
    'Trøndelag',
    'Troms og Finnmark',
    'Viken',
    'Innlandet',
    'Rogaland',
    'Vestfold og Telemark',
    'Møre og Romsdal',
    'Nordland',
    'Unknown',
  ],
};
