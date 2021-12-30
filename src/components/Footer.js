import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="border border-gray-300 text-gray-600 body-font bottom-0">
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
                © 2020  OP-Developers —
                <a
                  href="https://twitter.com/ProDevelopers"
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
                <a href="https://in.linkedin.com/in/om-prakash-bairwa-a82a2b203?trk=people-guest_people_search-card" className="ml-3 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
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
