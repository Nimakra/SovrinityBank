import { FunctionComponent } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faBank,
  faCheckCircle,
  faCreditCard,
  faArrowRight,
  faChain,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const SovrinityHome: FunctionComponent = () => {

  return (
    <div className="min-h-screen bg-white text-black font-montserrat">
      <Header />
      <div>
        <section className="text-center py-12 bg-cyan-950 shadow-2xl">
          <h1 className="text-[48px] font-bold mb-2 bg-clip-text text-whitesmoke-100 ">
            <FontAwesomeIcon icon={faBank} className="mr-2" /> Welcome to
            Sovrinity
          </h1>
          <p className="text-xl text-center mb-8 max-w-[620px] p-2 mx-auto font-semibold text-shadow font-montserrat-alternates shadow-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-whitesmoke-50 to-blue-300 shadow-lg rounded-2xl">
            Empowering Financial Sovereignty and Security
          </p>
          <p className="text-xl text-white text-center mb-8 max-w-[1300px] mx-auto font-medium ">
            We're dedicated to providing you with the best banking experience.
            With our cutting-edge technology and customer-centric approach,
            we're redefining what it means to bank.
          </p>
        </section>
      </div>

      <div className="mx-auto max-w-[1330px] px-8 mt-6 text-center">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          <div className="bg-whitesmoke-200 rounded-full p-10 shadow-lg shadow-slate-600">
            <h2 className="text font-bold mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Unmatched Transaction Success Rates
            </h2>
            <p className="text font-medium text-lg">
              Our advanced technology ensures your transactions are processed
              successfully every time. Experience the peace of mind that comes
              with knowing your transactions are in good hands.
            </p>
          </div>
          <div className="bg-whitesmoke-200 rounded-full p-10 shadow-lg shadow-slate-600">
            <h2 className="text-2xl font-bold mb-4">
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Seamless Payments Experience
            </h2>
            <p className="text font-medium text-lg">
              We've made payments easy and hassle-free. With our one-time
              integration, you can pay however you want, whenever you want. It's
              banking made simple.
            </p>
          </div>
        </section>

        <section className="text-center py-20 bg-gray-100 shadow-lg">
          <h2 className="text-[40px] font-bold mb-4">Why Bank with Us?</h2>
          <p className="text-xl text-center mb-8 font-medium">
            We're not just a bank, we're a partner in your financial journey.
            With our wide range of services, dedicated support team, and
            commitment to your success, we're more than just a bank - we're a
            partner you can count on.
          </p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faLock} size="4x" className="mb-4" />
              <h2 className="text-[30px] font-bold mb-4">Decentralized</h2>
              <p>
                Our bank operates on a decentralized network. This means no
                single entity controls your transactions or personal
                information. It's banking that puts you in control.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faChain} size="4x" className="mb-4" />
              <h2 className="text-[30px] font-bold mb-4">100% On-Chain</h2>
              <p>
                All transactions are 100% on-chain. This ensures transparency,
                security, and trust. You can verify your transactions on the
                blockchain anytime, anywhere.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faShieldAlt} size="4x" className="mb-4" />
              <h2 className="text-[30px] font-bold mb-4">
                Secure Transactions
              </h2>
              <p>
                Your transactions are secured on the Internet Computer. This
                means they're protected by the most advanced cryptographic
                technologies. It's banking you can trust.
              </p>
            </div>
          </section>
          <button
            onClick={() => (window.location.href = "/register")}
            className="cursor-pointer mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-31xl focus:outline-none focus:ring focus:border-blue-300 font-montserrat transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
          >
            Start Banking with Us
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default SovrinityHome;
