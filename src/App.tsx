import { useState, useRef, useEffect } from "react";
import "./App.css";
import img1 from "./assets/Group 3.png";
import img2 from "./image/Union.png";
import Like from "./components/Like/Like";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import Player from "./components/Player/Player";
function App() {
  const [click, setClick] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [massive, setMassive] = useState([
    {
      id: "track-1",
      name: "Orda_Unbound",
      author: "TruesHeri",
      link: "/music/Orda_Unbound.mp3",
      img: "./src/image/auren-megalovania-hardtekk-slowed-low-honor-feat-vlncrsh.jpg",
      like: false,
    },
    {
      id: "track-2",
      name: "Kimo Sounds",
      author: "AbraKadabra",
      link: "/music/Kimo Sounds Rise Slow.mp3",
      img: "./src/image/kimo-sounds-rise-slow.jpg",
      like: false,
    },
    {
      id: "track-3",
      name: "NOIXES",
      author: "MONTAGEM YORU",
      link: "/music/noixes-montagem-yoru.mp3",
      img: "./src/image/image9.png",
      like: false,
    },
  ]);
  type Track = {
    id: number;
    name: string;
    author: string;
    link: string;
    img: string;
    like: boolean;
  };
  const [musicOver, setMusicOver] = useState<Track[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlayieng, SetisPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  //UseEffect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const onMeta = () => {
      setDuration(audio.duration || 0);
    };

    const onEnd = () => {
      SetisPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  function play_music(e: string) {
    let audio = audioRef.current;

    if (!audio) {
      audio = new Audio();
      audioRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio!.currentTime);
      });

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio!.duration || 0);
      });

      audio.addEventListener("ended", () => {
        SetisPlaying(false);
        setCurrentTime(0);
      });
    }

    if (playingId === e && !audio.paused) {
      audio.pause();
      SetisPlaying(false);
      return;
    }

    if (audio.src !== new URL(e, location.href).href) {
      audio.src = e;
      audio.currentTime = 0;
      setCurrentTime(0);
      setDuration(0);
    }

    setPlayingId(e);
    setMusicOver(massive.filter((event) => event.link === e));

    audio
      .play()
      .then(() => SetisPlaying(true))
      .catch((err) => {
        SetisPlaying(false);
        console.warn("play failed:", err);
      });
  }

  {
    let limitedCards = massive.slice(0, 8);
    const plays = playingId === limitedCards[0].link;
    if (click === true) {
      limitedCards = massive.slice(0, 2);
    }

    //ИИ
    function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
      const time = Number(e.target.value);

      if (audioRef.current) {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      }
    }

    function formatTime(time: number) {
      if (!Number.isFinite(time)) return "0:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }

    return (
      <>
        <Header
          img1={img1}
          play_music={play_music}
          musicOver={musicOver}
          isPlayieng={isPlayieng}
          massive={massive}
          audioRef={audioRef}
          SetisPlaying={SetisPlaying}
          setMusicOver={setMusicOver}
          setMassive={setMassive}
          click={click}
          setClick={setClick}
          img2={img2}
        />
        <main className="main-box">
          <LeftMenu />
          <div className="allMain">
            <div className="menuPlayer">
              <Player
                musicOver={musicOver}
                playingId={playingId}
                isPlayieng={isPlayieng}
                click={click}
                currentTime={currentTime}
                duration={duration}
                audioRef={audioRef}
                setCurrentTime={setCurrentTime}
                massive={massive}
                SetisPlaying={SetisPlaying}
                setMusicOver={setMusicOver}
                play_music={play_music}
              />
              <div>
                <div className={`next ${click ? "open" : "close"}`}>Далее</div>
                <div className="main_menu">
                  <Cart
                    playingId={playingId}
                    isPlayieng={isPlayieng}
                    setMusicOver={setMusicOver}
                    musicOver={musicOver}
                    massive={massive}
                    setMassive={setMassive}
                    limitedCards={limitedCards}
                    play_music={play_music}
                  />
                </div>
              </div>
            </div>
            <div className="cartDown">
              {massive?.map((even) => {
                const lol = playingId === even?.link && isPlayieng;

                return (
                  <div key={even?.id} className="cart_full">
                    <img className="cart_img_full" src={even?.img} alt="" />
                    <div className="cart_text_full">
                      <div>
                        <p className="cart_name_music_full">{even?.name}</p>
                        <p className="cart_author_full">{even?.author}</p>
                      </div>
                      <div className="likeSize">
                        <Like
                          setMusicOver={setMusicOver}
                          event={even}
                          setMassive={setMassive}
                          massive={massive}
                          musicOver={musicOver}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
