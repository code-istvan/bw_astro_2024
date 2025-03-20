import React, { useState, useRef, useEffect } from 'react';
import './mp3player.scss';

const MP3Player = ({ url, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleError = (e) => {
      setError('Error loading audio. Please check the URL.');
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, [url]);

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
        setError('Playback error: ' + e.message);
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
    if (isNaN(time)) return '00:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mp3-player">
      <h2>{title || 'Audio Player'}</h2>

      {isLoading && <p>Loading audio...</p>}
      {error && <p className="error">{error}</p>}

      <audio ref={audioRef} src={url} preload="metadata" />

      <div className="player-controls">
        <button onClick={togglePlay} disabled={isLoading || error} className="play-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div className="time-control">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgress}
            className="progress-bar"
            disabled={isLoading || error}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="volume-control">
          <span>Volume</span>
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
