templates.artist = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    look-at="#camera"
    group-opacity="0"
    when-looked-at="
      property: group-opacity;
      in: 1;
      out: 0;
      focusX: 0.3; 
      focusY: 0.8; 
      usesDomNode: #artist;
    ">
    <a-plane 
      class="uses-html"
      position="0 0.5 0"
      scale="2.4 3.5 1"
      position="0 0 0"
      material="
        shader: html; 
        target: #all-html; 
        width: 480;
        height: 700;
      ">
    </a-plane>
  </a-entity>
`;
