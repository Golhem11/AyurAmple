
// Mobile menu toggle with keyboard support
const menuToggle=document.getElementById('menuToggle');
const navMenu=document.getElementById('navMenu');
if(menuToggle&&navMenu){
  const closeMenu=()=>{
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  };
  
  const toggleMenu=()=>{
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    if(navMenu.classList.contains('open')){
      navMenu.querySelector('a')?.focus();
    }
  };
  
  menuToggle.addEventListener('click',toggleMenu);
  
  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click',closeMenu);
  });

  // Close menu on outside click
  document.addEventListener('click',(event)=>{
    if(window.innerWidth<=900&&navMenu.classList.contains('open')&&!navMenu.contains(event.target)&&!menuToggle.contains(event.target)){
      closeMenu();
    }
  });
  
  // Close menu on Escape key
  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'&&navMenu.classList.contains('open')){
      closeMenu();
      menuToggle.focus();
    }
  });
}

// Scroll reveal for cards and feature blocks
const revealItems=document.querySelectorAll('.card,.feature,.hero-card,.section-head,.info-box');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});

  revealItems.forEach((item)=>{
    item.classList.add('reveal-on-scroll');
    observer.observe(item);
  });
} else {
  revealItems.forEach((item)=>item.classList.add('visible'));
}

// Filter functionality with smooth transitions
document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const value=btn.dataset.filter;
    
    // Add fade-out effect
    document.querySelectorAll('[data-category]').forEach(card=>{
      const shouldShow=value==='all'||card.dataset.category===value;
      card.style.opacity='0';
      setTimeout(()=>{
        card.style.display=shouldShow?'':'none';
        card.style.opacity='1';
      },150);
    });
  });
});

// Form handling with validation
document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    const name=data.get('name')?.trim();
    const phone=data.get('phone')?.trim();
    const email=data.get('email')?.trim();
    
    // Basic validation
    if(!name||!phone||!email){
      alert('Please fill in all required fields');
      return;
    }
    
    const subject=encodeURIComponent('AyurAmple Website Enquiry');
    const body=encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nRequirement: ${data.get('requirement')}\nMessage: ${data.get('message')}`
    );
    window.location.href=`mailto:ayurample@gmail.com?subject=${subject}&body=${body}`;
  });
});
