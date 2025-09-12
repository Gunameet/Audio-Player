// import { useEffect, useRef, useState } from "react";
// import { Layout, Button, Typography, Row, Col, Card, Tooltip } from "antd";
// import {
//   PauseOutlined,
//   CaretRightOutlined,
//   CaretLeftOutlined,
//   ForwardOutlined,
//   BackwardOutlined,
//   SyncOutlined,
//   AudioMutedOutlined,
//   SoundOutlined,
//   RetweetOutlined
// } from "@ant-design/icons";

// import { playlistTabs } from "../data/playlistData";

// const { Content, Footer } = Layout;
// const { Text } = Typography;

// const tabList = [
//   { key: 'namavali', tab: 'Shri Sahajanand Namavali Path' },
//   { key: 'kirtans', tab: 'Kirtans' },
//   // { key: 'instrumentals', tab: 'Instrumentals' }
// ];

// export default function Playlist({ onLogout }) {
//   const [activeTabKey, setActiveTabKey] = useState('namavali');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   const currentTabTracks = playlistTabs[activeTabKey];
//   const current =
//     currentTabTracks && currentTabTracks.length > 0 && currentTabTracks[currentIndex]
//       ? currentTabTracks[currentIndex]
//       : { title: "No track available", url: "" };

//   const next = () => setCurrentIndex((prev) => (prev + 1) % currentTabTracks.length);
//   const prev = () => setCurrentIndex((prev) => (prev - 1 + currentTabTracks.length) % currentTabTracks.length);

//   const handlePlay = (seconds) => {
//     if (audioRef.current) {
//       const newTime = audioRef.current.currentTime + seconds;
//       audioRef.current.currentTime = Math.min(Math.max(newTime, 0), audioRef.current.duration || 0);
//     }
//   };

//   const handlePausePlay = () => {
//     if (audioRef.current) {
//       if (audioRef.current.paused) {
//         audioRef.current.play();
//         setIsPlaying(true);
//       } else {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   const handleReplay = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = 0;
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   }

//   const handleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//     }
//     setIsMuted(!isMuted);
//   };

//   // const handleLogout = () => {
//   //   localStorage.removeItem("auth");
//   //   onLogout();
//   // }

//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [activeTabKey]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) setIsPlaying(!audio.paused);
//   }, [currentIndex, activeTabKey]);

//   const tabContent = (
//     <Row gutter={[24, 16]}>
//       {currentTabTracks.map((track, index) => (
//         <Col xs={24} sm={12} md={6} lg={8} key={track.title}>
//           <Card
//             hoverable
//             onClick={() => setCurrentIndex(index)}
//             style={{
//               overflow: 'hidden',
//               background: index === currentIndex ? '#d6f1ff' : '#ffffff',
//               border: index === currentIndex ? "2px solid #1890ff" : "1px solid #f0f0f0",
//               borderRadius: 12,
//               borderBottom: index === currentIndex ? "4px solid #1890ff" : "3px solid #1890ff",
//               transition: "all 0.3s ease",
//               cursor: "pointer",
//               height: 140,
//               width: '100%',
//               fontSize: 12,
//               maxWidth: "100%",
//               boxShadow: index === currentIndex
//                 ? '0 4px 12px rgba(24, 144, 255, 0.2)'
//                 : '0 2px 6px rgba(0,0,0,0.08)',
//             }}
//           >
//             <Text>{track.title}</Text>
//             {/* <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
//               {track.description}
//             </Text> */}
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );

//   return (
//     <Layout >
//       <Card
//         style={{ width: '100%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', backgroundColor: '#f0f8ff' }}
//         tabList={tabList}
//         // title="Shri Sahajanand Namavali Path | Kirtans | Instrumentals"
//         activeTabKey={activeTabKey}
//         onTabChange={setActiveTabKey}
//         overflowedIndicator={null}
//       >
//         {tabContent}
//       </Card>
//       <Content className="flex flex-col items-center justify-center p-4 md:p-6 bg-white">
//         <Typography.Title level={4} className="text-center">
//           {current.title}
//         </Typography.Title>
//         {/* {current.description && <Text type="secondary">{current.description}</Text>} */}
//         {current.url ? (
//           <audio
//             ref={audioRef}
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//             onEnded={next}
//             controls
//             autoPlay
//             src={current.url}
//             className="w-full max-w-md mt-2"
//           />
//         ) : (
//           <Text type="secondary">No audio available</Text>
//         )}
//         <div style={{ marginBottom: 10 }} className="music-controls flex items-center gap-2 mt-3 px-2 overflow-x-auto">
//           <Tooltip title={isMuted ? "Mute" : "Unmute"}>
//             <Button shape="circle" icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />} size="large" onClick={handleMute} />
//           </Tooltip>
//           <Tooltip title="Previous">
//             <Button shape="circle" icon={<BackwardOutlined />} size="large" onClick={prev} />
//           </Tooltip>
//           <Tooltip title=" 10- sec Previous">
//             <Button shape="circle" icon={<CaretLeftOutlined />} size="large" onClick={() => handlePlay(-10)} />
//           </Tooltip>
//           <Tooltip title={isPlaying ? "Pause" : "Play"}>
//             <Button type="primary" shape="circle" icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} size="large" onClick={handlePausePlay} />
//           </Tooltip>
//           <Tooltip title=" 10+ sec Next" >
//             <Button shape="circle" icon={<CaretRightOutlined />} size="large" onClick={() => handlePlay(10)} />
//           </Tooltip>
//           <Tooltip title="Next">
//             <Button shape="circle" icon={<ForwardOutlined />} size="large" onClick={next} />
//           </Tooltip>
//           <Tooltip title="Replay">
//             <Button shape="circle" className="ml-4" icon={<RetweetOutlined />} size="large" onClick={handleReplay} />
//           </Tooltip>
//         </div>
//       </Content>
//       {/* <Footer className="text-center bg-gray-50">© 2025 Kirtan Playlist</Footer> */}
//     </Layout>
//   );
// }
