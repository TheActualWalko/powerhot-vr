const artists = {
  BrunoMars: {
    image: '../assets/bruno_mars.jpg',
    name: 'BRUNO MARS',
    song: 'Just The Way You Are',
    isNowPerforming: true,
    begin: '8:00pm',
    end: '9:00pm',
  },
  Samiami: {
    image: '../assets/19549522_10155631220882259_280100159_o.jpg',
    name: 'SAM WATKINSON',
    song: 'Help I\'m Locked In A Computer',
    isNowPerforming: true,
    begin: '2017',
    end: 'THE END OF TIME',
  }
};


function setArtistData (artistObject) {
  console.log({artistObject})
  window.artistData = artistObject;
}

function setArtistDataFromQS () {
  artistKey = window.location.search.split('=')[1];
  console.log({artistKey})
  setArtistData(artists[artistKey]);
}

setArtistDataFromQS();
