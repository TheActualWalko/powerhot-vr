const containerWidth = '476px'
const imageHeight = '300px'
const paddingAdjustment= '-0.4px'

const imageContainer = `width:${containerWidth};height:${imageHeight};position:absolute;left:${paddingAdjustment};top:${paddingAdjustment};`
const imageMask = `width:${containerWidth};height:${imageHeight};position:absolute;left:${paddingAdjustment};top:${paddingAdjustment};`
const imageStyle = `width:${containerWidth};height:${imageHeight};position:absolute;left:${paddingAdjustment};top:${paddingAdjustment};`
const textContainerStyle = `position:absolute;left:${paddingAdjustment};top:${imageHeight};padding-top:5px;padding-bottom:5px;background-color:#111;`
const artistNameStyle = `text-align:center;width:${containerWidth};font-weight:500;height:28px;font-size:28px;`
const h2Style = `text-align:center;width:${containerWidth};font-weight:400;height:20px;font-size:28px;`
const h3Style = `text-align:center;width:${containerWidth};color:#777;font-weight:300;height:16px;font-size:24px;`
const ruleStyle = `display:inline-block;text-align:center;width:350px;color:#777;height: 1px;margin-bottom:0;`
const ruleContainerStyle = `text-align:center;width:${containerWidth};height: 1px;margin-bottom:0;`

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
      <svg style=${imageMask} width="396" height="132">
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="black" stop-opacity="0"/>
            <stop offset="50%" stop-color="black" stop-opacity="0"/>
            <stop offset="100%" stop-color="black" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="396" height="132" fill="url(#gradient)"/>
      </svg>
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
