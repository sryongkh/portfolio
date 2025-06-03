// ตัวอย่างคำสั่งสำหรับเพิ่มโปรเจคใหม่
// Copy และ paste ใน Browser Console หรือใช้ในไฟล์ JavaScript
// หมายเหตุ: Card ทุกอันจะมีขนาดเท่ากัน (400px height)

// 1. โปรเจคมาตรฐาน
MyDesignManager.addProject({
  title: "Cafe Website",
  description: "เว็บไซต์สำหรับร้านกาแฟท้องถิ่น",
  image: "assets/img/cafe-website.jpg",
  category: "restaurant"
});

// 2. โปรเจคที่มี link
MyDesignManager.addProject({
  title: "Tech Startup Landing",
  description: "หน้า Landing สำหรับ Startup เทคโนโลยี",
  image: "assets/img/tech-startup.jpg",
  link: "https://tech-startup-demo.com",
  category: "startup"
});

// 3. โปรเจคพื้นหลังสว่าง
MyDesignManager.addProject({
  title: "Business Card Design",
  description: "การออกแบบนามบัตรดิจิทัล",
  image: "assets/img/business-card.jpg",
  contentClasses: "light", // พื้นหลังสว่าง
  category: "print-design"
});

// 4. โปรเจคอีคอมเมิร์ซ
MyDesignManager.addProject({
  title: "Online Store",
  description: "ร้านค้าออนไลน์สำหรับสินค้าแฟชั่น",
  image: "assets/img/fashion-store.jpg",
  link: "https://fashion-store-demo.com",
  category: "e-commerce"
});

// 5. โปรเจคบริษัท
MyDesignManager.addProject({
  title: "Corporate Website Redesign",
  description: "การออกแบบเว็บไซต์บริษัทใหม่ทั้งหมด",
  image: "assets/img/corporate-redesign.jpg",
  link: "https://corporate-demo.com",
  category: "corporate"
});

// คำสั่งอื่นๆ ที่มีประโยชน์:

// ดูโปรเจคทั้งหมด
console.log("All Projects:", MyDesignManager.getProjects());

// กรองตามหมวดหมู่
MyDesignManager.filterProjects('e-commerce');

// แสดงทั้งหมด
MyDesignManager.filterProjects('all');

// ลบโปรเจค (ใช้ ID)
MyDesignManager.removeProject(8);

// รีเฟรชการแสดงผล
MyDesignManager.renderAllProjects(); 