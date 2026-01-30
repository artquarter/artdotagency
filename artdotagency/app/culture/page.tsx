"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Volume2, VolumeX, ArrowLeft, Loader2 } from "lucide-react"; // Added Loader2
import Link from "next/link";
import { motion } from "framer-motion";

// DUMMY DATA (Some have posters, some don't)
const VIDEOS = [
  {
    id: 1,
    url: "https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/mhuncho.mp4",
    poster: "/images/mhuncho.jpg", 
    artist: "M HUNCHO",
    desc: "Album signing tour",
    likes: 24500
  },
  {
    id: 2,
    url: "https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/%F0%9F%9A%A8%F0%9F%9A%A8%F0%9F%9A%A8%20TODAY%20IS%20%40AVIREXARCHIVES%20LAST%20DAY%20IN%20BIRMINGHAM%20%40ARTDOTSAUCE%20DOWN%20AT%20THE%20%40ARTQUARTER%20SEE%20.mp4",
    artist: "AVIRE X ARCHIVES",
    desc: "🚨🚨🚨 TODAY IS @AVIREXARCHIVES LAST DAY IN BIRMINGHAM @ARTDOTSAUCE",
    likes: 18200
  },
  {
    id: 3,
    url: "https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/Explore%20the%20world%20from%20the%20comfort%20of%20ARTBOX.%20This%20week%20we%E2%80%99re%20taking%20you%20to%20Japan!%23travelwednesd.mp4",
    artist: "ART BOX",
    desc: "Explore the world from the comfort of ARTBOX.",
    likes: 102000
  },
   {
    id: 4,
    url: "https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/Thank%20you%20for%20all%20the%20support%20shown%20throughout%20this%20eventful%20year!%20As%20we%E2%80%99ve%20entered%20a%20new%20year%20h.mp4",
    artist: "  ",
    desc: "Thank you for all the support shown throughout this eventful year!",
    likes: 102000
  },
  {
    id: 5,
    url: "https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/Shoutout%20to%20all%20the%20brands%20that%20came%20out%20%40dodeclothing%20%40kingsluxe_official%20%40opulent_vault%20%40iflys.mp4",
    artist: "  ",
    desc: "Shoutout to all the brands that came out @dodeclothing @kingsluxe_official @opulent_vault @iflys",
    likes: 102000
  },
  {
    id: 6,
    url: "https://pub-19ba6d8519c546cd9f2831cf6463db3d.r2.dev/Turn%20out%20of%20our%20SBK%20Pop-pop%20CREATIVE%20STREETWEAR%20CANDID%20SHOOTShot%20%26%20edited%20by-%20%40marah.records%20Wan.mp4",
    artist: "SBK Pop-pop",
    desc: "Turn out of our SBK Pop-pop CREATIVE STREETWEAR CANDID SHOOTShot & edited by- @marah.records Wan",
    likes: 102000
  },
];

const VideoItem = ({ data, isActive, toggleMute, isMuted }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likes);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch((err) => console.log("Autoplay blocked:", err));
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev: number) => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative w-full h-[100dvh] snap-start bg-black flex items-center justify-center overflow-hidden">
      
      <div className="relative w-full h-full md:w-[450px] md:h-[95vh] md:rounded-[2rem] overflow-hidden md:border border-white/10 shadow-2xl bg-black transition-all">
        
        {/* 0. LOADING SPINNER (Visible behind everything) */}
        {/* If no poster, this shows while video buffers */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
             <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
        </div>

        {/* 1. POSTER IMAGE (Conditionally Rendered) */}
        {/* Only renders if data.poster exists AND video hasn't loaded yet to prevent flickering */}
        {data.poster && !isVideoLoaded && (
          <img 
            src={data.poster}
            alt={data.artist}
            className="absolute inset-0 w-full h-full object-cover z-10" 
          />
        )}

        {/* 2. VIDEO PLAYER */}
        <video
          ref={videoRef}
          src={data.url}
          className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          playsInline
          loop
          muted={isMuted}
          onDoubleClick={handleLike}
          // When video has enough data to show a frame, fade it in
          onLoadedData={() => setIsVideoLoaded(true)}
        />
        
        {/* Gradient Overlay (Above video) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 pointer-events-none z-30" />

        {/* ACTIONS */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-40">
          <div className="flex flex-col items-center gap-1">
            <motion.button 
              onClick={handleLike}
              whileTap={{ scale: 0.8 }}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full transition-colors"
            >
              <Heart 
                className={`w-8 h-8 transition-all duration-300 ${liked ? "fill-red-500 text-red-500 scale-110" : "text-white fill-transparent"}`} 
              />
            </motion.button>
            <span className="text-white text-xs font-kamerick font-bold drop-shadow-md">
              {Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(likeCount)}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="absolute left-4 bottom-8 right-16 z-40 text-left pointer-events-none">
          <h3 className="font-kamerick text-2xl font-bold text-white uppercase flex items-center gap-2 mb-2 drop-shadow-lg">
              {data.artist} 
              <span className="w-2 h-2 bg-[#FFB800] rounded-full inline-block shadow-[0_0_10px_#FFB800]" />
          </h3>
          <p className="font-kamerick text-white/90 text-sm leading-snug line-clamp-2 drop-shadow-md">
            {data.desc}
          </p>
        </div>

        {/* MUTE TOGGLE */}
        <button 
          onClick={toggleMute}
          className="absolute top-24 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full z-40 active:scale-90 transition-transform"
        >
          {isMuted ? <VolumeX className="text-white w-6 h-6" /> : <Volume2 className="text-[#FFB800] w-6 h-6" />}
        </button>

      </div>
    </div>
  );
};

export default function CulturePage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleScroll = (e: any) => {
    const index = Math.round(e.target.scrollTop / window.innerHeight);
    if (index !== currentVideoIndex) {
      setCurrentVideoIndex(index);
    }
  };

  return (
    <main className="bg-black h-[100dvh] w-full overflow-hidden relative touch-none">
      
      {/* HEADER NAV */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none md:justify-center">
        <Link href="/" className="pointer-events-auto group absolute left-6 top-6 flex items-center gap-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="w-5 h-5" />
            </div>
        </Link>
        <span className="font-kamerick text-sm font-bold uppercase tracking-widest text-white/50">
            For You
        </span>
      </div>

      {/* SCROLLABLE AREA */}
      <div 
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {VIDEOS.map((video, index) => (
          <VideoItem 
            key={video.id} 
            data={video} 
            isActive={currentVideoIndex === index}
            toggleMute={() => setIsMuted(!isMuted)}
            isMuted={isMuted}
          />
        ))}
      </div>
    </main>
  );
}