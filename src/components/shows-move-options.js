AFRAME.registerComponent('shows-move-options', {
  init: function () {
    this.el.addEventListener('click', ()=>{
      activateMoveButton();
      const moveIcons = MOVE_LOCATIONS
        .filter(x=>!x.active)
        .map(x=>{
          const coords = [x.coords[0], x.coords[1] + 1.8, x.coords[2]];
          return $(`
            <a-sprite
              class="clickable move-option"
              wiggles
              plays="${x.src}"
              position="${coords.join(' ')}"
              src="sprites/move.png">
            </a-sprite>
          `).insertAfter($("#social-panel"));
        });
    });
  }
});
