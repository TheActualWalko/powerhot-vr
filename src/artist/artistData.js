const artists = {
  brunomars: {
    image: 'assets/BrunoMars.jpg',
    name: 'BRUNO MARS',
    song: 'Just The Way You Are',
    isNowPerforming: true,
    begin: '8:00pm',
    end: '9:00pm',
  },
  samiami: {
    image: 'assets/Sam.png',
    name: 'SAM WATKINSON',
    song: 'Rosemary by Frank Bridge',
    isNowPerforming: true,
    begin: '1:00pm',
    end: '1:05pm',
  },
  theprodigy: {
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
  if (values.location === 'barcelona') {
    setArtistData(artists.theprodigy);
  } else {
    setArtistData(artists.samiami);
  }
}


window.samArtistData = artists.samiami;
window.prodigyArtistData = artists.theprodigy;


setArtistDataFromQS();
