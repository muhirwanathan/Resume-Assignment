// smoth scroll function 

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// My cv download function

document.getElementById('cv-download').addEventListener('click', function(e) {
    e.preventDefault();

    const cvFileName = 'Resume.pdf'; 
    const cvPath = './Assets/' + cvFileName;

    const link = document.createElement('a');
    link.href = cvPath;
    link.download = cvFileName;
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('CV downloaded Complete ', 'success');
});

function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    }, 5000);
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'white';
        nav.style.backdropFilter = 'none';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

window.addEventListener('load', function() {
    const cvButton = document.querySelector('.btn-cv');
    if (cvButton) {
        cvButton.style.opacity = '0';
        cvButton.style.transform = 'translateY(20px)';
        cvButton.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            cvButton.style.opacity = '1';
            cvButton.style.transform = 'translateY(0)';
        }, 500);
    }
});
