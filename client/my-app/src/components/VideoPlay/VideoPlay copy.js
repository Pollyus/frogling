import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './VideoPlay.module.css';

// Импортируем видеофайлы. Предполагаем, что они теперь в форматах mp4 и webm.
// Если у вас только mp4, уберите импорты webm.
import video1_mp4 from './Video/1.mp4';
// import video1_webm from './Video/1.webm'; // Опционально, для лучшей кроссбраузерности
import video2_mp4 from './Video/2.mp4';
import video_mp4 from './Video/video.mp4';
// import video2_webm from './Video/2.webm'; // Опционально

const VideoPlay = () => {
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    const videoRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const playNextVideo = useCallback(() => {
        setCurrentVideoIndex(prevIndex => {
            const currentVideoEl = prevIndex === 0 ? video1Ref.current : video2Ref.current;
            const nextIndex = (prevIndex + 1) % 2;
            const nextVideoEl = nextIndex === 0 ? video1Ref.current : video2Ref.current;

            if (currentVideoEl) {
                currentVideoEl.pause();
                currentVideoEl.style.opacity = 0;
            }

            if (nextVideoEl) {
                nextVideoEl.currentTime = 0;
                nextVideoEl.play().catch(error => console.warn("Autoplay failed for next video:", error));
                nextVideoEl.style.opacity = 1;
            }

            return nextIndex;
        });
    }, []);

    useEffect(() => {
        const video1 = video1Ref.current;
        const video2 = video2Ref.current;
        const video = video2Ref.current;

        if (video1) {
            video1.addEventListener('ended', playNextVideo);
            video1.play().catch(error => console.warn("Autoplay failed for initial video 1:", error));
        }
        if (video2) {
            video2.addEventListener('ended', playNextVideo);
        }
        if (video) {
            video.addEventListener('ended', playNextVideo);
        }

        return () => {
            // if (video1) {
            //     video1.removeEventListener('ended', playNextVideo);
            // }
            // if (video2) {
            //     video2.removeEventListener('ended', playNextVideo);
            // }
            if (video) {
                video.removeEventListener('ended', playNextVideo);
            }
        };
    }, [playNextVideo]);

    return (
        <div className={styles.headerSection}>
            <div className={styles.videoBackground}>
                {/* Первое видео */}
                <video
                    ref={video1Ref}
                    id="background-video-1"
                    className={styles.backgroundVideo}
                    style={{ opacity: currentVideoIndex === 0 ? 1 : 0 }}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src={video_mp4} type="video/mp4" />
                    {/* {video1_webm && <source src={video1_webm} type="video/webm" />} Опционально */}
                    Ваш браузер не поддерживает тег video.
                </video>

                {/* Второе видео */}
                {/* <video
                    ref={video2Ref}
                    id="background-video-2"
                    className={styles.backgroundVideo}
                    style={{ opacity: currentVideoIndex === 1 ? 1 : 0 }}
                    muted
                    playsInline
                    preload="auto"
                > */}
                    {/* <source src={video2_mp4} type="video/mp4" /> */}
                    {/* {video2_webm && <source src={video2_webm} type="video/webm" />} Опционально */}
                    {/* Ваш браузер не поддерживает тег video.
                </video> */}
            </div>

            <div className={styles.headerContent}>
                <h1>Aквацентр "Лягушонок"'</h1>
                <p>Место, где рождается любовь к воде! Обучение плаванию для детей от 3 месяцев до 8 лет, <br></br> безопасная и комфортная среда, укрепление здоровья вашего ребенка </p>
            </div>
        </div>
    );
};

export default VideoPlay;
