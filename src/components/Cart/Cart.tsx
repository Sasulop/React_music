import Like from "../Like/Like";
import Button_play from "../Button_play_cart/Button_play";
import "./Cart.css"
export default function Cart({
  massive,
  limitedCards,
  playingId,
  isPlayieng,
  setMusicOver,
  setMassive,
  musicOver,
  play_music
}) {
  return (
    <>
      {limitedCards?.map((even) => {
        const lol = playingId === even?.link && isPlayieng;

        return (
          <div key={even?.id} className="cart">
            <img className="cart_img" src={even?.img} alt="" />
            <div className="cart_text">
              <div>
                <p className="cart_name_music">{even?.name}</p>
                <p className="cart_author">{even?.author}</p>
              </div>
              <Like
                setMusicOver={setMusicOver}
                event={even}
                setMassive={setMassive}
                massive={massive}
                musicOver={musicOver}
              />
              <Button_play
                play_music={play_music}

                component={even}
                lol={lol}
                disabled=""
                clasName="button_cart"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
