class Social {
  getFeed(keywords) {
    fetch(`http://localhost:8080/social?keys=${keywords}`)
      .then(response => {
        response.json().then(data => {
          console.log('GOT FEED', data);
        });
      });
  }
}

const social = new Social();
social.getFeed('primaverasound');