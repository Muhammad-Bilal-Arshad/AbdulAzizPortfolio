import React, { useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Sidebar from "../components/Sidebar";

export default function Contact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    // Enhanced animations with staggered effects
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".contact-main",
      { scale: 0.8, rotate: -15 },
      { scale: 1, rotate: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      ".contact-heading",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(
      ".contact-description",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".form-element",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(
      ".contact-info-item",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Enhanced parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(".contact-sky", {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 1,
        ease: "power2.out"
      });
      gsap.to(".contact-bg", {
        x: xPos * 1.2,
        y: yPos * 1.2,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    gsap.to(".success-message", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="contact-main min-h-screen bg-black relative overflow-hidden">
      {/* Sidebar Toggle Button with hover effect */}
     
 
    <div className="logo flex gap-4 md:gap-7 ml-[30px] mt-[30px]">

                 <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
             
            </div>
   

      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0">
        <img
          src="./sky.png"
          alt="Sky background"
          className="contact-sky absolute top-0 left-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 ease-out"
        />
        <img
          src="./bg.png"
          alt="Background"
          className="contact-bg absolute top-0 left-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="contact-heading text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-white via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
            Get in Touch
          </h1>
          <p className="contact-description text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Whether you want to collaborate, ask questions, or just say hi — I'm all ears.
          </p>

          <form
            onSubmit={handleSubmit}
            className="form-container max-w-md mx-auto mb-12 relative"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="form-element w-full p-4 mb-4 rounded-lg bg-white/10 text-white border border-white/20 focus:border-yellow-400 outline-none transition-all duration-300 placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="form-element w-full p-4 mb-4 rounded-lg bg-white/10 text-white border border-white/20 focus:border-yellow-400 outline-none transition-all duration-300 placeholder-gray-400"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                className="form-element w-full p-4 mb-6 rounded-lg bg-white/10 text-white border border-white/20 focus:border-yellow-400 outline-none transition-all duration-300 resize-none placeholder-gray-400"
              ></textarea>
              <button
                type="submit"
                className="form-element w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Send Message
              </button>
            </div>

            {/* Success Message */}
            <div
              className={`success-message fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              bg-green-500 text-white px-8 py-4 rounded-full font-semibold scale-0 opacity-0 z-50 
              ${formSubmitted ? 'block' : 'hidden'}`}
            >
              Message sent successfully! 🎉
            </div>
          </form>

          {/* Contact Info with hover effects */}
          <div className="contact-info grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-lg">
            <div className="contact-info-item group">
              <a href="mailto:reaziz77@gmail.com" className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <i className="ri-mail-line text-2xl text-yellow-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">reaziz77@gmail.com</span>
              </a>
            </div>
            <div className="contact-info-item group">
              <a href="tel:+1234567890" className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <i className="ri-phone-line text-2xl text-yellow-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+923180590189</span>
              </a>
            </div>
            <div className="contact-info-item group">
              <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <i className="ri-map-pin-line text-2xl text-yellow-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Islamabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
