import { FunctionComponent } from "react";

const Footers: FunctionComponent = () => {
  return (
    <footer className="absolute top-[1504px] left-[0px] bg-black1-200 flex flex-row items-start justify-start py-[41px] px-[126px] gap-[108px] text-left text-xl text-gray-white font-montserrat md:flex-col">
      <div className="w-28 h-[228px] flex flex-col items-start justify-start gap-[26px]">
        <b className="relative text-5xl text-center">Learn</b>
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl font-montserrat text-gray-white text-left inline-block">
          Courses
        </button>
        <div className="relative">DeFi</div>
        <div className="relative">NFTs</div>
        <div className="relative">Blockchain</div>
      </div>
      <div className="w-[106px] h-44 flex flex-col items-start justify-start gap-[25px]">
        <b className="relative text-5xl inline-block text-center w-[70px] h-[29px] shrink-0">
          News
        </b>
        <div className="relative inline-block w-[91px] h-6 shrink-0">
          Trending
        </div>
        <div className="relative inline-block w-[106px] h-6 shrink-0">
          Hot Topics
        </div>
        <div className="relative inline-block w-[35px] h-6 shrink-0">ICP</div>
      </div>
      <div className="w-[164px] h-44 flex flex-col items-start justify-start py-0 pr-0 pl-0.5 box-border gap-[25px]">
        <b className="relative text-5xl text-center">Build</b>
        <div className="relative">DApps</div>
        <div className="relative">Smart Contracts</div>
        <div className="relative">DAOs</div>
      </div>
      <div className="relative w-[170px] h-[228px]">
        <div className="absolute top-[205px] left-[0px]">Bitcoin</div>
        <div className="absolute top-[155px] left-[0px]">Dacade</div>
        <div className="absolute top-[105px] left-[0px]">Mzansi Web3</div>
        <div className="absolute top-[55px] left-[0px]">DFinity</div>
        <b className="absolute top-[0px] left-[0px] text-5xl text-center">
          Communities
        </b>
      </div>
      <div className="relative w-[130px] h-[72px]">
        <div className="absolute top-[48px] left-[0px]">About</div>
        <b className="absolute top-[0px] left-[0px] text-5xl text-center">
          Resources
        </b>
      </div>
    </footer>
  );
};

export default Footers;
