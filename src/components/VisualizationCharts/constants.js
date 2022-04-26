export const labels = {
  diesel: {
    title: 'Histogram over dieselpriser',
    subheader:
      'x-aksen teller antall forekomster av forskjellige dieselpriser i kr per liter',
  },
  octane_95: {
    title: 'Histogram over bensinpriser',
    subheader:
      'x-aksen teller antall forekomster av forskjellige bensinpriser i kr per liter',
  },
  electric: {
    title: 'Histogram over elektriske priser',
    subheader:
      'x-aksen teller antall forekomster av forskjellige elektriske priser i kWh',
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
    'Ukjent',
  ],
};
