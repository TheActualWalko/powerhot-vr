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
              wiggles="rate: 10; scale: 0.1"
              plays="${x.src}"
              position="${coords.join(' ')}"
              resize="1.2 1.2 1.2"
              src="sprites/move.png">
            </a-sprite>
          `).insertAfter($("#social-panel"));
        });
    });
  }
});
