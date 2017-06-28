$(()=>{
  const scene = $("#armsRace");

  scene.append(templates.postPhoto());
  scene.append(templates.camera());

  scene.prepend(templates.artist([-4, 1.6, -3]));
  scene.prepend(templates.social([4, 1.6, -3]));
  scene.prepend(templates.playbill([0, -2, -3]));

  scene.append(templates.videosphere());

});
