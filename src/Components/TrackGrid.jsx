import { Row, Col, Card, Typography } from "antd";
const { Text } = Typography;

export default function TrackGrid({ tracks, currentIndex, setCurrentIndex }) {

    // Single TrackCard component inside TrackGrid
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
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                wordBreak: "break-word",
            }}
            onClick={onClick}
        >
            <Text>{track.title}</Text>
            <Text type="secondary" style={{ display: "block", marginTop: 4, fontSize: "16px" }}>
                {track.description}
            </Text>
        </Card>

    );

    return (
        <Row gutter={[24, 16]} style={{ marginLeft: 0, marginRight: 0 }}>
            {tracks.map((track, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} >
                    <TrackCard
                        track={track}
                        isActive={currentIndex === index}
                        onClick={() => setCurrentIndex(index)}
                    />
                </Col>
            ))}
        </Row>
    );
}
