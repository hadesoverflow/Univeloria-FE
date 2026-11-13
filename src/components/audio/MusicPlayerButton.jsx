import React, { useState, useRef, useEffect } from 'react';

export function MusicPlayerButton() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const userMutedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  const audioSrc = encodeURI('/audio/Relax with my cat.mp3');

  // Autoplay on web entry
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    const startPlaying = () => {
      if (userMutedRef.current) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy delays cold autoplay, unlock on the first user interaction anywhere
          const unlockAudio = () => {
            if (userMutedRef.current) return;
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {});
          };

          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
          window.addEventListener('pointerdown', unlockAudio, { once: true });
          window.addEventListener('keydown', unlockAudio, { once: true });
        });
    };

    startPlaying();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      userMutedRef.current = true;
    } else {
      userMutedRef.current = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback prevented or paused:', err);
        });
    }
  };

  const handleAudioEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      className="music-player-btn-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onEnded={handleAudioEnded}
      />

      {/* Floating Tooltip Pill */}
      {isHovered && (
        <div className={`music-player-tooltip ${isPlaying ? 'playing' : 'paused'}`}>
          <span className="tooltip-note">🎵</span>
          <span>{isPlaying ? 'Tắt nhạc: Relax with my cat' : 'Bật nhạc: Relax with my cat'}</span>
          <div className="tooltip-arrow" />
        </div>
      )}

      {/* Circular Button */}
      <button
        type="button"
        className={`music-circle-btn ${isPlaying ? 'state-playing' : 'state-paused'}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Phát nhạc nền'}
        title={isPlaying ? 'Tắt nhạc' : 'Phát nhạc'}
      >
        <div className="music-wave-bars" aria-hidden="true">
          <span className="music-wave-bar bar-1" />
          <span className="music-wave-bar bar-2" />
          <span className="music-wave-bar bar-3" />
          <span className="music-wave-bar bar-4" />
        </div>
      </button>
    </div>
  );
}
