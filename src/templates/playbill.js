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

templates.playbill = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    look-at="#camera"
    group-opacity="0"
    when-looked-at="
      property: group-opacity;
      in: 1;
      out: 0;
      focusX: 2; 
      focusY: 0.4; 
    ">

    <!-- playbill -->
    ${templates.panel(
      [PLAYBILL_STYLES.mainX, 0, 0],
      [
        PLAYBILL_STYLES.mainWidth, 
        PLAYBILL_STYLES.mainHeight, 
        1
      ],
      []
    )}
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
      'shows-move-options',
      false)}
    ${templates.textButton(
      [PLAYBILL_STYLES.buttonX, getPlaybillButtonY(3), 0],
      [PLAYBILL_STYLES.buttonWidth, PLAYBILL_STYLES.buttonHeight, 1],
      'SETTINGS',
      null,
      false)}
  </a-entity>
`;
