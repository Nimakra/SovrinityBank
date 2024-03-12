import { FunctionComponent } from "react";
import {Link} from "react-router-dom";

const LearnICPContainer: FunctionComponent = () => {
  return (
    <div className="absolute top-[623px] left-[616px] flex flex-row items-start justify-center text-left text-base text-gray-white font-montserrat lg:flex lg:w-auto lg:[align-self:unset] lg:flex-row">
      <img
        className="max-h-full w-[716px] overflow-hidden shrink-0 object-cover md:w-[716px]"
        alt=""
        src="/frame1@2x.png"
      />
      <div className="w-[343px] h-[282px] overflow-hidden shrink-0 flex flex-col items-center justify-end ml-[-375px]">
        <div className="w-[343px] h-[177px] flex flex-col items-start justify-end">
          <div className="w-[343px] overflow-hidden flex flex-col items-start justify-center py-0 px-[0.00006103515625px] box-border">
            <div className="relative inline-block w-[343px] h-[177px] shrink-0">
              Are you interested in blockchain and web3 but not sure where to
              start? Don’t worry, we have created a simple platform for you to
              get started. You can begin by learning what Blockchan and Web 3
              is
            </div>
          </div>
          <div className="w-[207px] overflow-hidden flex flex-row items-center justify-end mt-[-61px]">
            <div className="w-[108px] overflow-hidden shrink-0 flex flex-col items-end justify-center">
            <Link to="/learn" className="no-underline">
              <button className="cursor-pointer [border:none] p-5 bg-dimgray-100 rounded-31xl w-[106px] h-[31px] flex flex-row items-center justify-center box-border">
                <div className="relative text-lg font-raleway text-gray-white text-left">
                  Learn
                </div>
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnICPContainer;
