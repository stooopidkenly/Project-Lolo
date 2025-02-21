function checkPassword() {
  const password = document.getElementById("password").value;
  const correctPassword = "123";
  const errorMessage = document.getElementById("error-message");

  if (password === correctPassword) {
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    // Store login state in sessionStorage
    sessionStorage.setItem("isLoggedIn", "true");
  } else {
    errorMessage.style.display = "block";
    document.getElementById("password").value = "";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const gallery2 = document.querySelector(".gallery2");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeBtn = document.querySelector(".close");
  const toggleSwitch = document.querySelector("#checkbox");
  const slideshowButton = document.querySelector("#start-slideshow");
  const videoContainer = document.querySelector(".video3");
  let isSlideShowRunning = false;
  let slideShowInterval;

  if (sessionStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }

  // Add event listener for Enter key
  document
    .getElementById("password")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkPassword();
      }
    });

  // Audio setup
  const audio = new Audio("through the years.mp3");
  const playlist = ["silence.mp3", "Youre Gonna Live Forever In Me.mp3"];
  let currentTrack = 0;

  // Create a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center"; // Center the buttons
  buttonContainer.style.gap = "10px"; // Space between buttons
  buttonContainer.style.position = "absolute";
  buttonContainer.style.top = "20px";
  buttonContainer.style.left = "50%";
  buttonContainer.style.transform = "translateX(-50%)"; // Center align

  // Create Play Music button
  const playButton = document.createElement("button");
  playButton.textContent = "Play Music 🎵";
  playButton.style.padding = "10px 15px";
  playButton.style.background = "#ff7f7f";
  playButton.style.color = "white";
  playButton.style.border = "none";
  playButton.style.borderRadius = "20px";
  playButton.style.cursor = "pointer";
  playButton.style.fontSize = "14px";
  playButton.style.fontWeight = "bold";

  // Append the play button and the slideshow button to the container
  buttonContainer.appendChild(playButton);

  // Append the container to the body
  document.body.appendChild(buttonContainer);

  playButton.addEventListener("click", () => {
    audio.play().catch((error) => console.log("Audio playback failed:", error));
    playButton.style.display = "none"; // Hide the button after playing
  });

  // Play next song in the playlist
  audio.addEventListener("ended", () => {
    currentTrack++;
    if (currentTrack >= playlist.length) {
      currentTrack = 0; // Loop back to the first song if all tracks are played
    }
    audio.src = playlist[currentTrack];
    audio.load(); // Ensure the new audio file is loaded
    audio.play().catch((error) => console.log("Audio playback failed:", error));
  });

  // Check for saved theme preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }

  // Array to store all image elements
  const allImages = [];
  const allVideos = [];

  // Generate gallery images dynamically
  for (let i = 1; i <= 33; i++) {
    const img = document.createElement("img");
    img.src = `images/${i}.jpg`;
    img.alt = `Image ${i}`;
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightbox.style.display = "flex";
    });
    gallery.appendChild(img);
    allImages.push(img.src);
  }

  for (let j = 100; j <= 115; j++) {
    const img = document.createElement("img");
    img.src = `images/${j}.jpg`;
    img.alt = `Image ${j}`;
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightbox.style.display = "flex";
    });
    gallery2.appendChild(img);
    allImages.push(img.src);
  }

  for (let i = 200; i <= 209; i++) {
    const videoWrapper = document.createElement("div"); // Wrapper for consistent styling
    videoWrapper.classList.add("video-preview");

    const video = document.createElement("video");
    video.src = `videos/${i}.mp4`;
    video.alt = `Video ${i}`;
    video.controls = false; // Hide controls for preview
    video.classList.add("preview-video"); // Apply styles
    video.addEventListener("click", () => {
      lightbox.innerHTML = ""; // Clear previous content
      const lightboxVideo = document.createElement("video");
      lightboxVideo.src = video.src;
      lightboxVideo.controls = true;
      lightboxVideo.autoplay = true;
      lightboxVideo.classList.add("lightbox-video");
      lightbox.appendChild(lightboxVideo);
      lightbox.style.display = "flex";
    });

    videoWrapper.appendChild(video);
    videoContainer.appendChild(videoWrapper);
    allVideos.push(video.src);
  }

  // Slideshow functionality
  function startSlideshow() {
    if (isSlideShowRunning) {
      clearInterval(slideShowInterval);
      lightbox.style.display = "none";
      slideshowButton.textContent = "Start";
      isSlideShowRunning = false;
      return;
    }

    let currentIndex = 0;
    isSlideShowRunning = true;
    slideshowButton.textContent = "Stop";

    function showImage() {
      if (currentIndex >= allImages.length) {
        currentIndex = 0;
      }
      lightboxImage.src = allImages[currentIndex];
      lightbox.style.display = "flex";
      currentIndex++;
    }

    showImage(); // Show first image immediately
    slideShowInterval = setInterval(showImage, 2000);
  }

  // Event Listeners
  slideshowButton.addEventListener("click", startSlideshow);

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    if (isSlideShowRunning) {
      startSlideshow(); // This will stop the slideshow
    }
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      if (isSlideShowRunning) {
        startSlideshow(); // This will stop the slideshow
      }
    }
  });
});
