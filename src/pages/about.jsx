import React, { useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Sidebar from "../components/Sidebar";

export default function About() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial animations
    tl.fromTo(
      ".hero-image",
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(
      ".hero-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
      "-=1"
    )
    .fromTo(
      ".skill-card",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      ".stats-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );

    // Parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(".parallax-bg", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { icon: "ri-movie-2-line", title: "Video Editing", description: "Crafting compelling narratives through seamless cuts and transitions" },
    { icon: "ri-film-line", title: "Motion Graphics", description: "Creating dynamic visual effects and animations" },
    { icon: "ri-sound-module-line", title: "Sound Design", description: "Enhancing videos with perfect audio synchronization" },
    { icon: "ri-camera-line", title: "Color Grading", description: "Perfecting the visual tone and atmosphere" }
  ];

  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "1M+", label: "Views Generated" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="./sky.png"
          alt="Background"
          className="parallax-bg absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      {/* Sidebar Toggle */}
      <div className="logo flex gap-4 md:gap-7 ml-[30px] mt-[30px]">

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <div className="hero-image relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border-2 border-white/10 hover:border-yellow-400/30 transition-all duration-500">
              <img
                src="./Abdul.png"
                alt="Abdul Aziz"
                className="w-full  object-cover transform hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
              Abdul Aziz
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              A passionate video editor with an eye for detail and a mind for storytelling. Specializing in creating content that captures attention and drives engagement across all platforms.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="/work"
                className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300"
              >
                View Portfolio
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-black transform hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
            >
              <i className={`${skill.icon} text-4xl text-yellow-400 mb-4 block group-hover:scale-110 transition-transform duration-300`}></i>
              <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
              <p className="text-gray-400 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stats-item text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Proficiency */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-yellow-400 text-transparent bg-clip-text">
            Software Proficiency
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Adobe Premiere Pro",
              "After Effects",
              "DaVinci Resolve",
              "Final Cut Pro"
            ].map((software, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white/5 rounded-full text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition-all duration-300"
              >
                {software}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}