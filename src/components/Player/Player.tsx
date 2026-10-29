import CircularProgress from "../Cirkl/CircularProgress";
import PrevButton from "../PrevButton/PrevButton";
import Button_play from "../Button_play_cart/Button_play";
import Next from "../Next/Next";
import"./Player.css"
export default function Player({musicOver,playingId,isPlayieng,click,currentTime,duration,audioRef,setCurrentTime,massive,SetisPlaying,setMusicOver,play_music}){
    return(
        <>
        <div className="position_normal">
                {musicOver.map((event) => {
                  const lol = playingId === event.link && isPlayieng;
                  return (
                    <div
                      key={event.id}
                      className={`context_menu ${click ? "open" : "close"}`}
                    >
                      <div className="audio-player">
                        <CircularProgress
                          currentTime={currentTime}
                          duration={duration}
                          image={event.img}
                          onSeek={(time) => {
                            if (audioRef.current) {
                              audioRef.current.currentTime = time;
                              setCurrentTime(time);
                            }
                          }}
                        />
                      </div>
                      <div
                        key={musicOver[0]?.id ?? "empty"}
                        className="playerNameAuthor"
                      >
                        <div className="playerName">{event.name}</div>
                        <div className="playerAuthor">{event.author}</div>
                        <div className="positionMenu">
                          <PrevButton
                            musicOver={musicOver}
                            massive={massive}
                            audioRef={audioRef}
                            SetisPlaying={SetisPlaying}
                            setMusicOver={setMusicOver}
                            play_music={play_music}
                          />
                          <Button_play
                            play_music={play_music}
                            component={musicOver[0]}
                            lol={isPlayieng}
                            disabled={musicOver.length == 0}
                            clasName="play"
                          />
                          <Next
                            musicOver={musicOver}
                            massive={massive}
                            audioRef={audioRef}
                            SetisPlaying={SetisPlaying}
                            setMusicOver={setMusicOver}
                            play_music={play_music}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
        </>
    )
}