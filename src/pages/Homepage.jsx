import { useState, useRef, useEffect } from "react";
import { Layout, Typography, Row, Col, Card, List, Breadcrumb } from "antd";
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { playlistTabs } from "../data/playlistData";
import Player from "../Components/Player.jsx";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Homepage() {
    const [currentCategory, setCurrentCategory] = useState("DailyRituals");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [MainCategories, setMainCategories] = useState({});
    const audioRef = useRef(null);

    const categories = Object.keys(playlistTabs).filter(cat => cat !== "DailyRituals");
    const currentTracks = playlistTabs[currentCategory];

    const next = () => setCurrentIndex((prev) => (prev + 1) % currentTracks.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + currentTracks.length) % currentTracks.length);

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
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }, [currentCategory, currentIndex]);

    const TrackCard = ({ track, isActive, onClick }) => (
        <Card
            hoverable
            style={{
                background: isActive ? "#fdfdfdff" : "#ffffff6b",
                border: isActive ? "2px solid #1890ff" : "1px solid #f0f0f0",
                borderRadius: 12,
                borderBottom: isActive ? "4px solid #1890ff" : "3px solid #1890ff",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 160,
                width: "100%",
                padding: 12,
                fontWeight: "bold",
                textAlign: "center",
                wordBreak: "break-word",
            }}
            onClick={onClick}
        >
            <Text style={{ fontSize: 18 }}>{track.title}</Text>
        </Card>
    );

    const toggleCategory = (category) => {
        setMainCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Title style={{ paddingTop: 62, color: "Highlight" }} level={3} className="text-center my-4 text-blue-600 font-bold">
                દૈનિક ધાર્મિક વિધિઓ | નિદીધ્યાસન | આરતી-અષ્ટક | થાળ
            </Title>

            <Content className="p-6" style={{ paddingBottom: "180px" }}>
                <Row gutter={[24, 16]} style={{ marginBottom: 40, marginLeft: 0, marginRight: 0 }}>
                    {playlistTabs.DailyRituals.map((track, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={8}>
                            <TrackCard
                                track={track}
                                isActive={currentCategory === "DailyRituals" && currentIndex === index}
                                onClick={() => {
                                    setCurrentCategory("DailyRituals");
                                    setCurrentIndex(index);
                                }}
                            />
                        </Col>
                    ))}
                </Row>

                <Row gutter={[24, 16]} style={{ marginLeft: 0, marginRight: 0 }} >
                    {categories.map((category) => (
                        <Col key={category} xs={24} sm={24} md={8} lg={8}>
                            <Card
                                onClick={() => toggleCategory(category)}
                                style={{
                                    borderRadius: 12,
                                    borderBottom: MainCategories[category] ? "4px solid #1890ff" : "3px solid #1890ff",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                    transition: "0.3s",
                                    background: MainCategories[category] ? "#f0f5ff" : "#fff",
                                }}
                                title={
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Text style={{ fontSize: 18 }} strong>{category}</Text>
                                        </div>

                                        {MainCategories[category] ? <UpOutlined /> : <DownOutlined />}
                                    </div>
                                }
                            >
                                {MainCategories[category] && (
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={playlistTabs[category]}
                                        renderItem={(cat, index) => (
                                            <List.Item
                                                onClick={() => {
                                                    setCurrentCategory(category);
                                                    setCurrentIndex(index);
                                                }}
                                                style={{
                                                    cursor: "pointer",
                                                    background:
                                                        currentCategory === category && currentIndex === index
                                                            ? "#c9ecfcff"
                                                            : "#fff",
                                                    borderRadius: 8,
                                                    marginBottom: 4,
                                                    paddingLeft: "10px",
                                                    transition: "0.3s",
                                                    height: "60px"
                                                }}
                                            >
                                                <List.Item.Meta
                                                    title={
                                                        <Text strong>
                                                            {cat.title}
                                                        </Text>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>

            {currentTracks && currentTracks[currentIndex] && (
                <Player
                    current={currentTracks[currentIndex]}
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
