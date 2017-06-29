templates.camera = ()=>`
  <a-camera id="camera">
    <a-entity
      cursor="fuse: true; fuseTimeout: 750"
      raycaster="objects: .clickable"
      scale="0.1 0.1 0.1"
      position="0 0 -1"
      geometry="primitive: ring;"
      material="color: #43a7f6; opacity: 0;"
      id="cursor">
      <a-animation
        begin="click"
        dur="400"
        easing="ease-out"
        attribute="scale"
        from="0.01 0.01 0.01"
        to="0.1 0.1 0.1">
      </a-animation>
      <a-animation
        begin="cursor-fusing"
        dur="750"
        easing="ease-in"
        attribute="scale"
        from="0.1 0.1 0.1"
        to="0.01 0.01 0.01">
      </a-animation>
      <a-animation
        begin="mouseenter"
        dur="1"
        attribute="material.opacity"
        to="1">
      </a-animation>
      <a-animation
        begin="mouseleave"
        dur="1"
        attribute="material.opacity"
        to="0">
      </a-animation>
      <a-animation
        begin="click"
        dur="1"
        attribute="material.opacity"
        to="0">
      </a-animation>
    </a-entity>
  </a-camera>
`;
