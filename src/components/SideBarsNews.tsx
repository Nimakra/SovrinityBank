import { FunctionComponent, useMemo, type CSSProperties } from "react";

type SideBarsNewsType = {
  /** Style props */
  propTextDecoration?: CSSProperties["textDecoration"];
};

const SideBarsNews: FunctionComponent<SideBarsNewsType> = ({
  propTextDecoration,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      textDecoration: propTextDecoration,
    };
  }, [propTextDecoration]);

  return (
    <a className="[text-decoration:none] w-[410px] h-[170px] flex flex-col items-center justify-start text-left text-smi text-black1-200 font-roboto">
      <div
        className="self-stretch flex-1 flex flex-row items-start justify-start py-[25px] px-0 gap-[25px]"
        style={frameDivStyle}
      >
        <img
          className="relative w-[116px] h-[108px] object-cover"
          alt=""
          src="/image-26@2x.png"
        />
        <a className="[text-decoration:none] self-stretch flex-1 flex flex-col items-start justify-between text-[inherit]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch relative text-base leading-[130%] font-medium text-gray-200">
              Mzansi Web3 Hackathon
            </div>
            <div className="self-stretch relative font-montserrat [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              Join us, and let's build the future, together.
            </div>
            <div className="relative">Nimakra - 10 December , 2023</div>
          </div>
        </a>
      </div>
      <img
        className="self-stretch relative max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/line-1@2x.png"
      />
    </a>
  );
};

export default SideBarsNews;
