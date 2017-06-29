class Social {
  getFeed(keywords) {
    return Promise.resolve([
      {
        "date": "Thu Jun 29 16:03:38 +0000 2017",
        "text": "RT @Primavera_Sound: Save the date! Tickets for Primavera Sound 2018 will go on sale on 4th July! \nStay tuned for more details! https://t.c…",
        "name": "TovarEva",
        "profileImage": "assets/twitter1.jpg"
      },
      {
        "date": "Thu Jun 29 14:53:53 +0000 2017",
        "text": "The guy dressed as a rabbit's extraordinary story to tell about stroke survival and rehabilitation https://t.co/VsYZf4PiPE #PrimaveraSound",
        "name": "uwelibglen",
        "profileImage": "assets/twitter2.jpg"
      },
      {
        "date": "Thu Jun 29 12:32:16 +0000 2017",
        "text": "RT @Primavera_Sound: Perfume Genius pasarán en noviembre por Barcelona y Madrid:\nEntradas a la venta a partir de mañana.\n+INFO: https://t.c…",
        "name": "pulguitil",
        "profileImage": "assets/twitter3.jpg"
      }
    ]);
    // return fetch(`/social?keys=${keywords}`)
    //   .then(response => {
    //     return response.json()
    //   })
  }
}

const social = new Social();

// $(()=>{
//   social
//     .getFeed('primaverasound')
//     .then((data)=>{
//       data.slice(0, 3).forEach(({profileImage, name, date, text})=>{
//         $('#posts').append(`
//           <li class="post">
//             <div class="profile" style="background-image:url('${profileImage}');"></div>
//             <div class="icon" style="background-image:url('icons/twitter.png');"></div>
//             <main>
//               <h3>${name}</h3><time>${date.split(' ').find(x=>x.includes(':')).split(':').slice(0,1).join(':')}</time>
//               <p>${text}</p>
//             </main>
//           </li>
//         `);
//       });
//     });
// });
