gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  tablet: { smooth: true },
  smartphone: { smooth: true },
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
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
function pageContentAnimation() {
  gsap.from(".elem h2", {
    y: 120,
    stagger: 0.25,
    duration: 1,
    scrollTrigger: {
      trigger: "#content-introduce",
      scroller: "#main",
      start: "top 40%",
      stop: "top 37%",
      scrub: 1,
    },
  });
}

cursorEffect();
pageContentAnimation();
