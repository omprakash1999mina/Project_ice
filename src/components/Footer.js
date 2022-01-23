import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="border border-gray-300 text-gray-600 body-font">
        <div className="bg-gray-100">
          <div className=" mx-auto py-4 px-5 lg:flex lg:flex-wrap lg:justify-between sm:justify-center lg:flex-row">

            <section className="lg:inline-flex lg:flex-row ">
              <div className="flex justify-center sm:justify-center text-center lg:text-left">

                <Link to="#" className="text-gray-600 mr-4" >FAQs</Link>
                <Link to="/support" className="text-gray-600 mr-4" >Contact Us</Link>
                <Link to="/terms" className="text-gray-600 mr-4" >Terms Use</Link>
                <Link to="/RefundPolicy" className="text-gray-600 mr-4" >Refund Policy</Link>

              </div>

              <p className="text-gray-500 lg:mt-0 mt-4 lg:inline text-center lg:text-left">
                © 2020  Royal_IITian —
                <a
                  href="https://twitter.com/OmPraka92120241"
                  rel="noopener noreferrer"
                  className="text-gray-600 ml-1"
                  target="_blank"
                >
                  @ProDeveloper
                </a>
              </p>
              {/* <br className=" sm:hidden" /> */}
            </section>


            <div className="py-4 lg:p-0  flex justify-center">

              <span className="inline-flex lg:ml-auto lg:mt-0 mt-2 justify-center ">
                <a href="https://www.facebook.com/profile.php?id=100015261882314" className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100015261882314" className="ml-3 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/royal_iitian/?r=nametag" className="ml-3 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a href="https://github.com/omprakash1999mina" className="ml-3 text-gray-500">
                  <svg
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // width="24" 
                    // height="24"
                    strokeWidth="2"
                    className=" h-5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
