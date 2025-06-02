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

// Featured Works Interactive Effects
const initFeaturedWorksInteractions = () => {
  // Enhanced Work Items Animation
  const workItems = document.querySelectorAll('#work-elements .box');
  
  // Intersection Observer for work items reveal animation
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 150); // Stagger animation
        workObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe work items when they're created
  const observeWorkItems = () => {
    const currentWorkItems = document.querySelectorAll('#work-elements .box');
    currentWorkItems.forEach(item => {
      workObserver.observe(item);
    });
  };

  // Watch for new work items being added
  const workContainer = document.querySelector('#work-elements');
  if (workContainer) {
    const workMutationObserver = new MutationObserver(() => {
      observeWorkItems();
    });
    workMutationObserver.observe(workContainer, { childList: true });
  }

  // Enhanced showcase interactions
  const initEnhancedShowcase = () => {
    const showcaseContainer = document.querySelector('#show-case');
    if (!showcaseContainer) return;

    // Add dynamic background effect on showcase hover
    showcaseContainer.addEventListener('mouseenter', () => {
      const workPage = document.querySelector('#work-page');
      if (workPage) {
        workPage.style.setProperty('--dynamic-bg-opacity', '1');
      }
    });

    showcaseContainer.addEventListener('mouseleave', () => {
      const workPage = document.querySelector('#work-page');
      if (workPage) {
        workPage.style.setProperty('--dynamic-bg-opacity', '0');
      }
    });
  };

  // Work page top section interaction
  const workPageTop = document.querySelector('#work-page-top');
  if (workPageTop) {
    workPageTop.addEventListener('click', () => {
      // Add click ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 145, 73, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
      `;
      
      workPageTop.style.position = 'relative';
      workPageTop.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Add ripple animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  initEnhancedShowcase();
};

// Enhanced Video Preview Interactions
const initEnhancedVideoPreview = () => {
  const previewContainer = document.querySelector('#video-preview-container');
  const showcaseItems = document.querySelectorAll('.showcase-item');
  
  if (!previewContainer) return;

  // Enhanced showcase item interactions
  showcaseItems.forEach((item, index) => {
    // Add entrance animation delay
    item.style.animationDelay = `${index * 0.1}s`;
    
    // Enhanced hover effects
    item.addEventListener('mouseenter', (e) => {
      // Add slight rotation based on position
      const isOdd = index % 2 === 0;
      const rotation = isOdd ? '1deg' : '-1deg';
      item.style.transform = `translateY(-8px) scale(1.02) rotateZ(${rotation})`;
      
      // Create floating particles on hover
      createHoverParticles(e.target);
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
};

// Create floating particles on showcase hover
const createHoverParticles = (element) => {
  const rect = element.getBoundingClientRect();
  const particleCount = 3;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--color-orange);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      opacity: 0.8;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top + Math.random() * rect.height}px;
      animation: particleFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
  
  // Add particle animation
  if (!document.querySelector('#particle-animation-style')) {
    const style = document.createElement('style');
    style.id = 'particle-animation-style';
    style.textContent = `
      @keyframes particleFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.8;
        }
        100% {
          transform: translateY(-30px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// Work Section Background Animation
const initWorkSectionBackground = () => {
  const workPage = document.querySelector('#work-page');
  if (!workPage) return;

  // Add parallax effect on scroll
  window.addEventListener('scroll', () => {
    const rect = workPage.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const scrollProgress = Math.max(0, Math.min(1, 
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));
      
      // Animate background opacity based on scroll
      const bgOpacity = scrollProgress * 0.5;
      workPage.style.setProperty('--scroll-bg-opacity', bgOpacity.toString());
    }
  });

  // Add dynamic CSS property for background control
  const style = document.createElement('style');
  style.textContent = `
    #work-page::before {
      opacity: var(--scroll-bg-opacity, 0);
    }
  `;
  document.head.appendChild(style);
};

// Enhanced Line Animation
const initEnhancedLineAnimation = () => {
  const workLine = document.querySelector('#work-page hr.line-3');
  if (!workLine) return;

  // Trigger line animation when section comes into view
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.5
  });

  lineObserver.observe(workLine);
};

// Content Protection & Anti-Theft System
const initContentProtection = () => {
  // Console warning message
  console.clear();
  console.log('%c⚠️ WARNING - CONTENT PROTECTION ACTIVE ⚠️', 
    'color: #ff0000; font-size: 24px; font-weight: bold; background: #000; padding: 10px;');
  console.log('%c🚫 This website\'s content is protected by copyright law.', 
    'color: #ff4444; font-size: 16px; font-weight: bold;');
  console.log('%c📝 Unauthorized copying, reproduction, or distribution is prohibited.', 
    'color: #ff6666; font-size: 14px;');
  console.log('%c⚖️ Legal action will be taken against violators.', 
    'color: #ff8888; font-size: 14px;');
  console.log('%c💼 For licensing inquiries, please contact the owner.', 
    'color: #ffaaaa; font-size: 14px;');

  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showProtectionMessage('Right-click is disabled to protect content.');
    return false;
  });

  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable drag and drop
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable common developer tools shortcuts
  document.addEventListener('keydown', function(e) {
    // F12 (Developer Tools)
    if (e.keyCode === 123) {
      e.preventDefault();
      showDevWarning();
      return false;
    }
    
    // Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      showDevWarning();
      return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      showDevWarning();
      return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      showProtectionMessage('Source code viewing is disabled.');
      return false;
    }
    
    // Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      showProtectionMessage('Saving is disabled to protect content.');
      return false;
    }
    
    // Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      showProtectionMessage('Text selection is disabled.');
      return false;
    }
    
    // Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      showProtectionMessage('Printing is disabled.');
      return false;
    }
    
    // Ctrl+C (Copy)
    if (e.ctrlKey && e.keyCode === 67) {
      e.preventDefault();
      showProtectionMessage('Copying is disabled to protect content.');
      return false;
    }
    
    // Ctrl+V (Paste) - Less important but for consistency
    if (e.ctrlKey && e.keyCode === 86) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+X (Cut)
    if (e.ctrlKey && e.keyCode === 88) {
      e.preventDefault();
      showProtectionMessage('Cutting is disabled to protect content.');
      return false;
    }
  });

  // Detect developer tools
  let devtools = { open: false, orientation: null };
  const threshold = 160;

  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        showDevWarning();
        console.clear();
        console.log('%c🚨 DEVELOPER TOOLS DETECTED! 🚨', 
          'color: #ff0000; font-size: 30px; font-weight: bold; background: #000; padding: 15px;');
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Prevent iframe embedding (clickjacking protection)
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // Disable print screen (limited effectiveness)
  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 44) {
      showProtectionMessage('Screenshot functionality is discouraged.');
    }
  });

  // Mouse protection for images
  document.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // Touch protection for mobile
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
      return false;
    }
  });

  // Disable text highlighting
  document.onselectstart = function() {
    return false;
  };

  document.onmousedown = function() {
    return false;
  };

  // Clear console periodically
  setInterval(() => {
    console.clear();
    console.log('%c🔒 Content Protected - © 2024 Sirinya Portfolio', 
      'color: #00ff00; font-size: 16px; font-weight: bold;');
  }, 3000);
};

