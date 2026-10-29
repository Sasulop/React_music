import img2 from "./../../image/Union.png";
import "./Button_plat.css"
export default function Button_play({
  play_music,
  component,
  lol,
  disabled,
  clasName
}) {
  
  return (
    <>
      <button
        disabled={disabled}
        onClick={() => play_music(component?.link)}
        className={clasName}
      ><img src={lol ? "./src/image/Group 6.png" : img2} /></button>
    </>
  );
}
