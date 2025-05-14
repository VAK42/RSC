import { useEffect, useState } from "react";

export default function IMG_Slide() {
  const IMG = ["/app/IMG/RSC.png"];
  const [IMGIndex, setIMGIndex] = useState(0);

  const changeIMG = () => {
    if (IMGIndex === IMG.length - 1) {
      setIMGIndex(0);
    } else {
      setIMGIndex(IMGIndex + 1);
    }
  };

  useEffect(() => {
    const resetInterval = setInterval(changeIMG, 3000);
    return () => clearInterval(resetInterval);
  }, [IMGIndex]);

  const LB = () => {
    let newIndex = IMGIndex - 1;
    if (newIndex < 0) {
      newIndex = IMG.length - 1;
    }
    setIMGIndex(newIndex);
  };

  const RB = () => {
    if (IMGIndex === IMG.length) {
      setIMGIndex(0);
    }
    changeIMG();
  };
  return (
    <>
      <div className="h-[100vh] relative overflow-hidden">
        <img
          src={IMG[IMGIndex]}
          alt={IMG[IMGIndex]}
          className="transform translate-z-10000 anmt8"
        ></img>
        <div className="m-img__text text-zinc-900 text-[3.72vw] leading-none bg-[rgba(255,255,255,0.4)] absolute top-1/2 left-1/4 anmt2">
          Welcome To Ryan Sport Club
        </div>
        <div className="w-full h-full flex absolute top-0 left-0 z-2">
          <div className="max-w-[10%] flex-[0_0_10%] h-full flex justify-center items-center">
            <button
              className="w-[3vw] h-[3vw] text-white bg-emerald-950 border-2 border-solid border-emerald-950 rounded-full z-0 hover:text-emerald-950 hover:bg-white hover:cursor-pointer show"
              onClick={LB}
            >
              <i className="fa-solid fa-arrow-left" />
            </button>
          </div>
          <div className="max-w-[80%] flex-[0_0_80%] h-full flex justify-center items-center" />
          <div className="max-w-[10%] flex-[0_0_10%] h-full flex justify-center items-center">
            <button
              className="w-[3vw] h-[3vw] text-white bg-emerald-950 border-2 border-solid border-emerald-950 rounded-full z-0 hover:text-emerald-950 hover:bg-white hover:cursor-pointer show"
              onClick={RB}
            >
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}