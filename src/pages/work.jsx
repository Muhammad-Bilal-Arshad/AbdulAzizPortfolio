import React, { useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Sidebar from "../components/Sidebar";

export default function Work() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Sample video data - replace with actual YouTube video IDs
  const videos = [
    {
      id: "video1",
      title: "Cinematic Montage",
      description: "A high-energy montage showcasing dynamic editing",
      youtubeId: "YOUR_YOUTUBE_ID_1",
      thumbnail: "./bg.png" // Using existing background as placeholder
    },
    {
      id: "video2",
      title: "Commercial Edit",
      description: "Fast-paced commercial with stunning transitions",
      youtubeId: "YOUR_YOUTUBE_ID_2",
      thumbnail: "./sky.png"
    },
    // Add more videos as needed
  ];

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".page-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(
      ".video-card",
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out" 
      },
      "-=0.5"
    );

    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <img
          src="./sky.png"
          alt="Sky background"
          className="parallax-bg absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

     <div className="logo flex gap-4 md:gap-7 ml-[30px] mt-[30px]">

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <h1 className="page-title text-5xl md:text-7xl lg:text-8xl font-extrabold text-center mb-12 bg-gradient-to-r from-white via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
          Featured Work
        </h1>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card group relative overflow-hidden rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="ri-play-circle-line text-6xl text-yellow-400 transform group-hover:scale-110 transition-transform duration-300"></i>
                </div>
              </div>
              <div className="p-6 bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                <p className="text-gray-300 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-6xl aspect-video">
              <button
                className="absolute -top-12 right-0 text-white text-4xl hover:text-yellow-400 transition-colors duration-300"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}