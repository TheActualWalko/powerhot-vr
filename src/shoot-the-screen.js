function screenToJpegBlob (sceneId, use360, quality=0.92) { //args: string, bool, number: 0 < x <= 1
  return new Promise(function (resolve) {
    const screenshot = document.querySelector(`#${sceneId}`).components.screenshot;
    const {camera, size, projection} = screenshot.setCapture(use360 ? 'equirectangular' : 'perspective');
    screenshot.renderCapture(camera, size, projection);
    screenshot.canvas.toBlob(resolve, 'image/jpeg', quality);
  });
}

function screenToJpegDataUrl (sceneId, use360, quality=0.92) {
  const screenshot = document.querySelector(`#${sceneId}`).components.screenshot;
  const {camera, size, projection} = screenshot.setCapture(use360 ? 'equirectangular' : 'perspective');
  screenshot.renderCapture(camera, size, projection);
  return screenshot.canvas.toDataURL()('image/jpeg', quality);
}

function renderJpegToImage (jpeg) {

  const newImg = document.createElement('img'),
  url = URL.createObjectURL(jpeg);

  newImg.onload = function() {
    // no longer need to read the blob so it's revoked
    setTimeout(()=>URL.revokeObjectURL(url));
  };

  newImg.src = url;
  newImg.id = 'photo';
  document.querySelector('a-assets').appendChild(newImg); 
  document.getElementById('photo-preview').setAttribute('src', '#photo');
}

function sendBlobToFacebook () {

}

function getJpegAndRender () {
  return screenToJpegBlob('armsRace', true).then(renderJpegToImage);
}

function getJpegAndSend (message) {
  return screenToJpegBlob('armsRace', true)
    .then((blob) => {
      return ensureLogin()
      .then(shareImage(message, blob))
      .then((response) => {console.log({response})})
      .catch((err) => {console.log({err})})
    })
}

