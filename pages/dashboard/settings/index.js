import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState,useEffect, useNavigate} from "react";

import axios from "axios";

import navimg from "../../../public/images/dash-img.svg";
import side1 from "../../../public/images/side-1.svg";
import side2 from "../../../public/images/side-3.svg";
import side3 from "../../../public/images/side-4.svg";
import side4 from "../../../public/images/side-5.svg";
import side5 from "../../../public/images/help.svg";
import side6 from "../../../public/images/settingsImg-2.svg";
import nav1 from "../../../public/images/chatt.svg";
import nav2 from "../../../public/images/ringg.svg";
import nav3 from "../../../public/images/exchangee.svg";
import nav4 from "../../../public/images/credit-card.svg";
import logout from "../../../public/images/logout.svg";
import dashboard from "../../../public/images/dashboard.svg";
import light from "../../../public/images/dashboard-light.svg";
import calendar from "../../../public/images/calendar.svg";
import money from "../../../public/images/money.svg";
import close from "../../../public/images/close.png";
import spinner from "../../../public/images/spinner.svg";
import successa from "../../../public/images/success.png";
import errora from "../../../public/images/error.png";

const Earnings = ({}) => { 
  const [time, setTime] = useState("");
let router = useRouter();
const [txns, setTxns] = useState("");
const [plan, setPlan] = useState("");
const [amount, setAmount] = useState("");
const [rad, setRad] = useState("");
const [token, setToken] = useState("");
const [network, setNetwork] = useState("");
const [address, setAddress] = useState("");

const [successs, setSuccesss] = useState("");
const [errorr, setErrorr] = useState("");
const [user, setUser] = useState({ level: 9 });
const [lsat, setlsat] = useState("");
const [warn, setWarn] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("authUser")) {
      window.location.replace('/auth/login')
      return;
    }
    const data = JSON.parse(localStorage.getItem("authUser"));
    setUser(data);
    setlsat(localStorage.getItem("authUser"))

  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  }

  const config = {
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${lsat}`,
    },
}

  useEffect(() => {
    document.title = "Social | Hazmick";
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
  
        const res = axios.get("https://upset-bee-overcoat.cyclic.app/private", config);
      
        res.then(
          async (response) => {
            console.log(response.data.user);
            setUser(response.data.user);
          }
        ).catch( (error) => {
            
        console.log(error.response.data.message)
        setError(error.response.data.message)
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        router.push("/auth/login");
      })
  
    } catch (error) {
      setError(error.response.data.message ||
        error.response.data.error ||
        error.message)
      console.log(error.response.data.error)
    }
  }, []);
  
  const deposithandler = () => {
    const deposit = document.getElementById("sssd");
    setErrorr("");
    setSuccesss("");
  
    if (deposit.style.display == "none") {
      deposit.style.display = "flex";
    } else {
      deposit.style.display = "none";
    }
  };
  const withdrawalhandler = () => {
    const withdrawal = document.getElementById("sssw");
    setErrorr("");
    setSuccesss("");
  
    if (withdrawal.style.display == "none") {
      withdrawal.style.display = "flex";
    } else {
      withdrawal.style.display = "none";
    }
  };
  
  const showHide = () => {
    let main = document.getElementById("smald3").style.display;
  
    if (main == "none") {
      document.getElementById("smalx3").style.display = "flex";
      document.getElementById("smald3").style.display = "flex";
      document.getElementById("head-nav").style.bottom = "0";
    } else {
      document.getElementById("smalx3").style.display = "none";
      document.getElementById("smald3").style.display = "none";
      document.getElementById("head-nav").style.bottom = "auto";
    }
  };
  
  const depositSubmission = async (e) => {
    e.preventDefault();
  
    try {
      if (rad === "") { 
        setErrorr("Kindly select an option.");
      }
  
      if (rad === "customD") {
        if (amount === "") {
          setErrorr("Kindly input an amount, amount cannot be empty.");
        }
        if (amount < 1) {
          setErrorr("Kindly input an amount greater than $0");
        }
        if (amount > 0) {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createChargeany",
            { user, amount }
          );
  
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for $${amount}. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
      }
  
      if (rad === "subP") {
        if (plan === "100-mini-entry-plan") {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createCharge-100",
            { user }
          );
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for a $100 subscription plan. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
        if (plan === "300-mini-inter-plan") {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createCharge-300",
            { user }
          );
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for a $300 subscription plan. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
        if (plan === "500-mini-pro-plan") {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createCharge-500",
            { user }
          );
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for a $500 subscription plan. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
        if (plan === "1000-mega-entry-plan") {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createCharge-1000",
            { user }
          );
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for a $1000 subscription plan. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
        if (plan === "5000-mega-inter-plan") {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createCharge-5000",
            { user }
          );
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for a $5000 subscription plan. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
  
        if (plan === "10000-mega-pro-plan") {
          const dataa = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/payment/createCharge-10000",
            { user }
          );
          if (dataa) {
            setSuccesss(
              `Transaction Initiated for a $10000 subscription plan. Kindly click the "Pay Now" button.`
            );
            setErrorr(``);
            document.getElementById(
              "deepp"
            ).innerHTML = `<a target="_blank" class=" px-5 bg-blue-600 text-white font-bold py-3 text-lg rounded-md" href="${dataa.data.hosted_url}">Pay now</a>`;
          } else {
            setSuccesss();
            setErrorr(`Oops, something went wrong. Try again.`);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setErrorr("Oops, something went wrong. Try again.");
    }
  };
  
  const withdrawalSubmission = async (e) => {
    e.preventDefault();
  
    if (time == "0") {
      setWarn(
        "Kindly make a deposit of $500 to extend your monthly limit by an additional $5,000. Your subscription has expired, you can make a deposit of $1,500 to restore all account limits."
      );
    } else {
      document.getElementById("ww").style.display = "none";
      document.getElementById("ww2").style.display = "block";
  
      try {
        if (amount < 1) {
          setErrorr("Kindly input an amount greater than $0");
        }
        if (amount > 0) {
          console.log(token + network + amount + address);
  
          const { data } = await axios.post(
            "https://upset-bee-overcoat.cyclic.app/api/auth/withdrawal",
            { user, token, network, amount, address },
            config
          );
  
          if (data.success) {
            document.getElementById("ww").style.display = "block";
            document.getElementById("ww2").style.display = "none";
            setSuccesss(
              "Transaction Submitted. Check for a confirmation email in your Inbox."
            );
            setErrorr("");
            setToken("");
            setAmount("");
            setNetwork("");
            setAddress("");
          } else {
            setErrorr(
              "Transaction Failed, something went wrong. Please try again."
            );
            setSuccesss("");
          }
          console.log(data);
        }
      } catch (error) {
        console.log(error);
        setErrorr("Oops, something went wrong. Try again.");
      }
    }
  };

  return (
    <>
    <div
      id="sssd"
      class="flex overflow-auto text-sm lg:text-base flex-col gap-6 z-50 px-6 justify-center items-center w-full h-full"
    >
      {errorr && (
        <div class="bg-white errror flex flex-row gap-3 px-4 py-3 items-center rounded-2xl max-w-xl w-full">
          <Image
            className="w-12 h-12"
            src={errora}
            alt=""
            priority
            quality={100}
          />
          <p>{errorr}</p>
        </div>
      )}

      {successs && (
        <div class="bg-white successs flex flex-row gap-3 px-4 py-3 items-center rounded-2xl max-w-xl w-full">
          <Image
            className="w-12 h-12"
            src={successa}
            alt=""
            priority
            quality={100}
          />
          <p>{successs}</p>
        </div>
      )}

      <div class="max-w-xl success w-full justify-start items-start rounded-2xl bg-white flex flex-col px-4 lg:px-6 py-10 gap-8 lg:gap-12">
        <div class=" w-full">
          <div className="flex w-full items-center flex-row justify-between">
            <h3 className="text-2xl">Deposit</h3>
            <Image
              className="w-10 h-10 cursor-pointer"
              onClick={deposithandler}
              src={close}
              alt=""
              priority
              quality={100}
            />
          </div>
          <p className="opacity-70 pt-2">
            Almost done! Choose only one option to make a deposit:
          </p>
        </div>

        <form onSubmit={depositSubmission} class="flex flex-col gap-8 w-full">
          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
              <input
                className="w-5 radio h-5"
                type="radio"
                name="rad"
                id="subP"
                onChange={(e) => {
                  setRad(e.target.value);
                }}
                value="subP"
              />
              <label className="" for="subP">
                Choose a subscription plan
              </label>
            </div>

            <select
              name="plan"
              id="plan"
              class="dddf flex gap-2 flex-col rounded-lg px-4 py-4 outline-none"
              onChange={(e) => {
                setPlan(e.target.value);
              }}
              value={plan}
            >
              <option value="" selected disabled>
                Select an option
              </option>
              <option value="100-mini-entry-plan">
                100$ Mini Entry Plan
              </option>
              <option value="300-mini-inter-plan">
                300$ Mini Intermediate Plan
              </option>
              <option value="500-mini-pro-plan">500$ Mini Pro Plan</option>
              <option value="1000-mega-entry-plan">
                1,000$ Mega Entry Plan
              </option>
              <option value="5000-mega-inter-plan">
                5,000$ Mega Intermediate Plan
              </option>
              <option value="10000-mega-pro-plan">
                10,000$ Mega Pro Plan
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
              <input
                className="w-5 h-5 radio text-green-600"
                type="radio"
                name="rad"
                id="customD"
                onChange={(e) => {
                  setRad(e.target.value);
                }}
                value="customD"
              />
              <label for="customD">Make a custom deposit</label>
            </div>
            <input
              class="dddf rounded-lg p-4 outline-none"
              placeholder="100"
              type="number"
              name="amount"
              id="amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
            />
          </div>

          <div
            id="deepp"
            class="w-full lg:pt-4 flex justify-center items-center"
          >
            <button
              type="submit"
              class="px-8 py-3 cursor-pointer hover:bg-green-900 rounded-lg text-white bg-green-700"
            >
              Deposit
            </button>
          </div>
          <div id="deepp2" class=" hidden  lg:pt-4 lg:justify-center ">
            <div class="px-8 py-3 flex gap-2 items-center cursor-pointer hover:bg-green-900 rounded-lg text-white bg-green-700">
              deposit
              <img class="w-6 h-6 spinner" src="/spinner.svg" alt="spinner" />
            </div>
          </div>
        </form>
      </div>
    </div>

    <div
      id="sssw"
      class="flex overflow-auto text-sm lg:text-base flex-col gap-6 z-50 px-6 justify-center items-center w-full h-full"
    >
      {errorr && (
        <div class="bg-white errror flex flex-row gap-3 px-4 py-3 items-center rounded-2xl max-w-xl w-full">
          <Image
            className="w-12 h-12"
            src={errora}
            alt=""
            priority
            quality={100}
          />
          <p>{errorr}</p>
        </div>
      )}

      {successs && (
        <div class="bg-white successs flex flex-row gap-3 px-4 py-3 items-center rounded-2xl max-w-xl w-full">
          <Image
            className="w-12 h-12"
            src={successa}
            alt=""
            priority
            quality={100}
          />
          <p>{successs}</p>
        </div>
      )}

      <div class="max-w-xl success w-full justify-start items-start rounded-2xl bg-white flex flex-col px-4 lg:px-6 py-10 gap-8 lg:gap-12">
        <div class=" w-full">
          <div className="flex w-full items-center flex-row justify-between">
            <h3 className="text-2xl">Withdrawal</h3>
            <Image
              className="w-10 h-10 cursor-pointer"
              onClick={withdrawalhandler}
              src={close}
              alt=""
              priority
              quality={100}
            />
          </div>
          <p className="opacity-70 pt-2">
            Send funds to any specified crypto address
          </p>
        </div>

        <form
          onSubmit={withdrawalSubmission}
          class="flex flex-col gap-8 w-full"
        >
          <div class="flex gap-4 flex-1">
            <div class="flex flex-col gap-4 w-full">
              <div class="flex gap-2 items-center">
                <label for="option2">Token</label>
              </div>
              <input
                class="dddf rounded-lg p-4 outline-none"
                placeholder="e.g Tron"
                type="text"
                name="dropdown2"
                id="dropdown2"
                required
                onChange={(e) => {
                  setToken(e.target.value);
                }}
                value={token}
              />
            </div>
            <div class="flex flex-col gap-4 w-full">
              <div class="flex gap-2 items-center">
                <label for="option2">Network</label>
              </div>
              <input
                class="dddf rounded-lg p-4 outline-none"
                placeholder="e.g Tron (TRX)"
                type="text"
                name="dropdown2"
                id="dropdown2"
                required
                onChange={(e) => {
                  setNetwork(e.target.value);
                }}
                value={network}
              />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
              <label for="option2">Recipient Address</label>
            </div>
            <input
              class="dddf rounded-lg p-4 outline-none"
              placeholder="e.g Public Address (Tp)"
              type="text"
              name="dropdown2"
              required
              id="dropdown2"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
              <label for="option2">Amount (USD)</label>
            </div>
            <input
              class="dddf rounded-lg p-4 outline-none"
              placeholder="0.00"
              required
              type="number"
              name="dropdown2"
              id="dropdown2"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
            />
          </div>

          <div
            id="ww"
            class="w-full lg:pt-4 flex justify-center items-center"
          >
            <button class="px-8 py-3 cursor-pointer hover:bg-amber-900 rounded-lg text-white bg-amber-700">
              Withdraw
            </button>
          </div>
          <div id="ww2" class=" hidden  lg:pt-4 lg:justify-center ">
            <div class="px-8 py-3 flex justify-center gap-2 items-center cursor-pointer hover:bg-amber-900 rounded-lg text-white bg-amber-700">
              deposit
              <Image
                class="w-6 h-6 spinner"
                src={spinner}
                alt="spinner"
                priority
                quality={100}
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    <Head>
      <title>Dashboard | Hazmick</title>
      <meta name="description" content="Hazmick - World Class Automated Crypto Trading Bot. Copy traders, manage all your exchange accounts, use market-making and exchange/market arbitrage and simulate or backtest your trading. Trading, Portfolio, Arbitrage, Signals, Bots - everything you need to easily manage crypto assets, within one interface." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      {user ? (
        <div id="memebership-cont" class="w-full">
        <div
          id="left"
          style={{
            backgroundColor: "#2e2e2e",
            zIndex: "99999",
          }}
          class="top-0 w-full xl:w-44 left-0 xl:bottom-0 fixed "
        >
          <div
            id="img"
            class="xl:mt-12 p-3 xl:p-0 xl:mb-8 xl:block flex justify-between items-center"
          >
            <Link
              href="/dashboard"
              id="had-img"
              class="xl:w-72 w-64 h-10 flex justify-center items-center overflow-hidden"
            >
              <Image
                src={navimg}
                alt="Hazmick"
                style={{ marginLeft: "-110px" }}
              />
            </Link>
            <div onClick={showHide} class="block xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 text-white w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <div id="smald2" class="hidden xl:flex flex-col pt-8 pb-12">
            <Link
              href="/dashboard"
              id="sidebar-item"
              class=" flex items-center text-white py-3"
            >
              <div class="mr-3 text-white ml-5">
                <Image src={light} />
              </div>
              <p class=" font-extralight">Dashboard</p>
            </Link>
            <Link
              href="/dashboard/automation"
              id="sidebar-item"
              class=" flex items-center text-white py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 ml-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              <p class=" font-extralight">Automation</p>
            </Link>
            <Link
              href="/dashboard/trading"
              id="sidebar-item"
              class=" flex items-center text-white py-3"
            >
              <div class="mr-3 ml-5">
                <Image src={side2} />
              </div>
              <p class=" font-extralight">Trading</p>
            </Link>
            <Link
              href="/dashboard/social"
              id="sidebar-item"
              class=" flex items-center text-white py-3"
            >
              <div class="mr-3 ml-5">
                <Image src={side3} />
              </div>
              <p class=" font-extralight">Social</p>
            </Link>
            <Link
              href="/dashboard/history"
              id="sidebar-item"
              class=" flex items-center text-white py-3"
            >
              <div class="mr-3 ml-5">
                <Image src={side4} />
              </div>
              <p class=" font-extralight">History</p>
            </Link>
          </div>
          <div
            id="smalx2"
            class="xl:bottom-0 w-full hidden xl:flex flex-col xl:py-8"
          >
            <Link
              href="/dashboard/settings"
              id="sidebar-item"
              class="my-1 bg-white border-blue-600 items-center border-l-8 flex py-3"
            >
              <div class="mr-3 ml-5">
                <Image src={side6} />
              </div>
              <p class=" font-extralight">Setting</p>
            </Link>
            <div id="sidebar-item" class=" flex items-center text-white py-3">
              <div class="mr-3 ml-5">
                <Image src={side5} />
              </div>
              <p class=" font-extralight">Help</p>
            </div>
          </div>
        </div>
        <div id="right" class=" xl:pl-44">
            {user.plan ? (
              <nav
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                }}
                class="xl:py-6 py-3 xl:mt-0 mt-16 items-center flex xl:justify-end xl:top-0 left-0 right-0 w-full fixed bg-white"
              >
                <div id="dropdown" class="xl:px-5 px-1">
                  <div
                    id="dropdown-btn"
                    class="relative shadh p-3 rounded-full flex justify-center items-center"
                  >
                    <Image class="xl:w-5 xl:h-5 w-4 h-4" src={nav1} alt="chat" />
                  </div>
                  <div
                    id="dropdown-cont"
                    class="hidden rounded xl:right-72 w-80 flex-col py-3 text-black text-sm bg-white absolute"
                  >
                    <div class="flex justify-center items-center">
                      <div class="h-2 w-3 rounded-full bg-gray-300 ml-2 mr-2"></div>
                      <div>
                        <div class="px-3 py-3 leading-6 ">
                          You'll be receiving updates from our crypto bots about
                          any massive changes.
                        </div>
                        <div class="px-3 leading-6 ">
                          Select a plan to receive messages from crypto bots.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="dropdown" class="xl:px-5 px-1">
                  <div
                    id="dropdown-btn"
                    class="relative shadh p-3 rounded-full flex justify-center items-center"
                  >
                    <Image class="xl:w-5 xl:h-5 w-4 h-4" src={nav2} alt="ring" />
                  </div>
                  <div
                    id="dropdown-cont"
                    class="hidden rounded xl:right-52 w-80 flex-col py-3 text-black text-sm bg-white absolute"
                  >
                    <div class="flex justify-center items-center">
                      <div class="h-2 w-3 rounded-full bg-gray-300 ml-2 mr-2"></div>
                      <div>
                        <div class="px-3 py-3 leading-6 ">
                          Your account is ready, we'll send you regular updates
                          to your mail and don't worry all trades are automated.
                        </div>
                        <div class="px-3 leading-6 ">
                          Thank you for joining Hazmick! Link your first crypto
                          coin to start automating your cryptocurrency
                          portfolio.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="dropdown" class="xl:px-5 px-1">
                  <div
                    id="dropdown-btn"
                    class="relative shadh p-3 rounded-full flex justify-center items-center"
                  >
                    <Image class="w-4 h-4" src={nav3} alt="exchange" />
                  </div>
                  <div
                    id="dropdown-cont"
                    class="hidden rounded xl:right-32 w-64 flex-col py-3 text-black text-sm bg-white absolute"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <div class="text-lg pt-2 pb-1 font-bold ">
                        <h2>Rebalances</h2>
                      </div>
                      <div class="px-3 pt-1 pb-2 leading-6 ">
                        No Scheduled Rebalances
                      </div>
                    </div>
                  </div>
                </div>
                <div id="dropdown" class="xl:px-5 px-1">
                  <div
                    id="dropdown-btn"
                    class="relative shadh p-3 rounded-full flex justify-center items-center"
                  >
                    <Image
                      class="xl:w-6 xl:h-6 w-5 h-5"
                      src={nav4}
                      alt="credit-card"
                    />
                  </div>
                  <div
                    id="dropdown-cont"
                    class="hidden rounded left-10 xl:left-auto xl:right-8 w-80 flex-col py-3 text-black text-sm bg-white absolute"
                  >
                    <div class="flex flex-col justify-center px-4 font-semibold">
                      <div class="pt-3 text-left pb-2">
                        <p>
                          You're on the{" "}
                          <span class="text-blue-600 italic font-bold">
                            {user.plan.plan_name}
                          </span>
                        </p>
                      </div>
                      <div class="pt-3 pb-2 text-left">
                        <p>
                          Your Automated trade coin is{" "}
                          <span class="text-blue-600 italic font-bold">
                            {user.coin}
                          </span>
                        </p>
                      </div>
                      {user.coin === "tron" ? (
                        <button
                          onClick={cardanoHandler}
                          class="bg-blue-600 mt-3 py-2 px-4 font-semibold text-white w-full"
                        >
                          Select Cardano Instead
                        </button>
                      ) : (
                        <button
                          onClick={tronHandler}
                          class="bg-blue-600 mt-3 py-2 px-4 font-semibold text-white w-full"
                        >
                          Select Tron Instead
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{ width: "1px" }}
                  class="xl:mx-3 mx-1 h-5 bg-gray-300"
                ></div>

                <div id="dropdown" class="xl:px-5 px-1">
                  <div
                    id="dropdown-btn"
                    class="relative shadh whitespace-nowrap py-3 rounded-full flex justify-center items-center pl-3 pr-2 xl:pr-10"
                  >
                    Hi, {user.username}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <div
                    id="dropdown-cont"
                    class="hidden rounded left-10 xl:left-auto xl:right-4 w-80 flex-col py-3 text-black text-sm bg-white absolute"
                  >
                    <div class="flex flex-col w-full px-3 ">
                      <div class="flex py-3 justify-between w-full">
                        <p>Total</p>
                        <p>${user.plan.plan_fee}</p>
                      </div>
                      <div
                        style={{ height: "1px" }}
                        class=" w-full bg-gray-600"
                      ></div>
                      <div
                        onClick={logoutHandler}
                        class="flex hover:bg-gray-100 cursor-pointer py-3"
                      >
                        <Image src={logout} class="h-5 w-6" alt="logout" />
                        <p class="pl-2">Logout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            ) : (
              <nav
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                }}
                class="xl:py-6 z-50 py-2 xl:mt-0 mt-16 justify-evenly items-center flex xl:justify-end xl:top-0 left-0 right-0 w-full fixed bg-white"
              >
                <div class="flex gap-2 lg:gap-4">
                  <div
                    onClick={deposithandler}
                    class="cursor-pointer hover:bg-green-900 hover:text-white py-2 px-6 bg-green-700 text-green-50 rounded-lg text-sm md:text-base"
                  >
                    Deposit
                  </div>
                  <div
                    onClick={withdrawalhandler}
                    class="py-2 px-6 hover:border-none cursor-pointer hover:bg-red-800 hover:text-white border-red-700 text-red-700 border rounded-lg text-sm md:text-base"
                  >
                    Withdraw
                  </div>
                </div>
                <div
                  style={{ width: "1px" }}
                  class="xl:mx-3 mx-1 h-5 bg-gray-300"
                ></div>
    
                <div id="dropdown" class="xl:px-5">
                  <div
                    id="dropdown-btn"
                    class="relative text-sm md:text-base shadh whitespace-nowrap py-3 rounded-full flex  pl-3 pr-2 xl:pr-10"
                  >
                    Hi, {user.username}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <div
                    id="dropdown-cont"
                    class="hidden rounded left-10 xl:left-auto xl:right-4 w-80 flex-col py-3 text-black text-sm bg-white absolute"
                  >
                    <div class="flex flex-col w-full px-3 ">
                      <div class="flex py-3 justify-between w-full">
                        <p>Total</p>
                        <p>${user.bal}.00</p>
                      </div>
                      <div
                        style={{ height: "1px" }}
                        class=" w-full bg-gray-600"
                      ></div>
                      <div
                        onClick={logoutHandler}
                        class="flex hover:bg-gray-100 cursor-pointer py-3"
                      >
                        <Image src={logout} class="h-5 w-6" alt="logout" />
                        <p class="pl-2">Logout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            )}
            <div id="body">
              <div style={{}} class="flex flex-col pb-16 pt-40 x:pt-24">
                <div class="rounded bg-white mx-8">
                  <div class="p-4 border-b text-lg font-bold tracking-wide">
                    Return of Investment (ROI)
                  </div>

                  <div class="flex flex-col xl:flex-row">
                    <div
                      style={{
                        boxShadow: "0 1px 32px -2px rgb(59 53 121 / 15%)",
                      }}
                      class="max-w-md my-8 p-6 w-auto"
                    >
                      <div class="flex text-lg font-medium items-center">
                        <Image class="h-9 w-9" src={money} alt="" />
                        <p class="pl-6">Earnings</p>
                      </div>
                      <div class="flex font-medium justify-between py-3 text-lg">
                        <p>Available:</p>
                        <p class="text-blue-600 font-semibold text-lg italic">
                          $0.00*
                        </p>
                      </div>
                      <div class="text-sm tracking-wide font-medium leading-6 text-gray-700">
                        <p>
                          *A link will appear when it's time to link your Crypto
                          wallet Addresses to Hazmick so you can recieve all your
                          earnings. If there is no Link that means your earnings
                          haven't accumulated for the satisfactory months.
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        boxShadow: "0 1px 32px -2px rgb(59 53 121 / 15%)",
                      }}
                      class="max-w-md xl:mx-8 my-8 p-6 w-auto"
                    >
                      <div class="flex text-lg font-medium items-center">
                        <Image class="h-9 w-9" src={calendar} alt="" />
                        <p class="pl-6">Next Payout date</p>
                      </div>
                      <div class="flex font-medium justify-between py-3 text-lg">
                        <p>Pending earnings</p>
                        <p>$0.00000*</p>
                      </div>
                      <div class="text-sm tracking-wide font-medium leading-6 text-gray-700">
                        <p>
                          *This is an estimate based on current leader/follower
                          information. The finalized amount will be calculated
                          on the next payout date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
    </>
  );
};

export default Earnings;
