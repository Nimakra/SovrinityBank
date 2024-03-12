import { FunctionComponent, useState, useEffect } from "react";
import { useAuth } from "../components/hooks/ContextWrapper";
import AllBlogs from "../components/AllBlogs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Blogs = () => {
  const { backendActor } = useAuth();
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getAllBlogs();
  }, [blogs]);

  const getAllBlogs = async () => {
    try {
      const blogs = await backendActor.getAllBlogs();
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="relative bg-black1-200 min-h-screen overflow-hidden text-left  text-dimgray-200 font-montserrat ">
      <div className=" mx-auto max-w-[1270px] px-8 mt-48">
        <div className="page-hero-content mx-auto max-w-[768px] text-center font-montserrat">
          <h1 className="mb-5 mt-8 text-white text-[48px]">
            Insight and advice from <br />
            our expert team
          </h1>
        </div>
        <section className="section pt-0 py-16">
          <div className="container">
            <div className="category-filter mb-10 mt-3 rounded-2xl px-4 no-underline ">
              <ul className="filter-list " style={{ listStyleType: "none" }}>
                <li>
                  <a className="filter-btn filter-btn-active" href="#">
                    All Categories
                  </a>
                </li>
                <li>
                  <a className="filter-btn" href="#">
                    Internet Computer
                  </a>
                </li>
                <li>
                  <a className="filter-btn " href="#">
                    Bitcoin
                  </a>
                </li>
                <li>
                  <a className="filter-btn" href="#">
                    Etherium
                  </a>
                </li>
                <li>
                  <a className="filter-btn" href="#">
                    Smart Contracts
                  </a>
                </li>
                <li>
                  <a className="filter-btn" href="#">
                    Trending 🔥
                  </a>
                </li>
                <li>
                  <a className="filter-btn" href="#">
                    New
                  </a>
                </li>
              </ul>
            </div>
            <div className= "mx-auto max-w-[1160px]">
            <h2 className="mb-4">Featured Posts</h2>

            {/*<div className="grid grid-cols-3 gap-3">
              <div className="mb-8">
                 <div className="card">
                  <img
                    className="card-img"
                    width="335"
                    height="210"
                    src="/post-11.png"
                    alt=""
                  />
                  <div className="card-content no-underline text-black1-100">
                    {/*<div className="card-tags">
                      <a className="tag text-black1-100" href="#">
                        Development
                      </a>
                      </div> *
                    <h3 className="card-title">
                      <a href="blog-single.html" className="text-black1-100">
                        Blocks and Chains - Getting To Know Blockchain
                        Technology
                      </a>
                    </h3>
                    <p className="card-intro font-montserat text-sm">
                      When it comes to cryptocurrencies, "blockchain" is
                      arguably one of the terms used frequently. But what
                      exactly is blockchain? In this blog, I will look at
                      blockchain using the three circles of the Golden Circle:
                      Why, How, and What.
                    </p>
                    <div className="card-footer mt-6 flex space-x-4 text-sm1">
                      <span className="inline-flex items-center">
                        <svg
                          className="mr-1.5"
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z"
                            fill="#939393"
                          />
                        </svg>
                        10 Feb, 2024
                      </span>
                      <span className="inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-4 inline-flex items-center"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                        Nigel Rapha
                      </span>
                    </div>
                  </div>
                </div> 
                </div>
                </div>*/}
                <AllBlogs blogs={blogs} />
                </div>
              
            
          </div>
        </section>
        <Header />
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
