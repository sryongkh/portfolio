// Locomotive
function locoScroll() {
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
  // Scroll to contact
  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelector("#contactLink")
      .addEventListener("click", function () {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: "#contact-page",
            offsetY: 0,
          },
        });
      });
  });
}
locoScroll();
function cursorEffect() {
  let heroContent = document.querySelector("#hero-content");
  let cursor = document.querySelector("#cursor");

  heroContent.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      css: { x: dets.clientX, y: dets.clientY },
      duration: 0.3,
    });
  });
  heroContent.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });
  });
  heroContent.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    });
  });
}
cursorEffect();
function pageContentAnimation() {
  gsap.from(".elem h2, #content-introduce-top h3 span", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    scrollTrigger: {
      trigger: "#content-introduce",
      scroller: "#main",
      start: "center bottom",
      end: "center center",
      scrub: true,
    },
  });
  gsap.from(".line-1", {
    scrollTrigger: {
      trigger: ".line-1",
      scroller: "#main",
      opacity: 0,
      scrub: true,
      start: "center bottom",
      end: "center center",
    },
    scaleX: 0,
    transformOrigin: "left center",
    ease: "none",
  });
  gsap.from(".line-2", {
    scrollTrigger: {
      trigger: ".line-2",
      scroller: "#main",
      opacity: 0,
      scrub: true,
      start: "center bottom",
      end: "center center",
    },
    scaleX: 0,
    transformOrigin: "left center",
    ease: "none",
  });
  gsap.from("#work-page-top", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#work-page",
      scroller: "#main",
      start: "top center",
      end: "top top",
    },
  });
  gsap.from("#contact-page .topic", {
    x: -80,
    opacity: 0,
    scrollTrigger: {
      trigger: "#contact-page",
      scroller: "#main",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });
  const contactBtn = document.getElementById("contactLink");
  contactBtn.addEventListener("click", function () {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: "#contact-page",
        offsetY: 0,
      },
    });
  });
}
pageContentAnimation();
function addBoxToWorkElements() {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("/assets/data/project.json")
      .then((response) => response.json())
      .then((data) => {
        const workElements = document.getElementById("work-elements"); // ย้ายมานอก loop
        data.forEach((item) => {
          // Box
          const boxLink = document.createElement("a");
          boxLink.setAttribute("class", "box");
          boxLink.setAttribute("href", item.link);
          // Badge elements
          const techStack = document.createElement("div");
          techStack.setAttribute("class", "techstack");
          const techItems = item.stack;
          techItems.forEach((tech) => {
            // เปลี่ยนชื่อเพื่อไม่ให้สับสนกับ 'item'
            const techItem = document.createElement("div");
            techItem.setAttribute("class", "tech-item");
            techItem.textContent = tech;
            techStack.appendChild(techItem);
          });
          // Logo
          const logoImg = document.createElement("img");
          logoImg.setAttribute("src", item.logo);
          logoImg.setAttribute("class", "logo");
          // Image
          const imgWrapper = document.createElement("div");
          imgWrapper.setAttribute("class", "img-wrapper");
          const coverImg = document.createElement("img");
          coverImg.setAttribute("src", item.img);
          imgWrapper.appendChild(coverImg);
          // Video
          const video = document.createElement("video");
          video.setAttribute("src", item.video);
          video.setAttribute("autoplay", "");
          video.setAttribute("loop", "");
          video.setAttribute("muted", "");
          // Append
          boxLink.appendChild(techStack);
          boxLink.appendChild(logoImg);
          boxLink.appendChild(imgWrapper);
          boxLink.appendChild(video);

          // Append ไปยัง workElements ใน loop
          workElements.appendChild(boxLink);
        });
        // GSAP
        gsap.to("#work-elements .box", {
          y: -80,
          stagger: 0.15,
          opacity: 1,
          duration: 0.2,
          scrollTrigger: {
            trigger: "#work-page",
            scroller: "#main",
            start: "top center",
            end: "top top",
          },
        });
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  });
}
addBoxToWorkElements();
function addContactItem() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/data/contact.json")
      .then((response) => response.json())
      .then((data) => {
        const contactContainer = document.getElementById("contact-page");
        data.forEach((item) => {
          const link = document.createElement("a");
          link.setAttribute("href", item.link);
          link.setAttribute("class", "contact-list");
          const container = document.createElement("div");
          container.setAttribute("class", "contact-item");
          const h3 = document.createElement("h3");
          h3.textContent = item.name;
          const line = document.createElement("div");
          line.setAttribute("class", "line-hv");
          container.appendChild(h3);
          container.appendChild(line);
          link.appendChild(container);
          contactContainer.appendChild(link);
        });
        // GSAP
        gsap.from(".contact-list .contact-item", {
          y: -80,
          stagger: 0.15,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: "#contact-page",
            scroller: "#main",
            start: "top center",
            end: "top top",
            scrub: true,
          },
        });

        ScrollTrigger.refresh();
      });
  });
}
addContactItem();

// Loader
let tl = gsap.timeline();
tl.from("#loader h3", {
  x: 20,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
});
tl.to("#loader h3", {
  opacity: 0,
  x: -20,
  stagger: 0.1,
});
tl.to("#loader", {
  opacity: 0,
});
tl.to("#loader", {
  display: "none",
});
// Hero
tl.from("#hero-content h1 span", {
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 0.5,
});
