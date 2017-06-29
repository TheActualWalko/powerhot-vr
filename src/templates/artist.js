const buttonTop = -1.35
const buttonLeft = -0.94
const buttonWidth = 0.5
const buttonDistance = 0.13
const buttonDelta = buttonDistance + buttonWidth

const lowerButtonWidth = buttonWidth * 2 + buttonDistance
const lowerButtonLeft = buttonLeft + lowerButtonWidth * 9/32 //I have no idea why this isn't 1/4
const lowerButtonTop = buttonTop - buttonDelta;
const lowerButtonDelta = buttonDistance + lowerButtonWidth;

templates.artist = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    wiggles="rate: 30; scale: 0.03"
    look-at="#focal-point"
    group-opacity="0"
    when-looked-at="
      focusX: 0.3;
      focusY: 0.8;
      usesDomNode: #artist;
    ">
    <a-plane
      class="uses-html"
      position="0 0.75 0"
      scale="2.4 3.5 1"
      position="0 0 0"
      material="
        shader: html;
        target: #all-html;
        width: 480;
        height: 700;
      ">
    </a-plane>
    <a-plane
      color="${values.panelEchoBackground}"
      position="0 0.75 -0.1"
      scale="2.5 3.6 1.1"
      material="shader: flat">
    </a-plane>
    <!- top four buttons ->
    ${templates.imageButton(
      [buttonLeft, buttonTop, 0],
      [buttonWidth, buttonWidth, buttonWidth],
      '#save-station',
      () => {})}
    ${templates.imageButton(
      [buttonLeft + buttonDelta, buttonTop, 0],
      [buttonWidth, buttonWidth, buttonWidth],
      '#save',
      () => {})}
    ${templates.imageButton(
      [buttonLeft + 2 * buttonDelta, buttonTop, 0],
      [buttonWidth, buttonWidth, buttonWidth],
      '#thumbs-up',
      null)}
    ${templates.imageButton(
      [buttonLeft + 3 * buttonDelta, buttonTop, 0],
      [buttonWidth, buttonWidth, buttonWidth],
      '#thumbs-down',
      null)}
    <!- bottom two buttons ->
    ${templates.textButton(
      [lowerButtonLeft, lowerButtonTop, 0],
      [lowerButtonWidth , buttonWidth, buttonWidth],
      'SET INFO',
      null)}
    ${templates.textButton(
      [lowerButtonLeft + lowerButtonDelta, lowerButtonTop, 0],
      [lowerButtonWidth , buttonWidth, buttonWidth],
      'ARTIST BIO',
      null,
      true)}
  </a-entity>
`;

