import { useState, useRef, useEffect } from "react"
import { playlistTabs } from "../data/playlistData"
import Player from "../Components/Player.jsx"
import { useTranslation } from "react-i18next"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { Card, CardContent } from "@/Components/ui/card"
import { TypographyH3 } from "@/Components/ui/typography"

export default function Homepage() {
    const { t } = useTranslation()
    const [currentCategory, setCurrentCategory] = useState("DailyRituals")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [MainCategories, setMainCategories] = useState({})
    const audioRef = useRef(null)

    const categories = Object.keys(playlistTabs).filter(
        (cat) => cat !== "DailyRituals"
    )
    const currentTracks = playlistTabs[currentCategory]

    const next = () =>
        setCurrentIndex((prev) => (prev + 1) % currentTracks.length)
    const prev = () =>
        setCurrentIndex(
            (prev) => (prev - 1 + currentTracks.length) % currentTracks.length
        )

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

    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted
        setIsMuted(!isMuted)
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false))
        }
    }, [currentCategory, currentIndex])

    const TrackCard = ({ track, isActive, onClick }) => (
        <Card
            onClick={onClick}
            className={`cursor-pointer transition-all duration-200 ${isActive
                ? "border-blue-500 bg-white shadow-lg"
                : "border-gray-200 bg-gray-50"
                }`}
        >
            <CardContent className="flex items-center justify-center h-40 text-center">
                <p
                    className={`font-semibold text-lg ${isActive ? "text-blue-600" : "text-gray-800"
                        }`}
                >
                    {t(track.title)}
                </p>
            </CardContent>
        </Card>
    )

    const toggleCategory = (category) => {
        setMainCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="pt-25 text-center">
                <TypographyH3 className="text-blue-600 font-bold">
                    {t("dailyRitualsHeader")}
                </TypographyH3>
            </header>

            <main className="container mx-auto p-6 pb-44">
                {/* Daily Rituals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    {playlistTabs.DailyRituals.map((track, index) => (
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

                {/* Other Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category) => (
                        <Accordion
                            className="border border-gray-200 rounded-lg shadow-md p-4 "
                            type="single"
                            collapsible
                            key={category}
                            value={MainCategories[category] ? category : ""}
                            onValueChange={() => toggleCategory(category)}
                        >
                            <AccordionItem value={category}>
                                <AccordionTrigger className="text-lg font-semibold">
                                    {t(category)}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-3">
                                        {playlistTabs[category].map((track, index) => (
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
                                                <p className="font-medium">{t(track.title)}</p>
                                            </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </main>

            {/* Bottom Player */}
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
        </div>
    )
}
