import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Sidebar from "../components/Sidebar";

function Home() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
    });

    // Wait ~3.6s to show content (matches GSAP timeline duration)
    const timeout = setTimeout(() => setShowContent(true), 1900);
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: 0,
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.2,
      x: 0,
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: 0.2,
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");
    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
        duration: 0.5,
      });
      gsap.to(".sky", {
        x: xMove,
        duration: 0.5,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
        duration: 0.5,
      });
    };

    main.addEventListener("mousemove", handleMouseMove);
    return () => main.removeEventListener("mousemove", handleMouseMove);
  }, [showContent]);

  return (
    <>
      <div className={`svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000] ${showContent ? "hidden" : ""}`}>
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  AZIZ
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
    {showContent && (
      <div className="main w-full rotate-[-10deg] scale-[1.7]">
        <div className="landing overflow-hidden relative w-full h-screen bg-black">
          <div className="navbar absolute top-0 left-0 z-[10] w-full py-4 px-5 md:py-10 md:px-10">
            <div className="logo flex gap-4 md:gap-7">
                 <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
              <h3 className="text-2xl md:text-4xl -mt-[6px] text-white">Abdul Aziz</h3>
            </div>
          </div>
          <div className="imagesdiv relative overflow-hidden w-full h-screen">
            <img
              className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
              src="./sky.png"
              alt=""
            />
            <img
              className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
              src="./bg.png"
              alt=""
            />
            <div className="text text-white flex flex-col gap-2 absolute top-10 md:top-20 left-1/2 -translate-x-1/2 scale-[1.2] md:scale-[1.4] rotate-[-10deg] text-center">
              <h1 className="text-5xl md:text-[10rem] leading-none">Videos</h1>
              <h1 className="text-5xl md:text-[10rem] leading-none">Reels</h1>
              <h1 className="text-5xl md:text-[10rem] leading-none">Montages</h1>
            </div>
            <img
              className="absolute character bottom-[-100%] md:bottom-[-150%] right-0 scale-[2] md:scale-[3] rotate-[-20deg] w-[300px] md:w-[600px]"
              src="./Abdul.png"
              alt=""
            />
          </div>
          <div className="btmbar text-white absolute bottom-0 left-0 w-full py-5 px-5 md:py-15 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-2xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-sm md:text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[35px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./merged.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-auto md:h-screen flex flex-col md:flex-row items-center justify-center bg-black px-5 md:px-0">
            <div className="cntnr flex flex-col md:flex-row text-white w-full max-w-[1200px] py-10 md:h-[80%]">
             <div className="limg relative w-full md:w-1/2 h-auto md:h-full flex justify-center md:block">
  <img
    src="./azizbg.png"
    alt="Abdul Aziz background"
    className="
      relative
      max-w-[300px] w-full h-auto object-contain
      md:absolute md:scale-[1.1] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-none md:h-auto
    "
  />
</div>

              <div className="rg w-full md:w-[30%] py-10">
                <h1 className="text-4xl md:text-6xl">Cut Fast,</h1>
                <h1 className="text-4xl md:text-6xl">Make It Last</h1>
                <p className="mt-5 text-base md:text-xl font-[Helvetica_Now_Display]">
                  I'm a short-form video editor who turns moments into cinematic stories. From punchy Reels and snappy trailers to mouthwatering food edits and slick fashion cuts — I craft content that hooks in seconds.
                </p>
                <p className="mt-3 text-base md:text-xl font-[Helvetica_Now_Display]">
                  I use Adobe Premiere Pro and After Effects to elevate everything — adding motion, rhythm, and polish to every frame. Whether it’s a talking head or a montage, I make sure your visuals move people.
                </p>
                <p className="mt-5 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Let’s make your content scroll-stopping and share-worthy. Ready to stand out in a sea of sameness? Hit that button.
                </p>
                <button className="bg-yellow-500 px-5 py-3 text-black mt-5 text-xl md:text-4xl">
                  Let’s Work Together
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
       
);
}

export default Home;