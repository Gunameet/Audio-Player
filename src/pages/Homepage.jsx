import { useState, useRef, useEffect, useCallback } from "react"
import Player from "../Components/Player.jsx"
import { useTranslation } from "react-i18next"
import axios from "axios"
// import { io } from "socket.io-client"

// Small animated equalizer bars used as a playing indicator
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { Card, CardContent } from "@/Components/ui/card"
import { TypographyH3 } from "@/Components/ui/typography"

const Equalizer = ({ className = "w-6 h-6 text-current" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <rect x="3" y="6" width="3" height="12" rx="1" className="eq-bar eq-delay-0" />
        <rect x="10.5" y="4" width="3" height="16" rx="1" className="eq-bar eq-delay-1" />
        <rect x="18" y="8" width="3" height="12" rx="1" className="eq-bar eq-delay-2" />
        <style>{`
                .eq-bar{fill:currentColor;transform-origin:center;}
                .eq-delay-0{animation:eq 900ms infinite ease-in-out;}
                .eq-delay-1{animation:eq 700ms infinite ease-in-out;}
                .eq-delay-2{animation:eq 1100ms infinite ease-in-out;}
                @keyframes eq{0%{transform:scaleY(.3)}50%{transform:scaleY(1)}100%{transform:scaleY(.3)}}
            `}</style>
    </svg>
)
export default function Homepage() {
    const { t } = useTranslation()
    const [currentCategory, setCurrentCategory] = useState("DailyRituals")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [loop, setLoop] = useState(false)
    const [playlistTabs, setPlaylistTabs] = useState({})
    const audioRef = useRef(null)
    // const socketRef = useRef(null)

    const next = useCallback(() => {
        const currentTracks = playlistTabs[currentCategory] || []
        if (currentTracks.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % currentTracks.length)
        }
    }, [playlistTabs, currentCategory])

    const prev = useCallback(() => {
        const currentTracks = playlistTabs[currentCategory] || []
        if (currentTracks.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + currentTracks.length) % currentTracks.length)
        }
    }, [playlistTabs, currentCategory])

    const handlePlay = (seconds) => {
        if (audioRef.current) {
            const newTime = audioRef.current.currentTime + seconds
            audioRef.current.currentTime = Math.min(
                Math.max(newTime, 0),
                audioRef.current.duration || 0
            )
        }
    }

    const handlePausePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play()
                setIsPlaying(true)
            } else {
                audioRef.current.pause()
                setIsPlaying(false)
            }
        }
    }

    const handleReplay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    const handleRepeted = useCallback(() => {
        setLoop((prev) => {
            const newVal = !prev
            if (audioRef.current) audioRef.current.loop = newVal
            return newVal
        })
    }, [])

    const handleMute = useCallback(() => {
        setIsMuted((prev) => {
            const newVal = !prev
            if (audioRef.current) audioRef.current.muted = newVal
            return newVal
        })
    }, [])

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/audio")
                const data = res.data && res.data.grouped ? res.data.grouped : res.data
                setPlaylistTabs(data || {})
            } catch (err) {
                console.error("Error fetching audio list:", err)
            }
        }
        fetchAudioData()
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false))
        }
    }, [currentCategory, currentIndex])

    // Only include keys whose value is an array (safeguard against non-array values)
    const categories = Object.keys(playlistTabs).filter((cat) => {
        if (cat === "DailyRituals") return false
        const val = playlistTabs[cat]
        return Array.isArray(val)
    })
    const currentTracks = playlistTabs[currentCategory] || []

    // useEffect(() => {
    //     socketRef.current = io("http://localhost:5000", { transports: ["websocket"] });

    //     socketRef.current.on("connect", () => console.log("Socket connected:", socketRef.current.id));

    //     socketRef.current.on("control", (cmd) => {
    //         if (!cmd?.action) return;
    //         const { action, value } = cmd;

    //         switch (action) {
    //             case "play": audioRef.current?.play(); setIsPlaying(true); break;
    //             case "pause": audioRef.current?.pause(); setIsPlaying(false); break;
    //             case "next": next(); break;
    //             case "prev": prev(); break;
    //             case "seek": handlePlay(Number(value) || 0); break;
    //             case "mute": handleMute(); break;
    //             case "replay": handleReplay(); break;
    //             case "toggleLoop": handleRepeted(); break;
    //             case "setIndex": if (typeof value === "number") setCurrentIndex(value); break;
    //             case "setCategory": if (typeof value === "string") setCurrentCategory(value); break;
    //             default: console.warn("Unknown control action:", action);
    //         }
    //     });

    //     return () => {
    //         socketRef.current?.disconnect();
    //     };
    // }, [next, prev, handleMute, handleRepeted]);


    const TrackCard = ({ track, isActive, onClick }) => (
        <Card
            onClick={onClick}
            className={`cursor-pointer transition-all duration-200 ${isActive
                ? "border-blue-500 bg-white shadow-lg"
                : "border-gray-200 bg-gray-50"
                }`}
        >
            <CardContent className="flex items-center justify-center h-40 text-center">
                <div className="flex items-center gap-3">
                    {isActive && isPlaying && (
                        <Equalizer className="w-6 h-6 text-blue-600" />
                    )}
                    <p
                        className={`font-semibold text-lg ${isActive ? "text-blue-600" : "text-gray-800"
                            }`}
                    >
                        {track.title}
                    </p>
                </div>
            </CardContent>
        </Card>
    )

    // const toggleCategory = (category) => {
    //     setMainCategories((prev) => ({
    //         ...prev,
    //         [category]: !prev[category],
    //     }))
    // }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="pt-25 text-center">
                <TypographyH3 className="text-blue-600 anek-gujarati">
                    {t("dailyRitualsHeader")}
                </TypographyH3>
            </header>

            <main className="container mx-auto p-6 pb-44">
                {/* Daily Rituals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 anek-gujarati">
                    {(playlistTabs.DailyRituals || []).map((track, index) => (
                        <TrackCard
                            key={index}
                            track={track}
                            isActive={currentCategory === "DailyRituals" && currentIndex === index}
                            onClick={() => {
                                setCurrentCategory("DailyRituals")
                                setCurrentIndex(index)
                            }}
                        />
                    ))}
                </div>

                {/* Categories */}
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {categories.map((category) => (
                        <AccordionItem
                            className="border border-gray-200 rounded-lg shadow-md p-4"
                            key={category}
                            value={category}
                        >
                            <AccordionTrigger className="text-lg font-semibold text-gray-700 anek-gujarati">
                                {category}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-3">
                                    {(playlistTabs[category] || []).map((track, index) => (
                                        <Card
                                            key={index}
                                            onClick={() => {
                                                setCurrentCategory(category)
                                                setCurrentIndex(index)
                                            }}
                                            className={`cursor-pointer px-4 py-3 transition-all ${currentCategory === category && currentIndex === index
                                                ? "bg-blue-100 border-blue-400"
                                                : "bg-white "
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {currentCategory === category && currentIndex === index && isPlaying && (
                                                    <Equalizer className="w-5 h-5 text-blue-600" />
                                                )}
                                                <p className=" anek-gujarati">{track.title}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </main>

            {/* Bottom Player */}
            {currentTracks && currentTracks[currentIndex] && (
                <Player
                    current={currentTracks[currentIndex]}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isMuted={isMuted}
                    next={next}
                    prev={prev}
                    handlePlay={handlePlay}
                    handlePausePlay={handlePausePlay}
                    handleReplay={handleReplay}
                    handleMute={handleMute}
                    handleRepeted={handleRepeted}
                    loop={loop}
                />
            )}
        </div>
    )
}
