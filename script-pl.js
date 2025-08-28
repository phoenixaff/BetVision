
              document.addEventListener("DOMContentLoaded", () => {
                const video = document.getElementById("videoPlayer");
            
                const isAndroid = /android/i.test(navigator.userAgent);
                const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
                const isDesktop = !isAndroid && !isIOS;
            
                console.log("[Platform] Android:", isAndroid, "iOS:", isIOS, "Desktop:", isDesktop);
            
                if (isAndroid) {
                  runAndroidScript();
                } else if (isIOS) {
                  runIOSScript();
                } else if (isDesktop) {
                  runDesktopScript();
                }
            
                // =========================
                // 📱 ANDROID
                // =========================
                function runAndroidScript() {
                  let hasInteracted = false;
            
                  const tryPlay = () => {
                    console.log("[Android] Trying autoplay...");
                    video.play()
                      .then(() => {
                        console.log("[Android] Autoplay started.");
                        checkIfPlaying();
                      })
                      .catch((err) => {
                        console.warn("[Android] Autoplay error:", err);
                      });
                  };
            
                  const checkIfPlaying = () => {
                    const startTime = video.currentTime;
                    setTimeout(() => {
                      const isPlaying = video.currentTime > startTime;
                      console.log("[Android] isPlaying:", isPlaying);
                    }, 1500);
                  };
            
                  const unmuteBtn = document.createElement("button");
                  unmuteBtn.textContent = "🔊";
                  unmuteBtn.style.cssText = `
                    position: absolute;
                    bottom: 10%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 10px 20px;
                    font-size: 16px;
                    background: rgba(0,0,0,0.6);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    z-index: 9;
                  `;
                  document.querySelector(".video").appendChild(unmuteBtn);
            
                  unmuteBtn.addEventListener("click", () => {
                    if (hasInteracted) return;
                    hasInteracted = true;
            
                    console.log("[Android] 🔊 Clicked. Unmuting and replaying...");
                    video.muted = false;
                    video.volume = 1.0;
            
                    video.play().then(() => {
                      console.log("[Android] Replay succeeded.");
                      unmuteBtn.remove();
                    }).catch((err) => {
                      console.warn("[Android] Replay failed:", err);
                    });
                  });
            
                  tryPlay();
                }
            
                // =========================
                // 🍏 iOS
                // =========================
                function runIOSScript() {
                  let hasUnmuted = false;
            
                  const tryPlay = () => {
                    console.log("[iOS] Trying autoplay...");
                    video.play()
                      .then(() => {
                        console.log("[iOS] Autoplay started.");
                        checkIfPlaying();
                      })
                      .catch((err) => {
                        console.warn("[iOS] Autoplay error:", err);
                      });
                  };
            
                  const checkIfPlaying = () => {
                    const startTime = video.currentTime;
                    setTimeout(() => {
                      const isPlaying = video.currentTime > startTime;
                      console.log("[iOS] isPlaying:", isPlaying);
                    }, 1500);
                  };
            
                  const unlockAudio = () => {
                    if (hasUnmuted) return;
                    hasUnmuted = true;
                    console.log("[iOS] Interaction → unmuting.");
                    video.muted = false;
                    video.volume = 1.0;
                  };
            
                  ["click", "touchstart", "keydown"].forEach(event => {
                    document.addEventListener(event, unlockAudio, { once: true });
                  });
            
                  tryPlay();
                }
            
                // =========================
                // 🖥 DESKTOP
                // =========================
                function runDesktopScript() {
                  let hasUnmuted = false;
            
                  const tryPlay = () => {
                    console.log("[Desktop] Trying autoplay...");
                    video.play()
                      .then(() => {
                        console.log("[Desktop] Autoplay started.");
                        checkIfPlaying();
                      })
                      .catch((err) => {
                        console.warn("[Desktop] Autoplay error:", err);
                      });
                  };
            
                  const checkIfPlaying = () => {
                    const startTime = video.currentTime;
                    setTimeout(() => {
                      const isPlaying = video.currentTime > startTime;
                      console.log("[Desktop] isPlaying:", isPlaying);
                    }, 1500);
                  };
            
                  const unlockAudio = () => {
                    if (hasUnmuted) return;
                    hasUnmuted = true;
                    console.log("[Desktop] Interaction → unmuting.");
                    video.muted = false;
                    video.volume = 1.0;
                  };
            
                  ["click", "keydown"].forEach(event => {
                    document.addEventListener(event, unlockAudio, { once: true });
                  });
            
                  tryPlay();
                }
              });