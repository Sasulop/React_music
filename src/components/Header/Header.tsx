import "./Header.css";
import Button_play from "../Button_play_cart/Button_play";
import PrevButton from "../PrevButton/PrevButton";
import Like from "../Like/Like";
import Next from "../Next/Next";

export default function Header({img1,play_music,musicOver,isPlayieng,massive,audioRef,SetisPlaying,setMusicOver,setMassive,click,setClick,img2}){
    return(
    <header className="header">
              <div className="div_block_header">
                <img src={img1} />
                <p className="titleHeader">VibeMusic</p>
              </div>
    
              <div className="dev_player">
                <div className="name-and-player-position">
                  <Button_play
                    play_music={play_music}
                    component={musicOver[0]}
                    lol={isPlayieng}
                    disabled={musicOver.length == 0}
                    clasName="play"
                  />
                  <div className="name_music" key={musicOver[0]?.id ?? "empty"}>
                    {musicOver.length != 0 ? musicOver[0].name : "Добро пожаловать"}
                  </div>
                </div>
                <div className="interact">
                  <PrevButton
                    musicOver={musicOver}
                    massive={massive}
                    audioRef={audioRef}
                    SetisPlaying={SetisPlaying}
                    setMusicOver={setMusicOver}
                    play_music={play_music}
                  />
                  <Like
                    setMusicOver={setMusicOver}
                    event={musicOver[0]}
                    setMassive={setMassive}
                    massive={massive}
                    musicOver={musicOver}
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
                <button
                  disabled={musicOver.length === 0}
                  onClick={() => setClick(!click)}
                  className="button_player"
                >
                  <img src={img2} className="tr_button" />
                </button>
              </div>
            </header>
            )
}