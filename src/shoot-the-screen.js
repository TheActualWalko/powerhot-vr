let currentJpeg;

function screenToJpegBlob (sceneId, use360, quality=0.92) { //args: string, bool, number: 0 < x <= 1
  return new Promise(function (resolve) {
    const screenshot = document.querySelector(`#${sceneId}`).components.screenshot;
    const {camera, size, projection} = screenshot.setCapture(use360 ? 'equirectangular' : 'perspective');
    screenshot.renderCapture(camera, size, projection);
    screenshot.canvas.toBlob(resolve, 'image/jpeg', quality);
  });
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
  currentJpeg = jpeg;
}

function saveJpegBlob (jpeg) {
  if (!jpeg) {
    jpeg = currentJpeg;
  }
  const fileName = `screenshot-${document.title.toLowerCase()}-${Date.now()}.png`;
  const linkEl = document.createElement('a');
  const url = URL.createObjectURL(jpeg);
  linkEl.href = url;
  linkEl.setAttribute('download', fileName);
  linkEl.innerHTML = 'downloading...';
  linkEl.style.display = 'none';
  document.body.appendChild(linkEl);
  setTimeout(function () {
    linkEl.click();
    document.body.removeChild(linkEl);
  }, 1);
}

function getJpegAndRender () {
  return screenToJpegBlob('armsRace', true).then(renderJpegToImage);
}

function getJpegAndSave (message, use360=true) {
  screenToJpegBlob('armsRace', use360).then(saveJpegBlob);
}

