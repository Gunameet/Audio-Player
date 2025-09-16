import { Typography, Button, Tooltip } from "antd";
import {
    PauseOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
    ForwardOutlined,
    BackwardOutlined,
    AudioMutedOutlined,
    SoundOutlined,
    RetweetOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function Player({
    current,
    audioRef,
    isPlaying,
    setIsPlaying,
    isMuted,
    next,
    prev,
    handlePlay,
    handlePausePlay,
    handleReplay,
    handleMute,
}) {
    return (
        <div
            className="flex flex-col items-center justify-center p-4 md:p-6 bg-white shadow-md"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                height: "145px",
                width: "100%",
                zIndex: 1000,
                borderTop: "1px solid #7c7a7aff",
                backgroundColor: "#F2F4F5",
            }}
        >
            <Title level={5} className="text-center mb-2 sm:text-lg md:text-2xl lg:text-3xl">{current.title}</Title>
            {current.url ? (
                <audio
                    // style={{ marginBottom: 5, }}
                    ref={audioRef}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={next}
                    controls
                    autoPlay
                    src={current.url}
                    className="w-full max-w-md"
                />
            ) : (
                <Text type="secondary">No audio available</Text>
            )}

            <div style={{ paddingBottom: 18 }} className="flex flex-wrap justify-center gap-2 mt-3">
                <Tooltip title={isMuted ? "Mute" : "Unmute"}>
                    <Button
                        shape="circle"
                        icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
                        size="large"
                        onClick={handleMute}
                    />
                </Tooltip>
                <Tooltip title="Previous">
                    <Button shape="circle" icon={<BackwardOutlined />} size="large" onClick={prev} />
                </Tooltip>
                <Tooltip title="10 sec Previous">
                    <Button shape="circle" icon={<CaretLeftOutlined />} size="large" onClick={() => handlePlay(-10)} />
                </Tooltip>
                <Tooltip title={isPlaying ? "Pause" : "Play"}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
                        size="large"
                        onClick={handlePausePlay}
                    />
                </Tooltip>
                <Tooltip title="10 sec Next">
                    <Button shape="circle" icon={<CaretRightOutlined />} size="large" onClick={() => handlePlay(10)} />
                </Tooltip>
                <Tooltip title="Next">
                    <Button shape="circle" icon={<ForwardOutlined />} size="large" onClick={next} />
                </Tooltip>
                <Tooltip title="Replay">
                    <Button shape="circle" icon={<RetweetOutlined />} size="large" onClick={handleReplay} />
                </Tooltip>
            </div>
        </div>
    );
}
