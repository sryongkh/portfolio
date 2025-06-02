// Locomotive Scroll Configuration
const initLocomotiveScroll = () => {
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
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
};

// Cursor Effect
const initCursorEffect = () => {
  const heroContent = document.querySelector("#hero-content");
  const cursor = document.querySelector("#cursor");

  const handleMouseMove = (dets) => {
    gsap.to(cursor, {
      css: { x: dets.clientX, y: dets.clientY },
      duration: 0.3,
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    });
  };

  heroContent.addEventListener("mousemove", handleMouseMove);
  heroContent.addEventListener("mouseenter", handleMouseEnter);
  heroContent.addEventListener("mouseleave", handleMouseLeave);
};

// Page Content Animations
const initPageContentAnimation = () => {
  const animations = [
    {
      selector: ".elem h2, #content-introduce-top h3 span",
      props: { y: 100, opacity: 0, duration: 0.4 },
      trigger: {
        trigger: "#content-introduce",
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    },
    {
      selector: "#skills-page-top h4, #skills-page-top h2",
      props: { y: 100, opacity: 0, duration: 0.6 },
      trigger: {
        trigger: "#skills-page",
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    },
    {
      selector: ".skills-category h3",
      props: { x: -50, opacity: 0, duration: 0.8 },
      trigger: {
        trigger: "#skills-page",
        scroller: "#main",
        start: "top 70%",
        end: "top 40%",
        scrub: true,
      },
    },
    {
      selector: "#work-page-top h4, #work-page-top h2",
      props: { y: 100, opacity: 0, duration: 0.6 },
      trigger: {
        trigger: "#work-page",
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    },
    {
      selector: "#contact-page .topic",
      props: { x: -80, opacity: 0, duration: 0.8 },
      trigger: {
        trigger: "#contact-page",
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    },
    {
      selector: ".contact-list .contact-item",
      props: { y: 50, opacity: 0, duration: 0.6 },
      trigger: {
        trigger: "#contact-page",
        scroller: "#main",
        start: "top 70%",
        end: "top 40%",
        scrub: true,
      },
    },
  ];

  animations.forEach(({ selector, props, trigger }) => {
    gsap.from(selector, { ...props, scrollTrigger: trigger });
  });

  const lineClasses = ['.line-1', '.line-2', '.line-3', '.line-4'];
  lineClasses.forEach(lineClass => {
    gsap.from(lineClass, {
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: {
        trigger: lineClass,
        scroller: "#main",
        opacity: 0,
        scrub: true,
        start: "center bottom",
        end: "center center",
      },
    });
  });
};

// Skills Animation
const initSkillsAnimation = () => {
  const skillItems = document.querySelectorAll(".skill-item");
  if (skillItems.length === 0) return;

  gsap.set(skillItems, { x: -300, rotation: 0, opacity: 0 });

  const skillCategories = document.querySelectorAll(".skills-category");
  skillCategories.forEach(category => {
    const categorySkillItems = category.querySelectorAll(".skill-item");
    if (categorySkillItems.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: category,
          scroller: "#main",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        }
      });

      categorySkillItems.forEach(item => {
        tl.to(item, {
          x: 0,
          rotation: -720,
          opacity: 1,
          ease: "power3.out"
        }, 0);
      });
    }
  });
};

// Showcase Items
const initShowcaseItems = async () => {
  try {
    const response = await fetch("assets/data/project.json");
    if (!response.ok) return;
    
    const data = await response.json();
    const showcaseLinksContainer = document.getElementById("show-case");
    const imagePreviewViewport = document.getElementById("video-preview-container");

    if (!showcaseLinksContainer || !imagePreviewViewport) return;

    imagePreviewViewport.innerHTML = "";
    const imageStrip = document.createElement("div");
    imageStrip.id = "image-strip";
    imagePreviewViewport.appendChild(imageStrip);

    data.forEach((item, index) => {
      const showcaseItemLink = document.createElement("div");
      showcaseItemLink.classList.add("showcase-item");
      showcaseItemLink.textContent = item.name;
      showcaseItemLink.dataset.projectIndex = index;
      showcaseLinksContainer.appendChild(showcaseItemLink);

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;
      imageStrip.appendChild(img);
    });
  } catch (error) {
    console.error("Error in initShowcaseItems:", error);
  }
};

// Showcase Hover Image Effect
const initShowcaseHoverImage = (locoScrollInstance) => {
  const showcaseLinksContainer = document.getElementById("show-case");
  const imagePreviewViewport = document.getElementById("video-preview-container");
  const imageStrip = document.getElementById("image-strip");

  if (!showcaseLinksContainer || !imagePreviewViewport || !imageStrip) return;

  let mouseX = 0, mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (imagePreviewViewport.classList.contains("visible")) {
      gsap.to(imagePreviewViewport, {
        x: mouseX + 20,
        y: mouseY - imagePreviewViewport.offsetHeight / 2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });

  showcaseLinksContainer.addEventListener("mouseenter", () => {
    if (!imagePreviewViewport.classList.contains("visible")) {
      imagePreviewViewport.classList.add("visible");
      gsap.to(imagePreviewViewport, { opacity: 1, duration: 0.3 });
    }
  });

  showcaseLinksContainer.addEventListener("mouseleave", (e) => {
    if (!showcaseLinksContainer.contains(e.relatedTarget) && e.relatedTarget !== imagePreviewViewport) {
      if (imagePreviewViewport.classList.contains("visible")) {
        gsap.to(imagePreviewViewport, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => imagePreviewViewport.classList.remove("visible"),
        });
      }
    }
  });

  setTimeout(() => {
    const showcaseItemLinks = showcaseLinksContainer.querySelectorAll(".showcase-item");
    console.log("Found showcase item links for film strip events:", showcaseItemLinks.length); // DEBUG

    showcaseItemLinks.forEach((itemLink) => {
      itemLink.addEventListener("mouseenter", () => {
        const projectIndex = parseInt(itemLink.dataset.projectIndex, 10);
        console.log("Showcase item link mouseenter, project index:", projectIndex); // DEBUG

        if (isNaN(projectIndex)) {
          console.warn("Invalid projectIndex found in dataset for item:", itemLink.textContent); // DEBUG
          return;
        }

        // Calculate the translation needed to show the correct image
        // Use the actual image width instead of viewport width for more accurate positioning
        const imageWidth = imagePreviewViewport.offsetWidth; // This should match CSS: 20vw
        const targetX = -(projectIndex * imageWidth);

        console.log(`Image width: ${imageWidth}, Project index: ${projectIndex}, Target X: ${targetX}`); // DEBUG

        gsap.to(imageStrip, {
          x: targetX,
          duration: 0.5, // Adjust duration as needed
          ease: "power3.out", // Adjust ease as needed
        });

        // Ensure viewport is visible (might have been hidden by mouseleave)
        if (!imagePreviewViewport.classList.contains("visible")) {
          imagePreviewViewport.classList.add("visible");
          gsap.set(imagePreviewViewport, { opacity: 1 }); // Set directly, no fade in if it was hidden quickly
          gsap.to(imagePreviewViewport, {
            // Still update position
            x: mouseX + 20,
            y: mouseY - imagePreviewViewport.offsetHeight / 2,
            duration: 0.1, // Quick position update
          });
        }
      });
    });
  }, 500); // Delay to ensure items are loaded

  console.log("initShowcaseHoverImage for film strip finished"); // DEBUG
};

// Contact Items
const initContactItems = async () => {
  try {
    const response = await fetch("assets/data/contact.json");
    const data = await response.json();
    const contactContainer = document.getElementById("contact-page");

    data.forEach((item) => {
      const contactElement = createContactElement(item);
      contactContainer.appendChild(contactElement);
    });

    // GSAP Animation is now handled in initPageContentAnimation()
    // Remove duplicate animation code here
    
    ScrollTrigger.refresh();
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
};

const createContactElement = (item) => {
  const link = document.createElement("a");
  link.setAttribute("href", item.link);
  link.setAttribute("class", "contact-list");

  const container = document.createElement("div");
  container.setAttribute("class", "contact-item");

  const h3 = document.createElement("h3");
  h3.textContent = item.name;

  const line = document.createElement("div");
  line.setAttribute("class", "line-hv");

  container.append(h3, line);
  link.appendChild(container);
  return link;
};

// Loader Animation
const initLoaderAnimation = () => {
  const tl = gsap.timeline();

  // First, set h1 spans to be invisible initially
  gsap.set("#hero-content h1 span", {
    y: 100,
    opacity: 0
  });

  tl.from("#loader h3", {
    x: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  })
    .to("#loader h3", {
      opacity: 0,
      x: -20,
      stagger: 0.1,
    })
    .to("#loader", {
      opacity: 0,
    })
    .to("#loader", {
      display: "none",
    })
    .to("#hero-content h1 span", {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
};

// Background Geometric Shapes Only
const initBackgroundShapes = () => {
  const shapesContainer = document.createElement('div');
  shapesContainer.className = 'background-shapes';
  document.body.appendChild(shapesContainer);

  const shapeTypes = ['circle', 'square', 'triangle'];
  const shapeCount = window.innerWidth > 768 ? 15 : 8;

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement('div');
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    shape.className = `bg-shape ${shapeType}`;

    // Random size
    const size = Math.random() * 100 + 50;
    if (shapeType !== 'triangle') {
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
    }

    // Random position
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;

    // Random animation duration
    shape.style.animationDuration = `${Math.random() * 20 + 10}s`;
    shape.style.animationDelay = `${Math.random() * 5}s`;

    shapesContainer.appendChild(shape);
  }
};

// Initialize all components
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize Locomotive Scroll first, as other animations depend on it
  const locoScrollInstance = initLocomotiveScroll();

  // Setup improved contact link handler
  const contactLink = document.querySelector("#contactLink");
  if (contactLink) {
    contactLink.addEventListener("click", (event) => {
      event.preventDefault();
      console.log('Contact link clicked'); // Debug
      
      const contactSection = document.querySelector("#contact-page");
      if (contactSection) {
        console.log('Contact section found, scrolling...'); // Debug
        
        // Use locomotive scroll's scrollTo method with correct API
        locoScrollInstance.scrollTo(
          contactSection,     // target
          -100,              // offset from top
          1500,              // duration in ms
          [0.25, 0.0, 0.35, 1.0], // easing array
          false,             // disableLerp
          function() {       // callback
            console.log('Locomotive scroll completed'); // Debug
            // Refresh ScrollTrigger after scroll completes
            setTimeout(() => {
              ScrollTrigger.refresh();
              console.log('ScrollTrigger refreshed after contact scroll');
            }, 100);
          }
        );
        
      } else {
        console.error('Contact section not found!');
      }
    });
  } else {
    console.error('Contact link not found!');
  }

  // Initialize other components
  initCursorEffect();
  initLoaderAnimation();

  // Wait for showcase items to be created, then setup hover effect
  await initShowcaseItems();
  initShowcaseHoverImage(locoScrollInstance); // Pass the instance to avoid re-initialization

  // Wait for contact items to be created
  await initContactItems();

  // Initialize page content animations after everything is ready
  initPageContentAnimation();

  // Initialize skills bar animations
  setTimeout(() => {
    initSkillsAnimation();
  }, 1000); // Wait 1 second for everything to be ready

  // Final ScrollTrigger refresh to ensure everything works
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  // Initialize background shapes
  initBackgroundShapes();
});
