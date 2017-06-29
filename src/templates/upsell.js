templates.upsell = (position=[0, 2, -3], scale=[3,0.75,0.2]) => {
  const [x, y, z] = position
  const onCancel = () => {
    upsellIsOpen = false;
    //etc
  }
  const onConfirm = () => {
    upsellIsOpen = false;
    isPremium = true;
    //etc
  }
  return `
    <a-entity
      position="${position.join(' ')}"
      wiggles="rate: 30; scale: 0.03"
      look-at="#focal-point"
      group-opacity="1"
      id="upsell">
      ${templates.modal(
        [0,0,0],
        scale,
        {
          promptText: 'This feature is for All Access users only',
          confirmText: 'Sign Up',
          cancelText: 'Cancel',
        },
        {
          onConfirm: null,
          onCancel: 'closes-upsell',
        }
      )}
      </a-entity>
  `
}
