class Social {
  getFeed(keywords) {
    return fetch(`http://localhost:8080/social?keys=${keywords}`)
      .then(response => response.json())
  }
}

const social = new Social();
