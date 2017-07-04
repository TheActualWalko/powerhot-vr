const artists = {
  BrunoMars: {
    image: 'assets/BrunoMars.jpg',
    name: 'BRUNO MARS',
    song: 'Just The Way You Are',
    isNowPerforming: true,
    begin: '8:00pm',
    end: '9:00pm',
  },
  Samiami: {
    image: 'assets/Sam.png',
    name: 'SAM WATKINSON',
    song: 'Help I\'m Locked In A Computer',
    isNowPerforming: true,
    begin: '2017',
    end: 'THE END OF TIME',
  },
  TheProdigy: {
    image: 'assets/TheProdigy2.png',
    name: 'THE PRODIGY',
    song: 'Firestarter',
    isNowPerforming: true,
    begin: '8:00pm',
    end: '9:00pm',
  }
};


function setArtistData (artistObject) {
  window.artistData = artistObject;
}

function setArtistDataFromQS () {
  const params = window.location.search.slice(1).split('&').reduce((paramObj, queryComponent) => {
    [key, value] = queryComponent.split('=');
    paramObj[key] = value;
    return paramObj;
  }, {});

  const artistName = params['key'];
  setArtistData(artists[artistName] || artists.TheProdigy);
}


window.samArtistData = artists.Samiami;
window.prodigyArtistData = artists.TheProdigy;


setArtistDataFromQS();
