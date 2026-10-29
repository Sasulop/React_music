import "./Like.css"


export default function Like({setMassive,massive,musicOver,event,setMusicOver}) {
    
      function likeMusik(id: number) {
        setMassive((prev) => {
          const next = prev.map((mus) =>
            mus.id === id ? { ...mus, like: !mus.like } : mus,
          );
    
          // musicOver = играющий трек из уже обновлённого next
          const currentLink = musicOver[0]?.link;
          if (currentLink) {
            setMusicOver(next.filter((e) => e.link === currentLink));
          }
    
          return next;
        });
      }
  return (
    <>
      <button
        onClick={() => likeMusik(event?.id)}
        className="like"
        aria-label="Поставить лайк"
      >
        <span className={event?.like ? "heart" : "heartblack"}></span>
      </button>
    </>
  );
}
