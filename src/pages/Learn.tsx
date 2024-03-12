import { FunctionComponent, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FeaturedCourses from "../components/FeaturedCourses";
import CodeBlocks from "../components/CodeBlocks";

const Learn: FunctionComponent = () => {
  const [rectangleInputValue, setRectangleInputValue] = useState<string>("");
  const [currentCount, setCurrentCount] = useState<number>(0);

  useEffect(() => {
    const targetCount = 5000;
    const increment = Math.ceil(targetCount / 560); // Increment count over 560 intervals

    const interval = setInterval(() => {
      setCurrentCount((prevCount) => {
        const newCount = Math.min(prevCount + increment, targetCount);
        return newCount;
      });
    }, 1000 / 60);
    /*const interval = setInterval(() => {
      setCurrentCount((prevCount) => {
        const newCount = Math.min(prevCount + increment, targetCount);
        if (newCount === targetCount) {
          const countElement = document.querySelector(".count-animation") as HTMLElement;
          if (countElement) {
            countElement.style.animation = "blink 1s 3"; // Apply the blink animation twice, each blink lasts 1 second
          }
        }
        return newCount;
      });
    }, 1000 / 60);  */

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
        threshold: 0.75,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      clearInterval(interval);
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className="relative bg-black1-200 min-h-screen overflow-hidden text-left text-[48px] md:text-[40px] text-dimgray-200 font-montserrat ">
      {/*<div className="container"> [641px]*/}
      <div className=" mx-auto max-w-[1270px] px-8 mt-48">
        <div className="relative">
          <div className=" absolute top-0 right-0 w-1/3 md:w-[100px] md:h-[400px] ">
            <img
              className="w-full h-full object-contain [transform:scale(1.018)]"
              alt=""
              src="/image-1@2x.png"
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-2">
          <div
            className=" tracking-[0.2px] leading-[64px] md:leading-[60px] font-extrabold inline-block w-[440px] md:w-full shrink-0 [&.animate]:animate-[2.5s_ease_1s_1_normal_forwards_fade-in] opacity-[0]"
            data-animate-on-scroll
          >
            <span>{`Become a Master in Blockchain with `}</span>
            <span className="text-whitesmoke-200">OneWeb3</span>
          </div>
          <div
            className=" relative text-sm tracking-[0.2px] leading-[28px] inline-block w-[377px] md:w-full shrink-0 [&.animate]:animate-[2s_ease_2s_1_normal_forwards_fade-in] opacity-[0] text-gray-100"
            data-animate-on-scroll
          >
            <span>{`Empower yourself with Web 3 and Blockchain skills with, access to over `}</span>
            <span className="text-whitesmoke-100">200+</span>
            <span> courses from instituitions and foundations</span>
          </div>
        </div>
        <div className="mt-8 w-1/2 md:w-full flex flex-col items-center justify-center text-20 relative">
          <input
            className="border-none outline-none bg-gray-white self-stretch rounded-lg h-[52px] pl-4 pr-12 text-lg"
            placeholder="Search for course"
            type="text"
            style={{ fontSize: "18px" }}
            value={rectangleInputValue}
            onChange={(event) => setRectangleInputValue(event.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <div className="relative text-white text-2xl md:text-xl mt-16 ">
          <span style={{ fontSize: "1.2em", marginRight: "8px" }}>🎓</span>
          <span style={{ fontWeight: "bold" }}>Total Learners:</span>{" "}
          <span
            className="count-animation"
            style={{ fontSize: "1.2em", color: "#ffcc00" }}
          >
            {currentCount}+
          </span>
        </div>
        <section>
          <CodeBlocks
            position={"flex-row md:flex-col"}
            heading={
              <div className=" font-semibold">
                Write your first
                <span className="text-whitesmoke-200"> smart contract</span>
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            codeColor={"text-white"}
            codeblock={`const generateFibonacciSequence = (n: number): number[] => {\n  const sequence: number[] = [0, 1];\n  for (let i = 2; i < n; i++) {\n    sequence[i] = sequence[i - 1] + sequence[i - 2];\n  }\n  return sequence;\n};\n\nconst fibonacciSequence = generateFibonacciSequence(10);\nconsole.log("Fibonacci Sequence:", fibonacciSequence);`}
            backgroundGradient={<div className="codeblock2 absolute "></div>}
          />
        </section>
        <FeaturedCourses searchValue={rectangleInputValue} />

        <Header />
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
