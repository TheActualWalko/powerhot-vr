templates.upsell = (position=[0, 3, -3], scale=[3,3,1]) => {
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
      position="0 0 0"
      wiggles="rate: 30; scale: 0.03"
      group-opacity="1"
      id="upsell">
      ${templates.modal(
        position,
        scale,
        {
          promptImage: '#upsell-img',
          confirmText: 'Sign Up',
          cancelText: 'Cancel',
        },
        {
          onConfirm: null,
          onCancel: 'closes-upsell',
        },
        true
      )}
      </a-entity>
  `
}
