import React, {FunctionComponent, ReactNode } from "react";
import { TypeAnimation } from "react-type-animation";
import {Link} from "react-router-dom";

type CodeBlocksProps = {
    position: string;
    heading: ReactNode;
    subheading: ReactNode;
    codeblock: string;
    backgroundGradient: ReactNode;
    codeColor: string;
  };

  const CodeBlocks: FunctionComponent<CodeBlocksProps> = ({
  position,
  heading,
  subheading,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  const lines = codeblock.split('\n');
  return (
    <div className={` flex ${position} mt-20 md:mt-10  justify-between  items-center lg:gap-10 gap-14 py-4 w-full `}>
      {/* Section 1  where we should implement the desired code**/}
      
      {/* Section 2 */}
      <div className="code-border h-auto flex flex-row py-3 text-[14px] sm:text-sm sm:leading-6 relative w-3/5 lg:w-[470px] md:w-full">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center flex flex-col w-10 select-none text-richblack-400 font-inter font-bold  ">
          {[...Array(lines.length)].map((_, index) => (
            <p key={index} className="m-0 p-0 leading-6">{index + 1}</p>
          ))}
        </div>

        {/* Codes */}
        <div className={`w-90 m-0 p-0 leading-6 flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
      <div className=" w-3/5 lg:w-2/5 md:w-full flex flex-col gap-4 items-left ">
        <div className=" font-bold text-center md:text-xl  text-white">{heading}</div>
        <div className=" text-sm text-center  text-gray-300">{subheading}</div>
        <div className="add-courses-button flex justify-center items-center">
          <Link to="/add-courses">
            <button className="cursor-pointer [border:none]  px-4 py-2 p-4 rounded-lg bg-blue-600 hover:bg-blue-700 ">
                <div className=" text-lg font-raleway font-semibold text-white text-left">
                      Get Started
                </div>
            </button>
          </Link>      
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
