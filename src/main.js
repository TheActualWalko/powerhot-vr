$(()=>{
  const scene = $("#armsRace");

  scene.append(templates.camera());
  scene.append(templates.videosphere());

  scene.prepend(templates.artist());
  scene.prepend(templates.social());
  scene.prepend(templates.playbill([0, -2, -3]));
  scene.prepend(templates.postPhoto());
});