// Show protection message
const showProtectionMessage = (message) => {
  // Create temporary notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 0, 0, 0.9);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    max-width: 300px;
    word-wrap: break-word;
  `;
  notification.textContent = `🚫 ${message}`;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
};

// Show developer tools warning
const showDevWarning = () => {
  let warningDiv = document.getElementById('dev-warning');
  
  if (!warningDiv) {
    warningDiv = document.createElement('div');
    warningDiv.id = 'dev-warning';
    warningDiv.innerHTML = `
      <h1>⚠️ ACCESS DENIED ⚠️</h1>
      <p>🚫 Developer tools usage is not permitted on this website.</p>
      <p>📝 This content is protected by copyright law.</p>
      <p>⚖️ Unauthorized access or copying may result in legal action.</p>
      <p>💼 For legitimate purposes, please contact the owner.</p>
      <p style="margin-top: 30px; font-size: 16px;">This warning will disappear in 5 seconds...</p>
    `;
    document.body.appendChild(warningDiv);
  }
  
  warningDiv.style.display = 'flex';
  
  setTimeout(() => {
    if (warningDiv) {
      warningDiv.style.display = 'none';
    }
  }, 5000);
};

// Image protection
const initImageProtection = () => {
  // Disable image dragging
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      showProtectionMessage('Image downloading is disabled.');
      return false;
    });
  });
};

// URL obfuscation (basic)
const initURLProtection = () => {
  // Disable history manipulation attempts
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.protected) {
      history.pushState({protected: true}, '', location.href);
    }
  });
  
  // Add initial state
  history.pushState({protected: true}, '', location.href);
};

// Initialize all protection measures
const initAllProtections = () => {
  initContentProtection();
  initImageProtection();
  initURLProtection();
  
  // Additional console warning
  setTimeout(() => {
    console.clear();
    console.log('%c', 'font-size: 1px;');
    console.log('%c🛡️ SECURITY NOTICE 🛡️\n\nThis website is protected by advanced security measures.\nAll activity is monitored and logged.\n\n© 2024 Sirinya Portfolio - All Rights Reserved', 
      'color: #ff6600; font-size: 18px; font-weight: bold; line-height: 1.5;');
  }, 1000);
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

  // Initialize featured works interactions
  initFeaturedWorksInteractions();

  // Initialize enhanced video preview interactions
  initEnhancedVideoPreview();

  // Initialize work section background animation
  initWorkSectionBackground();

  // Initialize enhanced line animation
  initEnhancedLineAnimation();

  // Initialize all protection measures
  initAllProtections();
});
