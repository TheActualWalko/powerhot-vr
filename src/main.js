let scene;
$(()=>{
  scene = $("#armsRace");
  $("#video")[0].pause();

  scene.prepend(templates.artist(
    [-8, 2.6, -4],
    [2,2,2]
  ));
  scene.prepend(templates.social(
    [8, 2.6, -4],
    [2,2,2]
  ));
  scene.prepend(templates.playbill(
    [0, -1.5, -2.5],
    [1,1,1]
  ));
  if (values.location === 'theater'){
    scene.append(templates.videosphere(270));
  } else {
    scene.append(templates.videosphere(265));
  }
  scene.append(templates.camera());

});
