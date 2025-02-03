"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { Typewriter } from "react-simple-typewriter";



const LandingPage = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          color: 0x6e47ff, // Cool purple effect
          backgroundColor: 0x0d0d0d,
          maxDistance: 25,
          spacing: 20,
          THREE,
        })
      );
    }
    return () => vantaEffect?.destroy();
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="relative min-h-screen flex justify-center items-center text-white">
      
      {/* Improved Glassmorphic Card */}
      <div className="relative z-10 p-10 bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl text-center max-w-3xl border border-white/30 
                      ring-1 ring-white/20 shadow-inner">
        
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to <span className="text-purple-400">HumTrack</span>
        </h1>

        <h2 className="text-2xl sm:text-3xl font-medium text-gray-300 mt-2">
          <Typewriter
            words={[
              "Track tasks seamlessly.",
              "Manage with ease.",
              "Welcome to the future of productivity!",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        <div className="mt-6">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 
                             px-6 py-3 text-lg rounded-full font-medium shadow-lg transition duration-300">
            Get Started
          </button>
        </div>

      </div>
      
    </div>
  );
};

export default LandingPage;