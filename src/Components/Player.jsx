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
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip"

function Player({
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
        <Card
            className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 shadow-md z-50"
            style={{ height: "155px" }}
        >
            <CardContent className="flex flex-col items-center justify-center">
                <h2 className="text-lg md:text-2xl lg:text-2xl font-semibold text-center sm:-pb-4 md:mt-2">
                    {current.title}
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
                    <p className="text-sm text-muted-foreground">No audio available</p>
                )}

                <div className="flex flex-wrap justify-center gap-2 md:pb-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={handleMute}>
                                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isMuted ? "Unmute" : "Mute"}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={prev}>
                                    <SkipBack className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Previous</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handlePlay(-10)}>
                                    <StepBack className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>10 sec Previous</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="default" size="icon" onClick={handlePausePlay}>
                                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isPlaying ? "Pause" : "Play"}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handlePlay(10)}>
                                    <StepForward className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>10 sec Next</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={next}>
                                    <SkipForward className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={handleReplay}>
                                    <RotateCcw className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Replay</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    )
}

export default Player
