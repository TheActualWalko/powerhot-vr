const PLAYBILL_STYLES = {
  mainWidth : 2.4,

  buttonWidth : 1.5,
  buttonHeight : 0.5,

  numButtons : 4,

  margin: 0.1
};

PLAYBILL_STYLES.mainHeight = (PLAYBILL_STYLES.buttonHeight * PLAYBILL_STYLES.numButtons) + (PLAYBILL_STYLES.margin * (PLAYBILL_STYLES.numButtons-1));
PLAYBILL_STYLES.mainX = -0.5 * (PLAYBILL_STYLES.mainWidth + PLAYBILL_STYLES.margin);
PLAYBILL_STYLES.buttonX = 0.5 * (PLAYBILL_STYLES.buttonWidth + PLAYBILL_STYLES.margin);

const getPlaybillButtonY = (index) => {
  const topButtonY = (PLAYBILL_STYLES.mainHeight / 2) - (PLAYBILL_STYLES.buttonHeight / 2);
  return topButtonY - (index * (PLAYBILL_STYLES.buttonHeight + PLAYBILL_STYLES.margin));
}

let movingOverlay;

const activateMoveButton = ()=>{
  movingOverlay = $(templates.textButton(
    [PLAYBILL_STYLES.buttonX, getPlaybillButtonY(2), 0.1],
    [PLAYBILL_STYLES.buttonWidth, PLAYBILL_STYLES.buttonHeight, 1],
    'PICK A MARKER',
    null,
    true
  )).insertAfter("#move-button");
}

const deactivateMoveButton = ()=>{
  if (movingOverlay) {
    movingOverlay.remove();
  }
}

templates.playbill = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    wiggles="rate: 30; scale: 0.03"
    look-at="#focal-point"
    group-opacity="0"
    when-looked-at="
      focusX: 2; 
      focusY: 0.4; 
      usesDomNode: #itinerary;
    ">

    <!-- playbill -->

    <a-plane 
      class="uses-html"
      position="${PLAYBILL_STYLES.mainX} 0 0"
      scale="${PLAYBILL_STYLES.mainWidth} ${PLAYBILL_STYLES.mainHeight} 1"
      position="0 0 0"
      material="
        shader: html; 
        target: #all-html; 
        width: 480;
        height: 460;
      ">
    </a-plane>
    <a-plane
      color="${values.panelEchoBackground}"
      position="${PLAYBILL_STYLES.mainX} 0 -0.1"
      scale="${PLAYBILL_STYLES.mainWidth+0.1} ${PLAYBILL_STYLES.mainHeight+0.1} 1.1"
      material="shader: flat">
    </a-plane>
    <a-text
      position="${PLAYBILL_STYLES.mainX} ${getPlaybillButtonY(0)} 0.01"
      value="ITINERARY"
      color="${values.panelForeground}"
      font-size="8"
      font="${values.font}"
      align="center"
      wrap-pixels="1100">
    </a-text>

    ${templates.textButton( 
      [PLAYBILL_STYLES.buttonX, getPlaybillButtonY(0), 0],
      [PLAYBILL_STYLES.buttonWidth, PLAYBILL_STYLES.buttonHeight, 1],
      'ITINERARY',
      null,
      true)}
    ${templates.textButton(
      [PLAYBILL_STYLES.buttonX, getPlaybillButtonY(1), 0],
      [PLAYBILL_STYLES.buttonWidth, PLAYBILL_STYLES.buttonHeight, 1],
      'MERCH',
      null,
      false)}
    ${templates.textButton(
      [PLAYBILL_STYLES.buttonX, getPlaybillButtonY(2), 0],
      [PLAYBILL_STYLES.buttonWidth, PLAYBILL_STYLES.buttonHeight, 1],
      'MOVE',
      'shows-move-options id="move-button"',
      false)}
    ${templates.textButton(
      [PLAYBILL_STYLES.buttonX, getPlaybillButtonY(3), 0],
      [PLAYBILL_STYLES.buttonWidth, PLAYBILL_STYLES.buttonHeight, 1],
      'BEGIN',
      'plays="media/prodigy-2.mp4"',
      false)}
  </a-entity>
`;
