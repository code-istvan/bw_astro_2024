import React, { useState, useRef, useEffect } from 'react';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import VolumeIcon from './VolumeIcon';
import './_mp3player.scss';

// Nyelvi beállítások
const translations = {
  EN: {
    play: 'Play',
    pause: 'Pause',
    volume: 'Volume',
    loading: 'Loading audio...',
    error: 'Error loading audio. Please check the URL.',
    playbackError: 'Playback error: ',
  },
  HU: {
    play: 'Lejátszás',
    pause: 'Szünet',
    volume: 'Hangerő',
    loading: 'Betöltés...',
    error: 'Hiba a hang betöltésekor. Kérjük ellenőrizze az URL-t.',
    playbackError: 'Lejátszási hiba: ',
  },
};

const MP3Player = ({ url, language = 'EN' }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nyelvi beállítások kiválasztása
  const t = translations[language] || translations.EN;

  useEffect(() => {
    const audio = audioRef.current;
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleError = (e) => {
      setError(t.error);
      setIsLoading(false);
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, [url, t.error]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setError(null);
  }, [url]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => {
        setError(t.playbackError + e.message);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mp3-player">
      {isLoading && <p className="loading-message">{t.loading}</p>}
      {error && <p className="error-message">{error}</p>}
      <audio ref={audioRef} src={url} preload="metadata" />

      <div className="player-container">
        <button
          onClick={togglePlay}
          disabled={isLoading || error}
          className="play-button"
          aria-label={isPlaying ? t.pause : t.play}
        >
          {isPlaying ? <PauseButton /> : <PlayButton />}
        </button>

        <div className="progress-container">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgress}
            className="mp3-progress-bar"
            disabled={isLoading || error}
          />
        </div>
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <button className="volume-button" aria-label={t.volume}>
          <VolumeIcon />
        </button>

        <div className="volume-slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            disabled={isLoading || error}
          />
        </div>
      </div>
    </div>
  );
};

export default MP3Player;
