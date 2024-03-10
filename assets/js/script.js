function cursorEffect() {
  let heroContent = document.querySelector("#hero-content");
  let cursor = document.querySelector("#cursor");

  heroContent.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });
  heroContent.addEventListener("mouseenter", function (dets) {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  heroContent.addEventListener("mouseleave", function (dets) {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}

cursorEffect()