import "./Next.css"
export default function Next({musicOver,massive,audioRef,SetisPlaying,setMusicOver,play_music}){
    function nextMusic() {
      let index = massive.findIndex((user) => user.id === musicOver[0].id);
      if (index === massive.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      const stop = audioRef.current;
      stop?.pause();
      SetisPlaying(false);
      setMusicOver([massive[index]]);
      play_music(massive[index].link);
    }
    return(
        <>
        <button
                disabled={musicOver.length === 0}
                onClick={nextMusic}
                className="prev-btn"
              >
                <span className="palka-right" />
                <span className="triangle-right" />
              </button>
        </>
    )
}