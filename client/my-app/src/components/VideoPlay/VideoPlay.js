import React, { useRef, useEffect } from 'react'; // Удаляем useState, useCallback
import styles from './VideoPlay.module.css';

// Импортируем только то видео, которое нужно показывать
import mainVideo from './Video/video.mp4'; // Переименовал для ясности, чтобы не путать с другими

const VideoPlay = () => {
    // Оставляем только одну ссылку на видеоэлемент
    const videoElementRef = useRef(null);

    // Логика для цикличного переключения и индексации больше не нужна
    // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    // const playNextVideo = useCallback(() => { ... }, []);

    useEffect(() => {
        const video = videoElementRef.current;

        if (video) {
            // Пытаемся запустить видео при монтировании компонента.
            // .catch() нужен, так как браузеры могут блокировать autoplay,
            // особенно если видео не muted (хотя у нас оно muted).
            video.play().catch(error => {
                console.warn("Autoplay failed for main video:", error);
                // Здесь можно добавить логику, если автовоспроизведение не удалось,
                // например, показать кнопку "Play" пользователю.
            });

            // Для цикличного воспроизведения ОДНОГО видео достаточно атрибута loop в HTML
            // Поэтому обработчик 'ended' больше не нужен для переключения видео.
            // video.addEventListener('ended', playNextVideo);
        }

        // Если бы мы добавляли слушатели, здесь была бы их очистка.
        // Сейчас она не нужна, так как 'ended' больше не привязан.
        return () => {
            // if (video) {
            //     video.removeEventListener('ended', playNextVideo);
            // }
        };
    }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании

    return (
        <div className={styles.headerSection}>
            <div className={styles.videoBackground}>
                {/* Оставляем только один тег video */}
                <video
                    ref={videoElementRef} // Используем нашу единственную ссылку
                    id="background-video" // Упрощаем ID
                    className={styles.backgroundVideo}
                    // Удаляем логику opacity, т.к. видео всегда одно и видимо
                    // style={{ opacity: currentVideoIndex === 0 ? 1 : 0 }}
                    
                    autoPlay       // Автоматическое воспроизведение
                    loop           // <--- Ключевой атрибут для цикличного воспроизведения одного видео
                    muted          // Без звука, чтобы autoplay работал в большинстве браузеров
                    playsInline    // Воспроизведение встроенным на iOS
                    preload="auto" // Предварительная загрузка для быстрой готовности
                >
                    {/* Источник для нашего единственного видео */}
                    <source src={mainVideo} type="video/mp4" />
                    Ваш браузер не поддерживает тег video.
                </video>
            </div>

            <div className={styles.headerContent}>
                <h1>Aквацентр "Лягушонок"'</h1>
                <p>Место, где рождается любовь к воде! Обучение плаванию для детей от 3 месяцев до 8 лет, <br></br> безопасная и комфортная среда, укрепление здоровья вашего ребенка </p>
            </div>
        </div>
    );
};

export default VideoPlay; // Не забудьте экспортировать компонент
