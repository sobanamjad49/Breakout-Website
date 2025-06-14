import React, { useRef, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Homepage() {
  const [activeTab, setActiveTab] = useState(1);
  const scrollRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
  };

  const scroll = (direction, tabIndex) => {
    const scrollRef = scrollRefs[tabIndex];
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const images = [
    {
      id: "683c343d0dfbefeb408772df",
      src: "https://breakout.com.pk/cdn/shop/files/5BSHP410-WHT_1.jpg?v=1746789407&width=480",
    },

    {
      id: "683c343e0dfbefeb408772e5",
      src: "https://breakout.com.pk/cdn/shop/files/5CSHP473-GBL_1.jpg?v=1746788711&width=480",
    },
    {
      id: "683c343e0dfbefeb408772e7",
      src: "https://breakout.com.pk/cdn/shop/files/5CSHP473-BGE_1.jpg?v=1746788713&width=480",
    },
    {
      id: "683c343e0dfbefeb408772e9",
      src: "https://breakout.com.pk/cdn/shop/files/5ASHP277-BLK_1.jpg?v=1746789867&width=480",
    },
    {
      id: "683c343e0dfbefeb408772ed",
      src: "https://breakout.com.pk/cdn/shop/files/5ASHP264-GRY_2.jpg?v=1746790048&width=480",
    },
    {
      id: "683c343e0dfbefeb408772ef",
      src: "https://breakout.com.pk/cdn/shop/files/5CSHP475-SND_3.jpg?v=1746788708&width=480",
    },
  ];
  const images1 = [
    {
      id: "683c343e0dfbefeb40877307",
      src: "https://breakout.com.pk/cdn/shop/files/5BSNT530-RED_1.jpg?v=1746789018&width=960",
    },
    {
      id: "683c343e0dfbefeb4087730f",
      src: "https://breakout.com.pk/cdn/shop/files/5BSNT530-OLV_1.jpg?v=1746789019&width=480",
    },
    {
      id: "683c343e0dfbefeb40877311",
      src: "https://breakout.com.pk/cdn/shop/files/5BSNT530-OFW_1.jpg?v=1746789020&width=480",
    },
    {
      id: "683c343e0dfbefeb40877317",
      src: "https://breakout.com.pk/cdn/shop/files/5CSNT555-GRY_1.jpg?v=1746877949&width=480",
    },
    {
      id: "683c343e0dfbefeb40877313",
      src: "https://breakout.com.pk/cdn/shop/files/5BSNT520-BLK_1.jpg?v=1746789262&width=480",
    },
    {
      id: "683c343e0dfbefeb40877319",
      src: "https://breakout.com.pk/cdn/shop/files/5BSNT560-OLV_2.jpg?v=1746789011&width=480",
    },
  ];
  const images2 = [
    {
      id: "683c343e0dfbefeb40877391",
      src: "https://breakout.com.pk/cdn/shop/files/K5ASW298-BLU_1.jpg?v=1746789884&width=480",
    },
    {
      id: "683c343e0dfbefeb40877395",
      src: "https://breakout.com.pk/cdn/shop/files/K5CSW625-NYG_2_0595b86e-530b-404b-9155-6af9f2260fd0.jpg?v=1747224602&width=480",
    },
    {
      id: "683c343e0dfbefeb408773a1",
      src: "https://breakout.com.pk/cdn/shop/files/K5ASW264-MLT_2.jpg?v=1746789887&width=480",
    },
    {
      id: "683c343e0dfbefeb4087739b",
      src: "https://breakout.com.pk/cdn/shop/files/SAB02832.jpg?v=1747655226&width=480",
    },
    {
      id: "683c343e0dfbefeb40877393",
      src: "https://breakout.com.pk/cdn/shop/files/K5ASW283-ONW_1_2fbb705e-2f01-4a21-9008-5654fc86435b.jpg?v=1746790086&width=480",
    },
    {
      id: "683c343e0dfbefeb408773a3",
      src: "https://breakout.com.pk/cdn/shop/files/MUJ_5657.jpg?v=1746789666&width=480",
    },
  ];
  const images3 = [
    {
      id: "683c343e0dfbefeb408773cb",
      src: "https://breakout.com.pk/cdn/shop/files/SAB03123_f834b6be-8bc6-4504-958d-8430477ed346.jpg?v=1746789503&width=480",
    },
    {
      id: "683c343e0dfbefeb408773c9",
      src: "https://breakout.com.pk/cdn/shop/files/K5AST314-TPN_1.jpg?v=1746789692&width=480",
    },
    {
      id: "683c343e0dfbefeb408773c7",
      src: "https://breakout.com.pk/cdn/shop/files/K5BST507-OFW_1.jpg?v=1746788583&width=480",
    },
    {
      id: "683c343e0dfbefeb408773c3",
      src: "https://breakout.com.pk/cdn/shop/files/K5BST382-OFW_1.jpg?v=1746789315&width=960",
    },
    {
      id: "683c343e0dfbefeb408773c1",
      src: "https://breakout.com.pk/cdn/shop/files/K5CST528-LPK_1.jpg?v=1747223395&width=960",
    },
    {
      id: "683c343e0dfbefeb408773cd",
      src: "https://breakout.com.pk/cdn/shop/files/SAB03279.jpg?v=1747655309&width=960",
    },
  ];

  return (
    <div className="bg-yellow-200">
      <div className="relative">
        <img
          src="https://breakout.com.pk/cdn/shop/files/Main_Banners_2_731d25ac-1cb2-4b5c-b29f-bc8c7a2965bf.jpg?v=1747031129&width=1728"
          alt="Sample"
          className="w-full h-full "
        />

        <marquee className="w-full bg-white border-y border-[#119d77] overflow-hidden relative bottom-6 md:bottom-11 lg:bottom-11">
          <span className="text-[#119d77] font-bold">FLAT 30% OFF</span>
          <span className="text-[#119d77] ml-9 mr-9">
            YOUR FAVOURITES, NOW ON
          </span>
          <span className="text-[#119d77] font-bold">FLAT 30% OFF</span>
          <span className="text-[#119d77] ml-9 mr-9">
            YOUR FAVOURITES, NOW ON
          </span>
          <span className="text-[#119d77] font-bold">FLAT 30% OFF</span>
          <span className="text-[#119d77] ml-9 mr-9">
            YOUR FAVOURITES, NOW ON
          </span>
          <span className="text-[#119d77] font-bold">FLAT 30% OFF</span>
        </marquee>
        <p className="absolute bottom-[-10px] left-[50%] text-center text-[#119d77] text-2xl font-bold">
          MEN
        </p>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-200 mt-3">
            <div>
              <Link to="/Men">
                {" "}
                <img
                  src="https://breakout.com.pk/cdn/shop/files/5ASHT217-PPP_1_copy.jpg?v=1744365168&width=720"
                  alt="img1"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/MenPolos">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/5ASHP200-BGE_1_copy.jpg?v=1744365168&width=720"
                  alt="img2"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/MenJeans">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/5ASMD215-BLU_1_copy.webp?v=1744371740&width=720"
                  alt="img3"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/MenAccessories">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/1G9A6726_copy.webp?v=1744365724&width=720"
                  alt="img4"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
          </div>
          <p className="  text-center mt-3 text-[#119d77] text-2xl font-bold">
            WOMEN
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-200 mt-3">
            <div>
              <Link to="/Women">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/DSC_4766_copy_2.jpg?v=1744368062&width=720"
                  alt="img1"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/WomenDress">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/DRESSES_copy_2.jpg?v=1744368062&width=720"
                  alt="img2"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/WomenJeans">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/5ASWD340-BLU_1_copy.jpg?v=1744368062&width=720"
                  alt="img3"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/WomenAccessories">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/5BSSH109-BGE_1_copy.webp?v=1744368061&width=720"
                  alt="img4"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
          </div>
          <p className="  text-center mt-3 text-[#119d77] text-2xl font-bold">
            BOYS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-200 mt-3">
            <div>
              <Link to="/Boy">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K5BST464-OTM_1_copy.webp?v=1744370335&width=720"
                  alt="img1"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/BoyPolos">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K5ASP267-NVY_1_copy.webp?v=1744370335&width=720"
                  alt="img2"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/BoyShirts">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K5ASW283-ONW_1_2fbb705e-2f01-4a21-9008-5654fc86435b_copy.webp?v=1744370336&width=720"
                  alt="img3"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/BoysAccessories">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K24FSH19-NBR_2_copy.jpg?v=1744370335&width=720"
                  alt="img4"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
          </div>
          <p className="  text-center mt-3 text-[#119d77] text-2xl font-bold">
            GIRLS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-200 mt-3">
            <div>
              <Link to="/Girls">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K5BST509-DPN_1_copy.webp?v=1744371579&width=720"
                  alt="img1"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="GirlsShirt">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K5BSW397-GRN_1_copy.webp?v=1744371579&width=720"
                  alt="img2"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="/GirlsJeans">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K5ASD358-LBL_1_copy.webp?v=1744371578&width=720"
                  alt="img3"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div>
              <Link to="GirlsAccessories">
                <img
                  src="https://breakout.com.pk/cdn/shop/files/K24SSH12-HPK_2_copy_c7955bf1-65c3-4b8d-ad43-0da9f1bbad55.jpg?v=1744371825&width=7200"
                  alt="img4"
                  class="transition-transform duration-[2000ms] ease-in-out hover:scale-110"
                />
              </Link>
            </div>
          </div>
          <p className="  text-center mt-3 text-[#119d77] text-2xl font-bold">
            IT MAY INTEREST YOU
          </p>

          <div className="">
            {/* Tab Buttons */}
            <div className="flex justify-center gap-3  mb-6 ">
              {/* MEN */}
              <div className="relative group">
                <button
                  onClick={() => setActiveTab(1)}
                  className={`py-2 px-4 text-md font-medium transition-colors duration-300 ${
                    activeTab === 1
                      ? "text-blue-600"
                      : "text-gray-600 group-hover:text-blue-500"
                  }`}
                >
                  MEN
                </button>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    activeTab === 1 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>

              {/* WOMEN */}
              <div className="relative group">
                <button
                  onClick={() => setActiveTab(2)}
                  className={`py-2 px-4 text-md font-medium transition-colors duration-300 ${
                    activeTab === 2
                      ? "text-blue-600"
                      : "text-gray-600 group-hover:text-blue-500"
                  }`}
                >
                  WOMEN
                </button>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    activeTab === 2 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>

              {/* BOYS */}
              <div className="relative group">
                <button
                  onClick={() => setActiveTab(3)}
                  className={`py-2 px-4 text-md font-medium transition-colors duration-300 ${
                    activeTab === 3
                      ? "text-blue-600"
                      : "text-gray-600 group-hover:text-blue-500"
                  }`}
                >
                  BOYS
                </button>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    activeTab === 3 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>

              {/* GIRLS */}
              <div className="relative group">
                <button
                  onClick={() => setActiveTab(4)}
                  className={`py-2 px-4 text-md font-medium transition-colors duration-300 ${
                    activeTab === 4
                      ? "text-blue-600"
                      : "text-gray-600 group-hover:text-blue-500"
                  }`}
                >
                  GIRLS
                </button>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    activeTab === 4 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>
            </div>

            {/* Tab Content as Cards */}
            <div className="relative">
              {/* Tab Content Container */}
              <div className="relative h-[333px]">
                {/* MEN Tab */}
                <div
                  className={`absolute w-full transition-opacity duration-300 ${
                    activeTab === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative h-full">
                    <button
                      onClick={() => scroll("left", 1)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8592;
                    </button>

                    <div
                      ref={scrollRefs[1]}
                      className="flex overflow-x-auto scrollbar-hide gap-4 p-4 bg-gray-200 scroll-smooth h-full"
                    >
                      {images.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-60"
                        >
                          <Link to={`/productdetails/${item.id}`}>
                            <img
                              src={item.src}
                              alt={`img-${index + 1}`}
                              className="w-full h-[300px] object-cover hover:opacity-80 transition"
                            />
                          </Link>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scroll("right", 1)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>

                {/* WOMEN Tab */}
                <div
                  className={`absolute w-full transition-opacity duration-300 ${
                    activeTab === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative h-full">
                    <button
                      onClick={() => scroll("left", 2)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8592;
                    </button>

                    <div
                      ref={scrollRefs[2]}
                      className="flex overflow-x-auto scrollbar-hide gap-4 p-4 bg-gray-200 scroll-smooth h-full"
                    >
                      {images1.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-60"
                        >
                          <Link to={`/productdetails/${item.id}`}>
                            <img
                              src={item.src}
                              alt={`img-${index + 1}`}
                              className="w-full h-[300px] object-cover hover:opacity-80 transition"
                            />
                          </Link>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scroll("right", 2)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>

                {/* BOYS Tab */}
                <div
                  className={`absolute w-full transition-opacity duration-300 ${
                    activeTab === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative h-full">
                    <button
                      onClick={() => scroll("left", 3)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8592;
                    </button>

                    <div
                      ref={scrollRefs[3]}
                      className="flex overflow-x-auto scrollbar-hide gap-4 p-4 bg-gray-200 scroll-smooth h-full"
                    >
                      {images2.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-60"
                        >
                          <Link to={`/productdetails/${item.id}`}>
                            <img
                              src={item.src}
                              alt={`img-${index + 1}`}
                              className="w-full h-[300px] object-cover hover:opacity-80 transition"
                            />
                          </Link>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scroll("right", 3)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>

                {/* GIRLS Tab */}
                <div
                  className={`absolute w-full transition-opacity duration-300 ${
                    activeTab === 4 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative h-full">
                    <button
                      onClick={() => scroll("left", 4)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8592;
                    </button>

                    <div
                      ref={scrollRefs[4]}
                      className="flex overflow-x-auto scrollbar-hide gap-4 p-4 bg-gray-200 scroll-smooth h-full"
                    >
                      {images3.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-60"
                        >
                          <Link to={`/productdetails/${item.id}`}>
                            <img
                              src={item.src}
                              alt={`img-${index + 1}`}
                              className="w-full h-[300px] object-cover hover:opacity-80 transition"
                            />
                          </Link>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scroll("right", 4)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md z-10"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
