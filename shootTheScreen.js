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
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
}

function sendBlobToFacebook () {

}

function getJpegAndRender () {
  return screenToJpegBlob('armsRace', false).then(renderJpegToImage);
}

function getJpegAndSend (message, is360=true) {
  return screenToJpegBlob('armsRace', is360)
    .then((blob) => {
      // const dataUrl = window.URL.createObjectURL(blob);
      return ensureLogin(['publish_actions'])
      .then(response => console.log('post login Credentials', response) || response)
      .then(shareImage(message, blob, is360))
      .then((response) => {console.log({response})})
      .catch((err) => {console.log({err})})
    })
}

