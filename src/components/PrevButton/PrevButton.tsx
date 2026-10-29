import "./PrevButton.css";
export default function PrevButton({
  musicOver,
  massive,
  audioRef,
  SetisPlaying,
  setMusicOver,
  play_music,
}) {
  function prevMusic() {
    let index = massive.findIndex((user) => user.id === musicOver[0].id);
    if (index === 0) {
      index = massive.length - 1;
    } else {
      index -= 1;
    }
    const stop = audioRef.current;
    stop?.pause();
    SetisPlaying(false);
    setMusicOver([massive[index]]);
    play_music(massive[index].link);
  }
  return (
    <>
      <button
        disabled={musicOver.length === 0}
        onClick={prevMusic}
        className="prev-btn"
      >
        <span className="palka" />
        <span className="triangle-left" />
      </button>
    </>
  );
}
