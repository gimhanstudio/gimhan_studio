document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Navigation Hover Effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { color: '#00ffff', duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { color: '#e0e0e0', duration: 0.3 });
        });
    });

    // Section Reveal Animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Glitch Text Effect
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            glitchText.dataset.text = glitchText.textContent;
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('පනිවුඩය යවා ඇත! පසුව සම්බන්ධ වෙමු.');
        contactForm.reset();
    });
});



        // Video Upload Functions
document.addEventListener('DOMContentLoaded', () => {
    const videoUploadForm = document.getElementById('videoUploadForm');
    const videoFileInput = document.getElementById('videoFile');
    const videoPreview = document.getElementById('videoPreview');
    const uploadedVideosGrid = document.getElementById('uploadedVideosGrid');

    // Video Preview Function
    videoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            videoPreview.src = fileURL;
            videoPreview.style.display = 'block';
        }
    });

    // Video Upload Function
    videoUploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleInput = videoUploadForm.querySelector('input[type="text"]');
        const fileInput = videoFileInput;
        const descriptionInput = videoUploadForm.querySelector('textarea');

        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (file) {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            
            const videoElement = document.createElement('video');
            videoElement.src = URL.createObjectURL(file);
            videoElement.controls = true;
            videoElement.style.maxWidth = '100%';

            const titleElement = document.createElement('h3');
            titleElement.textContent = title;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description;

            videoCard.appendChild(videoElement);
            videoCard.appendChild(titleElement);
            videoCard.appendChild(descriptionElement);

            uploadedVideosGrid.appendChild(videoCard);

            // Reset form
            videoUploadForm.reset();
            videoPreview.style.display = 'none';

            alert('විඩියෝව සාර්ථකව අඩංගු කරන්න');
        }
    });
});
