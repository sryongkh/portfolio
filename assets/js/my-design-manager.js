// My Design Projects Data Manager
const myDesignProjects = [
  {
    id: 1,
    title: "HealMe",
    description: "Designed and created the website for HealMe",
    image: "assets/img/healme-cover.png",
    alt: "HealMe Project",
    link: "#", // optional: เพิ่ม link ถ้าต้องการ
    category: "healthcare" // optional: สำหรับ filter
  },
  {
    id: 2,
    title: "SumPlong",
    description: "Designed and created the website for SumPlong",
    image: "assets/img/sumplong-cover.png",
    alt: "SumPlong Project",
    link: "#",
    category: "business"
  },
  {
    id: 3,
    title: "Blueventure Actuarial",
    description: "Designed and created the website for Blueventure Actuarial",
    image: "assets/img/blueventure-cover.png",
    alt: "Blueventure Actuarial Project",
    link: "#",
    category: "finance"
  },
  {
    id: 4,
    title: "ทุบตึก.com",
    description: "Designed and created the website for Poonsin Yota",
    image: "assets/img/poonsin-cover.png",
    alt: "Poonsin Project",
    link: "#",
    category: "construction"
  },
  {
    id: 5,
    title: "Adhub Marketplace",
    description: "Designed and created the website for Adhub",
    image: "assets/img/adhub-cover.png",
    alt: "Adhub Project",
    link: "#",
    category: "marketplace"
  },
  {
    id: 6,
    title: "Realm Panel",
    description: "Designed and created the website for Realm Panel",
    image: "assets/img/realm-cover.png",
    alt: "Realm Panel Project",
    link: "#",
    category: "gaming"
  },
  {
    id: 7,
    title: "ECL About Us",
    description: "Designed and created the website for ECL About Us",
    image: "assets/img/ecl-aboutus-cover.png",
    alt: "ECL About Us Project",
    link: "#",
    category: "corporate"
  }
];

// Function to render a single project
function renderProject(project) {
  const projectElement = document.createElement('div');
  projectElement.className = 'my-design-item'; // ขนาดเท่ากันทั้งหมด
  
  projectElement.innerHTML = `
    <img src="${project.image}" alt="${project.alt}" loading="lazy" />
    <div class="my-design-content ${project.contentClasses || ''}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  `;
  
  // เพิ่ม click event ถ้ามี link
  if (project.link && project.link !== '#') {
    projectElement.style.cursor = 'pointer';
    projectElement.addEventListener('click', () => {
      window.open(project.link, '_blank');
    });
  }
  
  return projectElement;
}

// Function to render all projects
function renderAllProjects() {
  const container = document.getElementById('my-design-container');
  if (!container) {
    console.error('My Design container not found');
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Render each project
  myDesignProjects.forEach(project => {
    const projectElement = renderProject(project);
    container.appendChild(projectElement);
  });
}

// Function to add new project (for easy adding)
function addProject(newProject) {
  // Validate required fields
  if (!newProject.title || !newProject.image || !newProject.description) {
    console.error('Missing required fields: title, image, description');
    return false;
  }
  
  // Add default values
  const project = {
    id: Date.now(), // Simple ID generation
    alt: newProject.alt || newProject.title,
    contentClasses: newProject.contentClasses || '', // เฉพาะ light class
    link: newProject.link || '#',
    category: newProject.category || 'other',
    ...newProject
  };
  
  // Add to array
  myDesignProjects.push(project);
  
  // Re-render all projects
  renderAllProjects();
  
  return true;
}

// Function to remove project by ID
function removeProject(projectId) {
  const index = myDesignProjects.findIndex(project => project.id === projectId);
  if (index > -1) {
    myDesignProjects.splice(index, 1);
    renderAllProjects();
    return true;
  }
  return false;
}

// Function to filter projects by category
function filterProjects(category) {
  const container = document.getElementById('my-design-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const filteredProjects = category === 'all' 
    ? myDesignProjects 
    : myDesignProjects.filter(project => project.category === category);
    
  filteredProjects.forEach(project => {
    const projectElement = renderProject(project);
    container.appendChild(projectElement);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  renderAllProjects();
});

// Export functions for global use
window.MyDesignManager = {
  addProject,
  removeProject,
  filterProjects,
  renderAllProjects,
  getProjects: () => [...myDesignProjects] // Return copy of array
}; 