document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sideNav = document.getElementById('sideNav');
    const navCloseBtn = document.querySelector('.nav-close-btn');

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        sideNav.classList.toggle('open');
    });

    // Close Navigation on Mobile
    navCloseBtn.addEventListener('click', () => {
        sideNav.classList.remove('open');
    });

    // Close Navigation when clicking outside
    document.addEventListener('click', (event) => {
        if (!sideNav.contains(event.target) && 
            !mobileMenuToggle.contains(event.target) && 
            window.innerWidth <= 768) {
            sideNav.classList.remove('open');
        }
    });

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

    // Responsive Section Reveal Animations
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

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const videoUploadForm = document.getElementById('videoUploadForm');
    const videoUrlInput = document.getElementById('videoUrl');
    const videoPreview = document.getElementById('videoPreview');
    const uploadedVideosGrid = document.getElementById('uploadedVideosGrid');

    // YouTube URL වෙන් කිරීම
    function extractYouTubeVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Video Preview පෙන්වීම
    videoUrlInput.addEventListener('input', () => {
        const videoId = extractYouTubeVideoId(videoUrlInput.value);
        if (videoId) {
            videoPreview.src = `https://www.youtube.com/embed/${videoId}`;
            videoPreview.style.display = 'block';
        } else {
            videoPreview.style.display = 'none';
        }
    });

    // Video Upload කිරීම
    videoUploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const videoId = extractYouTubeVideoId(videoUrlInput.value);
        const videoTitle = document.getElementById('videoTitle').value;
        const videoDescription = document.getElementById('videoDescription').value;

        if (!videoId) {
            alert('කරුණාකර වලංගු YouTube URL එකක් ඇතුළු කරන්න');
            return;
        }

        // Video card නිර්මාණය කිරීම
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
            <iframe width="100%" height="200" 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allowfullscreen>
            </iframe>
            <h3>${videoTitle}</h3>
            <p>${videoDescription}</p>
        `;

        // Video grid වෙත එක් කිරීම
        uploadedVideosGrid.insertBefore(videoCard, uploadedVideosGrid.firstChild);

        // Form Reset කිරීම
        videoUploadForm.reset();
        videoPreview.style.display = 'none';

        // Local Storage වෙත සුරක්ෂිත කිරීම (Optional)
        saveVideoToLocalStorage({
            id: videoId,
            title: videoTitle,
            description: videoDescription
        });
    });

    // Local Storage වෙත videos සුරක්ෂිත කිරීම
    function saveVideoToLocalStorage(video) {
        let videos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
        videos.unshift(video);
        localStorage.setItem('uploadedVideos', JSON.stringify(videos));
    }

    // Page load කිරීමේදී Local Storage සිට videos පැටවීම
    function loadVideosFromLocalStorage() {
        const videos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.innerHTML = `
                <iframe width="100%" height="200" 
                    src="https://www.youtube.com/embed/${video.id}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            `;
            uploadedVideosGrid.appendChild(videoCard);
        });
    }

    // Page load කිරීමේදී videos පැටවීම
    loadVideosFromLocalStorage();
});


document.addEventListener('DOMContentLoaded', () => {
    const messagingForm = document.getElementById('messagingForm'); // පණිවුඩ යැවීමේ form එක
    const messageInput = document.getElementById('messageInput'); // පණිවිඩ input box එක
    const chatMessages = document.getElementById('chatMessages'); // පණිවුඩ පෙන්වන box එක

    // පණිවිඩය එකතු කිරීමේ function එක
    function addMessageToChat(message, sender = 'user') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `message-${sender}`); // පණිවිඩ class එක ලබා දීම
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(messageElement); // Chat window එකට එකතු කිරීම
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll එක පහළට ගෙන යන්න
    }

    // Auto-response (ස්වයංක්‍රීය පිළිතුරු) function එක
    function sendAutoReply() {
        const autoReply = `
        ගිම්හන් ස්ටුඩියෝ,<br>
        Graphic Design | Photography | Web Design | Content Creation.<br>
        Contact Number: +94 76 795 3622<br>
        Email: gimhanstudio@gmail.com<br>
        Website: https://gimhanstudio.github.io/gimhan_studio/<br>
        Location: Gampaha, Sri Lanka<br> 
        Quality and Creativity You Can Trust. Let’s bring your vision to life!.
        `;
        addMessageToChat(autoReply, 'system'); // පද්ධතියෙන් පණිවිඩයක් යැවීම
    }

    // පණිවිඩ යැවීමේ submit event එක
    messagingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Default form behavior නවත්වන්න
        const message = messageInput.value.trim(); // Input value එක trim කිරීම (අතරක් ඉවත් කරනවා)

        if (message) {
            addMessageToChat(message, 'user'); // පරිශීලක පණිවිඩය එකතු කිරීම
            messageInput.value = ''; // Input box එක පිරිසිදු කිරීම

            setTimeout(() => {
                sendAutoReply(); // Auto-response එක යැවීම
            }, 1000); // 1 තත්පරයෙන් පිළිතුරක්
        }
    });
});

