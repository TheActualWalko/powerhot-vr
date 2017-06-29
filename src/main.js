let scene;
$(()=>{
  scene = $("#armsRace");
  $("#video")[0].pause();


  scene.prepend(templates.artist([-4, 1.6, -3]));
  scene.prepend(templates.social([4, 1.6, -3]));
  scene.prepend(templates.playbill([0, -1, -3]));

  scene.append(templates.videosphere());
  scene.append(templates.camera());

});
