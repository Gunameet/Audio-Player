import { useState, useRef, useEffect } from "react";
import { Layout, Typography } from "antd";
import { playlistTabs } from "../data/playlistData";
import TrackGrid from "../Components/TrackGrid.jsx";
import Player from "../Components/Player.jsx";

const { Content } = Layout;
const { Title } = Typography;

export default function Homepage() {
    const aartiTracks = playlistTabs.DailyRituals;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const current = currentIndex !== null ? aartiTracks[currentIndex] : null;

    const next = () => setCurrentIndex((prev) => (prev + 1) % aartiTracks.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + aartiTracks.length) % aartiTracks.length);

    const handlePlay = (seconds) => {
        if (audioRef.current) {
            const newTime = audioRef.current.currentTime + seconds;
            audioRef.current.currentTime = Math.min(Math.max(newTime, 0), audioRef.current.duration || 0);
        }
    };

    const handlePausePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleReplay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        if (audioRef.current) audioRef.current.play().catch(() => setIsPlaying(false));
    }, []);

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Title style={{ paddingTop: 62 }} level={3} className="text-center my-4 text-blue-600 font-bold">
                Daily Rituals | Nididhyasan | Arti-Ashtak | Thal
            </Title>

            <Content className="p-6" style={{ paddingBottom: "180px" }}>
                <TrackGrid tracks={aartiTracks} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
            </Content>

            {current && (
                <Player
                    current={current}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    isMuted={isMuted}
                    next={next}
                    prev={prev}
                    handlePlay={handlePlay}
                    handlePausePlay={handlePausePlay}
                    handleReplay={handleReplay}
                    handleMute={handleMute}
                />
            )}
        </Layout>
    );
}
