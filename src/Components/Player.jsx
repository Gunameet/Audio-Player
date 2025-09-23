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
import { useTranslation } from "react-i18next"

function Player({
    current,
    audioRef,
    isPlaying,
    setIsPlaying,
    // isMuted,
    next,
    prev,
    handlePlay,
    handlePausePlay,
    handleReplay,
    // handleMute,
    handleRepeted,
    loop
}) {
    const { t } = useTranslation()

    return (
        <Card
            className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 shadow-md z-50"

        >
            <CardContent className="flex flex-col items-center justify-center anek-gujarati">
                <h2 className="text-lg pt-2 md:text-2xl lg:text-2xl font-semibold text-center sm:-pb-4 md:mt-2">
                    {t(current.title)}
                </h2>

                {current.url ? (
                    <audio
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
                    <p className="text-sm text-muted-foreground">{t("noAudio")}</p>
                )}

                <div className="flex flex-wrap justify-center gap-2 md:pb-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={loop ? "default" : "outline"}
                                    size="icon"
                                    onClick={handleRepeted}
                                >
                                    <Repeat className={`h-5 w-5 ${loop ? "text-green-500" : ""}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{loop ? t("RepeatOn") : t("RepeatOff")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={prev}>
                                    <SkipBack className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("previous")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handlePlay(-10)}>
                                    <StepBack className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("prev10Sec")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="default" size="icon" onClick={handlePausePlay}>
                                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isPlaying ? t("pause") : t("play")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handlePlay(10)}>
                                    <StepForward className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("next10Sec")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={next}>
                                    <SkipForward className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("next")}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={handleReplay}>
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
