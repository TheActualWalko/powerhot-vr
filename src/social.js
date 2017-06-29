class Social {
  getFeed(keywords) {
    return fetch(`/social?keys=${keywords}`)
      .then(response => {
        return response.json()
      })
  }
}

const social = new Social();

social
  .getFeed('primaverasound')
  .then((data)=>{
    data.slice(0, 6).forEach(({profileImage, name, date, text})=>{
      $('#posts').append(`
        <li class="post">
          <div class="profile" style="background-image:url('${profileImage}');"></div>
          <div class="icon" style="background-image:url('icons/twitter.png');"></div>
          <main>
            <h3>${name}</h3>
            <p>${text}</p>
          </main>
        </li>
      `);
    });
  });
