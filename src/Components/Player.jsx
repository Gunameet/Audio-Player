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
import { useEffect } from "react"
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

    return (
        <Card
            className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 shadow-md z-50"

        >
            <CardContent className="flex flex-col items-center justify-center anek-gujarati">
                <h2 className="text-lg pt-2 md:text-2xl lg:text-2xl font-semibold text-center sm:-pb-4 md:mt-2">
                    {current.title}
                </h2>

                {current.path ? (
                    <audio
                        ref={audioRef}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={next}
                        controls
                        autoPlay
                        src={`http://localhost:5000${current.path}`}
                        className="w-full max-w-md"
                    />
                ) : (
                    <p className="text-sm text-muted-foreground">{t("noAudio")}</p>
                )}

                <div className="flex flex-wrap justify-center gap-2 md:pb-2">
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
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={prev}>
                                    <SkipBack className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("previous")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => handlePlay(-10)}>
                                    <StepBack className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("prev10Sec")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="default" size="icon" onClick={handlePausePlay}>
                                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isPlaying ? t("pause") : t("play")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={() => handlePlay(10)}>
                                    <StepForward className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("next10Sec")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={next}>
                                    <SkipForward className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("next")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-blue-400 hover:bg-blue-500" variant="outline" size="icon" onClick={handleReplay}>
                                    <RotateCcw className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
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
