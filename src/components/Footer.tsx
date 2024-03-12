import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";

const sections = [
  {
    title: "Learn",
    items: ["Smart Contracts", "DeFi", "NFTs", "Blockchain", "Web3"],
  },
  {
    title: "Blog",
    items: ["Trending", "Hot Topics", "ICP" ],
  },
  {
    title: "Communities",
    items: ["DFinity", "Bitcoin", "Etherium"],
  },
  {
    title: "Resources",
    items: ["About", "Privacy"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div className="w-full mt-20 bg-black1-400 text-gray-white py-y px-2 md:px-2 text-xl border-solid border-t-1 border-white ">
      <div className="max-w-[1270px] mx-auto grid grid-cols-4 md:grid-cols-2 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h5 className="font-bold uppercase pt-2">{section.title}</h5>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, marginLeft: 0 }}>
              {section.items.map((item, i) => (
                <li key={i} className="cursor-pointer relative py-1 text-whitesmoke-300 hover:text-white text-[16px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-2">
          <p className="font-bold uppercase">Subscribe to our newsletter</p>
          <p className="py-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>       
          <form className="flex flex-row">
            <input
              className="w-3/5 p-2 mr-4 rounded-md mb-4"
              type="email"
              placeholder="Enter email.."
            />
            <button className="cursor-pointer p-2 mb-4 w-1/5 rounded-md mr-4  bg-blue-600 hover:bg-blue-700 font-semibold">Subscribe</button>
          </form>     
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-300">
        <p className="py-4">2024 Workflow, LLC. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 cursor-pointer">
          {items.map((x, index) => {
            return <x.icon key={index} className="hover:text-white" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;