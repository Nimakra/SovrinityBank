import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footers from "../components/Footers";
import Header from "../components/Header";
import LearnICPContainer from "../components/LearnICPContainer";


const OneWeb3Main: FunctionComponent = () => {


  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div
      className="relative bg-black1-200 w-full h-[1862px] overflow-hidden cursor-pointer text-left text-13xl text-gray-white font-montserrat md:flex"
    >
      <img
        className="absolute top-[48px] left-[1px] w-[294px] h-[452px] overflow-hidden object-cover"
        alt=""
        src="/frame@2x.png"
      />
      <div className="absolute top-[267px] left-[70px] flex flex-col items-start justify-center py-0 px-[0.0000152587890625px] text-35xl-1">
        <div className="w-[603px] h-[168px] flex flex-col items-start justify-start">
          <div className="relative leading-[90%] uppercase font-extrabold inline-block w-[571px]">
            DISCOVER THE WORLD OF WEB3!
          </div>
        </div>
      </div>
      <div
        className="absolute top-[514px] left-[134px] w-[395px] overflow-hidden flex flex-col items-end justify-center py-0 px-[0.0000152587890625px] box-border [&.animate]:animate-[2.7s_ease_1s_1_normal_forwards_fade-in] opacity-[0]"
        data-animate-on-scroll
      >
        <b className="relative">
          <p className="m-0">Our Goal is to empower</p>
          <p className="m-0"> your journey towards</p>
          <p className="m-0"> decentralization</p>
        </b>
      </div>
      <div className="absolute top-[728px] left-[0px] overflow-hidden flex flex-col items-end justify-start">
        <img
          className="relative w-[590px] h-[571px] object-cover"
          alt=""
          src="/image-2@2x.png"
        />
      </div>
      <div
        className="absolute top-[1103px] left-[690px] [&.animate]:animate-[3s_ease_1s_1_normal_forwards_fade-in] opacity-[0]"
        data-animate-on-scroll
      >
        <p className="m-0">
          <b>Your activity and identity is</b>
        </p>
        <p className="m-0">
          <b>{`completely anonymous and `}</b>
        </p>
        <p className="m-0">
          <b>{`fully secured on chain using `}</b>
        </p>
        <p className="m-0">
          <b>the Internet Computer Protocol.</b>
        </p>
        <p className="mt-2 text-base">
          If you want to learn more about the Internet Computer Protocol, <br /> click here
        </p>
      </div>
      <Footers />
      < Header/>
      <LearnICPContainer />
    </div>
  );
};

export default OneWeb3Main;
