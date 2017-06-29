const containerWidth = '480px'
const imageHeight = '320px' // 2/3 of container width
const paddingAdjustment= '-0.4px'

const imageContainer = `
width:${containerWidth};
height:${imageHeight};
position:absolute;
left:${paddingAdjustment};
top:${paddingAdjustment};
`
const imageMask = `
width:${containerWidth};
height:${imageHeight};
position:absolute;
left:${paddingAdjustment};
top:${paddingAdjustment};
`
const imageStyle = `
width:${containerWidth};
height:${imageHeight};
position:absolute;
left:${paddingAdjustment};
top:${paddingAdjustment};
`
const textContainerStyle = `
position:absolute;
left:${paddingAdjustment};
top:${imageHeight};
padding-top:5px;
padding-bottom:5px;
`
const artistNameStyle = `
text-align:center;
width:${containerWidth};
font-weight:500;
height:28px;
font-size:28px;
`
const h2Style = `
text-align:center;
width:${containerWidth};
font-weight:400;
height:20px;
font-size:28px;
`
const h3Style = `
text-align:center;
width:${containerWidth};
color:#777;
font-weight:300;
height:16px;
font-size:24px;
`
const ruleStyle = `
display:inline-block;
text-align:center;
width:350px;
color:#777;
height: 1px;
margin-bottom:0;
`
const ruleContainerStyle = `
text-align:center;
width:${containerWidth};
height: 1px;
margin-bottom:0;
`

function setArtistProfile({
    image,
    name,
    song,
    begin,
    end,
    isNowPerforming,
  }) {
  const artistBox = $('#artist')
  artistBox.html(`
    <div style=${imageContainer}>
      <img src="${image}" style="${imageStyle}" />
    </div>

    <div style="${textContainerStyle}" >
      <h1 style=${artistNameStyle}>${name}</h1>
      <div style=${ruleContainerStyle}><hr style="${ruleStyle}" /><div>
      <h2 style="${h2Style}">Currently Perfoming:</h2>
      <h3 style="${h3Style}">${song}</h3>
      <div style=${ruleContainerStyle}><hr style="${ruleStyle + 'width:100px;'}" /><div>
      <h2 style="${h2Style}">Performing: <span style="color:red;">${isNowPerforming ? 'NOW' : 'SOON'}</span></h2>
      <h3 style="${h3Style}">${begin} - ${end}</h3>
    </div>
  `);
}

setTimeout(() => {
  setArtistProfile(window.artists.BrunoMars);
}, 0)
