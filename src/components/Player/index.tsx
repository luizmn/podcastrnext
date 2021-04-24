import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss"; 
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export default function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
        playNext,
        playPrevious, 
        hasNext,
        hasPrevious,
    } = usePlayer();

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]) //activate useEffect function when the value of isPlaying changes

    function setupProgressListener() {
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener('timeupdate', () =>{ 
            setProgress(Math.floor(audioRef.current.currentTime));
            });
    };

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    };

    function handleEpisodeEnded() {
        if (hasNext) {
            playNext();
        } else {
            clearPlayerState();
        }
    };

    const episode = episodeList[currentEpisodeIndex];

return (
<div className={styles.playerContainer}>
    <header>
        <img src="/playing.svg" alt="playing now" />
        <strong>
            Now playing {episode?.title} 
        </strong>
    </header>     

    { episode ? (
        <div className={styles.currentEpisode}>
            <Image 
            width={592}
            height={592}
            src={episode.thumbnail} 
            alt={episode.title} 
            objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
        </div>
    ) : (
        <div className={styles.emptyPlayer}>
            <strong>Select a podcast to listen</strong>
        </div>
    ) }

    <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            <div className={styles.slider}>
                { episode ? (
                    <Slider 
                    max={episode?.duration}
                    value={progress}
                    onChange={handleSeek}
                    trackStyle={{ backgroundColor: '#04d361'}}
                    railStyle={{ backgroundColor: '#9f75ff'}}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
                    />                    
                ) : (
                    <div className={styles.emptySlider} />
                )}
            </div>
            <span>{episode?.durationAsString ?? 0}</span>
            </div>

            {episode && (
                <audio 
                src={episode.url}
                ref={audioRef}
                loop={isLooping}
                autoPlay
                onEnded={handleEpisodeEnded}
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
                onLoadedMetadata={setupProgressListener}
                />
            ) }

            <div className={styles.buttons}>
                <button type="button"                     
                onClick={toggleShuffle} 
                className={isShuffling ? styles.isActive : ''}
                disabled={!episode || episodeList.length === 1}>
                    <img src="/shuffle.svg" alt="Shuffle songs"/>
                </button>
                <button 
                type="button" 
                onClick={playPrevious} 
                disabled={!episode || !hasPrevious}>
                    <img src="/play-previous.svg" alt="previous song" />
                </button>
                <button 
                type="button" 
                className={styles.playButton}  
                disabled={!episode}
                onClick={togglePlay}>
                    { isPlaying 
                    ? <img src="/pause.svg" alt="pause" />
                    : <img src="/play.svg" alt="play song" />}
                </button>
                <button 
                type="button" 
                onClick={playNext} 
                disabled={!episode || !hasNext}>
                    <img src="/play-next.svg" alt="next song" />
                </button>
                <button 
                type="button" 
                onClick={toggleLoop} 
                className={isLooping ? styles.isActive : ''}
                disabled={!episode}>
                    <img src="/repeat.svg" alt="repeat song" />
                </button>
            </div>
    </footer>
</div>
)
}