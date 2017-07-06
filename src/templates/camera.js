templates.camera = ()=>`
  <a-camera id="camera" fov="90">
    <a-entity id="focal-point" position="0 -0.3 2"></a-entity>
    <a-entity 
      id="dot"
      position="0 0 -2"
      scale="0.01 0.01 0.01"
      geometry="primitive: box;"
      material="color: #133746;"
    >
    </a-entity>
    <a-entity
      cursor="fuse: true; fuseTimeout: 750"
      raycaster="objects: .clickable"
      scale="0.2 0.2 0.2"
      position="0 0 0"
      geometry="primitive: ring;"
      material="color: #43a7f6;"
      id="cursor">
      <a-animation
        begin="click"
        dur="400"
        easing="ease-out"
        attribute="scale"
        from="0.01 0.01 0.01"
        to="0.2 0.2 0.2">
      </a-animation>
      <a-animation
        begin="cursor-fusing"
        dur="750"
        easing="ease-in"
        attribute="scale"
        from="0.2 0.2 0.2"
        to="0.01 0.01 0.01">
      </a-animation>
      <a-animation
        begin="mouseenter"
        dur="1"
        attribute="position"
        to="0 0 -1">
      </a-animation>
      <a-animation
        begin="mouseleave"
        dur="1"
        attribute="position"
        to="0 0 0">
      </a-animation>
      <a-animation
        begin="click"
        dur="1"
        attribute="position"
        to="0 0 0">
      </a-animation>
    </a-entity>
  </a-camera>
`;
