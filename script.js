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
    const messagingForm = document.getElementById('messagingForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Local Storage වෙත පණිවුඩ සුරැකීම
    function saveMessageToLocalStorage(message) {
        let messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push({
            text: message,
            timestamp: new Date().toISOString(),
            sender: 'user'
        });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    // Auto-response function
    function generateAutoResponse() {
        const responses = [
            "ඔබේ පණිවුඩය දැනුම් දුන්නට ස්තුතියි! අප �ක්ෂණිකව පිළිතුරු දක්වන්නේ.",
            "ඔබේ සන්නිවේදනය අගය කරමු. අප ඉක්මනින් සම්බන්ධ වෙමු.",
            "මම ඔබේ පණිවුඩය පිළිගත්තෙමි. කරුණාකර රැඳී සිටින්න.",
            "ඔබේ පණිවුඩය සාර්ථකව එවා ඇත. පිළිතුරු ලබා දෙන්නෙමු.",
            "ඔබේ සන්නිවේදනය සලකා බැලීමට ස්තුතියි!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // පණිවුඩයක් එකතු කිරීම
    function addMessageToChat(message, sender = 'user') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `message-${sender}`);
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // පණිවුඩ යැවීමේ සිදුවීම් කළමනාකරණය
    messagingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        
        if (message) {
            // පරිශීලක පණිවුඩය එකතු කිරීම
            addMessageToChat(message, 'user');
            
            // Local Storage වෙත සුරැකීම
            saveMessageToLocalStorage(message);
            
            // Input field එක reset කිරීම
            messageInput.value = '';

            // Auto-response එක යැවීම
            setTimeout(() => {
                const autoResponse = generateAutoResponse();
                addMessageToChat(autoResponse, 'system');
                saveMessageToLocalStorage(autoResponse);
            }, 1000);
        }
    });

    // Local Storage වෙතින් පැරණි පණිවුඩ පැටවීම
    function loadMessagesFromLocalStorage() {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.forEach(msg => {
            addMessageToChat(msg.text, msg.sender);
        });
    }

    // Page load කිරීමේදී පැරණි පණිවුඩ පැටවීම
    loadMessagesFromLocalStorage();
});




document.addEventListener('DOMContentLoaded', () => {
    const messagingForm = document.getElementById('messagingForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Local Storage වෙත පණිවුඩ සුරැකීම
    function saveMessageToLocalStorage(message, sender) {
        let messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        const newMessage = {
            id: Date.now(), // අද්විතීය හැඳුනුම්පත එක් කිරීම
            text: message,
            timestamp: new Date().toISOString(),
            sender: sender
        };
        messages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        return newMessage.id;
    }

    // Local Storage වලින් පණිවුඩයක් මැකීම
    function deleteMessageFromLocalStorage(messageId) {
        let messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages = messages.filter(msg => msg.id !== messageId);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    // Auto-response function
    function generateAutoResponse() {
        const responses = [
            "ඔබේ පණිවුඩය දැනුම් දුන්නට ස්තුතියි! අප ක්ෂණිකව පිළිතුරු දක්වන්නේ.",
            "ඔබේ සන්නිවේදනය අගය කරමු. අප ඉක්මනින් සම්බන්ධ වෙමු.",
            "මම ඔබේ පණිවුඩය පිළිගත්තෙමි. කරුණාකර රැඳී සිටින්න.",
            "ඔබේ පණිවුඩය සාර්ථකව එවා ඇත. පිළිතුරු ලබා දෙන්නෙමු.",
            "ඔබගේ පණිවුඩයට ස්තුතියි"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // පණිවුඩයක් එකතු කිරීම
    function addMessageToChat(message, sender = 'user', messageId = null) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `message-${sender}`);
        messageElement.dataset.messageId = messageId || Date.now();
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑️';
        deleteButton.classList.add('delete-message-btn');
        deleteButton.addEventListener('click', () => {
            deleteMessage(messageElement);
        });

        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">
                ${new Date().toLocaleTimeString()}
                ${sender === 'user' ? deleteButton.outerHTML : ''}
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // පණිවුඩ මැකීම
    function deleteMessage(messageElement) {
        const messageId = parseInt(messageElement.dataset.messageId);
        
        // Local Storage වලින් මැකීම
        deleteMessageFromLocalStorage(messageId);
        
        // DOM වලින් මැකීම
        messageElement.remove();
    }

    // පණිවුඩ යැවීමේ සිදුවීම් කළමනාකරණය
    messagingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        
        if (message) {
            // පරිශීලක පණිවුඩය එකතු කිරීම
            const messageId = saveMessageToLocalStorage(message, 'user');
            addMessageToChat(message, 'user', messageId);
            
            // Input field එක reset කිරීම
            messageInput.value = '';

            // Auto-response එක යැවීම
            setTimeout(() => {
                const autoResponse = generateAutoResponse();
                const responseId = saveMessageToLocalStorage(autoResponse, 'system');
                addMessageToChat(autoResponse, 'system', responseId);
            }, 1000);
        }
    });

    // Local Storage වෙතින් පැරණි පණිවුඩ පැටවීම
    function loadMessagesFromLocalStorage() {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.forEach(msg => {
            addMessageToChat(msg.text, msg.sender, msg.id);
        });
    }

    // Page load කිරීමේදී පැරණි පණිවුඩ පැටවීම
    loadMessagesFromLocalStorage();
});
