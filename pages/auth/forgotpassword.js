import Head from 'next/head'
import image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState,useEffect, useNavigate} from "react";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import axios from "axios";

const Forgotpassword = ({ }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      window.location.replace("/dashboard");
    }
  }, []);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    document.getElementById("deed2").style.display = "flex";
    document.getElementById("deed1").style.display = "none";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://upset-bee-overcoat.cyclic.app/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.message);
      setEmail("");

      setTimeout(() => {
        setSuccess("");
        router.push("/auth/login");
      }, 5000);

    } catch (error) {
      setError(error.response.data.message ||
        error.response.data.error ||
        error.message)
      document.getElementById("deed2").style.display = "none";
      document.getElementById("deed1").style.display = "block";
    }
  };
  return (
    <>
    <Head>
      <title>Forgot Password | Hazmick</title>
      <meta name="description" content="Hazmick - World Class Automated Crypto Trading Bot. Copy traders, manage all your exchange accounts, use market-making and exchange/market arbitrage and simulate or backtest your trading. Trading, Portfolio, Arbitrage, Signals, Bots - everything you need to easily manage crypto assets, within one interface." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <div class="min-h-screen mb-8 pt-8 bg-gray-100 text-gray-900 flex justify-center">
      {error && (
        <div
          id="pop-up"
          style={{ zIndex: 9999, borderTopWidth: "6px" }}
          class="fixed  border-red-600 shadow-xl bg-white mt-24 xl:mt-28 mr-4 max-w-xs top-0 right-0 py-2 px-3"
        >
          <h2 class="font-bold tracking-wider">Forgot Password</h2>
          <p class="text-sm text-left tracking-wider pt-1">{error}</p>
        </div>
      )}
      {success && (
        <div
          id="pop-up"
          style={{ zIndex: 9999, borderTopWidth: "6px" }}
          class="fixed  border-green-600 shadow-xl bg-white mt-24 xl:mt-28 mr-4 max-w-xs top-0 right-0 py-2 px-3"
        >
          <h2 class="font-bold tracking-wider">Forgot Password</h2>
          <p class="text-sm text-left tracking-wider pt-1">{success}</p>
        </div>
      )}
      <div className="xl:max-w-screen-xl w-full m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 w-full p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-xl xl:text-2xl font-extrabold">
              Forgot Password
            </h1>

            <form
              className="w-full flex-1 mt-8 text-blue-500"
              onSubmit={forgotPasswordHandler}
            >
              <div className="mx-auto max-w-xs relative ">
                <div class="flex flex-col py-3">
                  <input
                    type="email"
                    class=" bg-gray-100 outline-none rounded-lg py-3 px-4"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div class="flex justify-center pt-3"><button id="deed1" class="border-0 py-3 px-5 cursor-pointer uppercase font-bold text-sm text-white bg-blue-700">
                Submit
              </button>
              <div id="deed2" class="hidden ptt text-white px-3 items-center justify-center cursor-pointer font-bold bg-blue-700">
                <p class="px-3 uppercase font-bold text-sm">
                Submit</p>
                <svg class="turn w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div></div>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up again
                </div>
              </div>
              <div className="flex flex-col items-center">
                <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
               bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  href="/auth/register"
                  target="_self"
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-blue-500" />
                  <span className="ml-4">Sign Up</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-blue-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"></div>
        </div>
      </div>
      ;
    </div>
    <Footer />
    </>
  );
};

export default Forgotpassword;
