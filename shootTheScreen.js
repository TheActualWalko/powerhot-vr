function screenToJpegBlob (sceneId, use360, quality=1) { //args: string, bool, number: 0 < x <= 1
  return new Promise(function (resolve) {
    const screenshot = document.querySelector(`#${sceneId}`).components.screenshot;
    const {camera, size, projection} = screenshot.setCapture(use360 ? 'equirectangular' : 'perspective');
    screenshot.renderCapture(camera, size, projection);
    screenshot.canvas.toBlob(resolve, 'image/jpeg', quality)
  });
}

function renderJpegToImage (jpeg) {
  var newImg = document.createElement('img'),
  url = URL.createObjectURL(jpeg);
  console.log({jpeg})

  newImg.onload = function() {
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
}

function getJpegAndRender () {
  return screenToJpeg('armsRace', false).then(renderJpegToImage);
}
