import {
    Play,
    Pause,
    VolumeX,
    Volume2,
    SkipBack,
    SkipForward,
    RotateCcw,
    StepBack,
    StepForward,
    Repeat,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

function Player({
    current,
    audioRef,
    isPlaying,
    setIsPlaying,
    next,
    prev,
    handlePlay,
    handlePausePlay,
    handleReplay,
    handleMute,
    handleRepeted,
    loop,
}) {
    const { t } = useTranslation()
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [muted, setMuted] = useState(false)

    // Helpers to operate on the audio element safely
    const safePlay = () => { try { audioRef.current?.play(); } catch (e) { console.debug('audio play failed', e) } }
    const safePause = () => { try { audioRef.current?.pause(); } catch (e) { console.debug('audio pause failed', e) } }
    const seekBy = (seconds) => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Math.min(Math.max(0, audioRef.current.currentTime + seconds), audioRef.current.duration || 0)
        setCurrentTime(audioRef.current.currentTime)
    }

    useEffect(() => {
        const onKey = (e) => {
            // Ignore if user is typing in an input or textarea
            const target = e.target || e.srcElement
            const tag = target.tagName
            if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return

            // Spacebar -> play/pause
            if (e.code === "Space") {
                e.preventDefault()
                handlePausePlay && handlePausePlay()
                return
            }

            // M -> mute/unmute
            if (e.key === "m" || e.key === "M") {
                handleMute && handleMute()
                return
            }

            // Arrow keys for skip
            if (e.code === "ArrowRight") {
                // skip forward 10s
                handlePlay && handlePlay(10)
                return
            }
            if (e.code === "ArrowLeft") {
                // skip back 10s
                handlePlay && handlePlay(-10)
                return
            }

            // n -> next, p -> previous
            if (e.key === "n" || e.key === "N") {
                next && next()
                return
            }
            if (e.key === "p" || e.key === "P") {
                prev && prev()
                return
            }

            // r -> toggle repeat, 0 -> replay
            if (e.key === "r" || e.key === "R") {
                handleRepeted && handleRepeted()
                return
            }
            if (e.key === "0") {
                handleReplay && handleReplay()
                return
            }
        }

        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [handlePausePlay, handleMute, handlePlay, next, prev, handleRepeted, handleReplay])

    // Wire audio events
    useEffect(() => {
        const el = audioRef?.current
        if (!el) return

        const onTime = () => setCurrentTime(el.currentTime || 0)
        const onDur = () => setDuration(el.duration || 0)

        el.addEventListener("timeupdate", onTime)
        el.addEventListener("loadedmetadata", onDur)
        el.addEventListener("durationchange", onDur)

        return () => {
            el.removeEventListener("timeupdate", onTime)
            el.removeEventListener("loadedmetadata", onDur)
            el.removeEventListener("durationchange", onDur)
        }
    }, [audioRef])

    return (
        <Card
            className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 shadow-md z-50 safe-area-bottom"
        >
            <CardContent className="flex flex-col items-center justify-center anek-gujarati px-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
                <h2 className="text-lg pt-2 md:text-2xl lg:text-2xl font-semibold text-center sm:-pb-4 md:mt-2">
                    {current.title}
                </h2>

                {current.path ? (
                    <div className="w-full max-w-md pb-3">
                        <audio
                            ref={audioRef}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={next}
                            autoPlay
                            src={`http://localhost:5000${current.path}`}
                            className="w-full hidden"
                        />

                        {/* Progress bar */}
                        <div className="w-full px-2">
                            <div className="flex items-center gap-2">
                                <div className="text-xs text-muted-foreground">{new Date(currentTime * 1000).toISOString().substr(14, 5)}</div>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    value={Math.min(currentTime, duration || 0)}
                                    onChange={(e) => {
                                        const val = Number(e.target.value)
                                        if (audioRef.current) audioRef.current.currentTime = val
                                        setCurrentTime(val)
                                    }}
                                    className="flex-1"
                                />
                                <div className="text-xs text-muted-foreground">{duration ? new Date(duration * 1000).toISOString().substr(14, 5) : "00:00"}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">{t("noAudio")}</p>
                )}

                <div className="flex flex-wrap justify-center gap-2 md:pb-2 w-full max-w-lg">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="bg-blue-400 hover:bg-blue-500"
                                    variant={loop ? "default" : "outline"}
                                    size="icon"
                                    onClick={handleRepeted}
                                >
                                    <Repeat className={`h-5 w-5 ${loop ? "text-black-900" : ""}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{loop ? t("RepeatOn") : t("RepeatOff")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => { prev && prev(); }}>
                                    <SkipBack className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("previous")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => seekBy(-10)}>
                                    <StepBack className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("prev10Sec")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="default" size="icon" onClick={() => { if (audioRef.current) { if (audioRef.current.paused) { safePlay(); } else { safePause(); } } }}>
                                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isPlaying ? t("pause") : t("play")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => seekBy(10)}>
                                    <StepForward className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("next10Sec")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => { next && next(); }}>
                                    <SkipForward className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("next")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); } }}>
                                    <RotateCcw className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>

                            {/* Mute/Unmute */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => { if (!audioRef.current) return; audioRef.current.muted = !audioRef.current.muted; setMuted(audioRef.current.muted); }}>
                                        {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{muted ? t("unmute") : t("mute")}</p>
                                </TooltipContent>
                            </Tooltip>
                            <TooltipContent>
                                <p>{t("replay")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    )
}

export default Player
