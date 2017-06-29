templates.iheartLogo = (position)=>`
  <a-image
    transparent="true"
    logo-animate
    material="side: double; opacity: 0;"
    rotation="0 0 0"
    position="${position.join(' ')}"
    src="#logo">
  </a-image>
  <a-image
    transparent="true"
    logo-animate-glow
    material="side: double; opacity: 0;"
    rotation="0 0 0"
    position="${position.join(' ')}"
    src="#logo-glow">
  </a-image>
`;
