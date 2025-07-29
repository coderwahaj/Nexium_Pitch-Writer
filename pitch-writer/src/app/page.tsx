// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Rocket } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Brain, Zap, Lightbulb, Wand2 } from "lucide-react";
// function FloatingParticles() {
//   const [particles, setParticles] = useState<
//     {
//       left: string;
//       top: string;
//       animationDelay: string;
//       animationDuration: string;
//     }[]
//   >([]);

//   useEffect(() => {
//     const generatedParticles = [...Array(12)].map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       animationDelay: `${Math.random() * 3}s`,
//       animationDuration: `${3 + Math.random() * 2}s`,
//     }));
//     setParticles(generatedParticles);
//   }, []);

//   return (
//     <div className="absolute inset-0 -z-5 pointer-events-none">
//       {particles.map((style, i) => (
//         <div
//           key={i}
//           className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce-slow"
//           style={style}
//         />
//       ))}
//     </div>
//   );
// }

// export default function HomePage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Floating decorative elements */}
//       <div className="absolute inset-0 -z-10 pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
//         <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-32 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
//         <div className="absolute top-1/2 left-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
//         <div className="absolute top-1/3 right-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
//         <div className="absolute left-3 top-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-16 left-1/4 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
//         <div className="absolute left-3 top-1/2 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
//         <div className="absolute top-16 left-2/4 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
//         <div className="absolute bottom-1/2 right-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
//         <div className="absolute bottom-1/3 left-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
//       </div>

//       {/* Floating particles */}

//       <FloatingParticles />
//       {/* Decorative Icon Grid */}
//       <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-0">
//         <div className="flex items-start justify-start p-4 opacity-30">
//           <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
//         </div>
//         <div className="flex items-start justify-center p-4 opacity-30">
//           <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
//         </div>
//         <div className="flex items-start justify-end p-4 opacity-30">
//           <Lightbulb className="w-6 h-6 text-blue-300 animate-pulse" />
//         </div>

//         <div className="flex items-center justify-start p-4 opacity-20">
//           <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
//         </div>
//         <div className="flex items-center justify-center p-4 opacity-20">
//           {/* Optionally leave empty or add a center icon */}
//         </div>
//         <div className="flex items-center justify-end p-4 opacity-30">
//           <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
//         </div>

//         <div className="flex items-end justify-start p-4 opacity-20">
//           <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
//         </div>
//         <div className="flex items-end justify-center p-4 opacity-30">
//           <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
//         </div>
//         <div className="flex items-end justify-end p-4 opacity-30">
//           <Brain className="w-8 h-8 text-blue-400 animate-bounce-slow" />
//         </div>
//       </div>

//       {/* Top Right Login */}
//       <div className="absolute top-6 right-6 z-10">
//         <Link href="/login">
//           <Button
//             variant="ghost"
//             className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-lg rounded-full px-6"
//           >
//             Login
//           </Button>
//         </Link>
//       </div>

//       {/* Main Card */}
//       <div className="flex items-center justify-center min-h-screen px-6 z-10 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="bg-white/1 backdrop-blur-lg border  shadow-2xl p-12 rounded-3xl max-w-xl text-center"
//         >
//           <Rocket className="w-14 h-14 mx-auto mb-6 text-white bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-full shadow-lg" />

//           <h1 className="text-5xl font-bold font-orbitron text-white mb-4">
//             Welcome to PitchPro
//           </h1>

//           <p className="text-gray-200 mb-8 text-lg">
//             Craft stunning pitches effortlessly with AI-powered magic.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link href="/login">
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full shadow-md hover:scale-105 transition-transform"
//               >
//                 Get Started
//               </Button>
//             </Link>

//             <Link href="/about">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white/30 text-black hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-md"
//               >
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Zap, Lightbulb, Wand2 } from "lucide-react";
function FloatingParticles() {
  const [particles, setParticles] = useState<
    {
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }[]
  >([]);

  useEffect(() => {
    const generatedParticles = [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 -z-5 pointer-events-none">
      {particles.map((style, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce-slow"
          style={style}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="absolute left-3 top-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-16 left-1/4 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute left-3 top-1/2 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-16 left-2/4 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-1/2 right-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-1/3 left-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      {/* Floating particles */}

      <FloatingParticles />
      {/* Decorative Icon Grid */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-0">
        <div className="flex items-start justify-start p-4 opacity-30">
          <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>
        <div className="flex items-start justify-center p-4 opacity-30">
          <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
        </div>
        <div className="flex items-start justify-end p-4 opacity-30">
          <Lightbulb className="w-6 h-6 text-blue-300 animate-pulse" />
        </div>

        <div className="flex items-center justify-start p-4 opacity-20">
          <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
        </div>
        <div className="flex items-center justify-center p-4 opacity-20">
          {/* Optionally leave empty or add a center icon */}
        </div>
        <div className="flex items-center justify-end p-4 opacity-30">
          <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
        </div>

        <div className="flex items-end justify-start p-4 opacity-20">
          <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
        </div>
        <div className="flex items-end justify-center p-4 opacity-30">
          <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>
        <div className="flex items-end justify-end p-4 opacity-30">
          <Brain className="w-8 h-8 text-blue-400 animate-bounce-slow" />
        </div>
      </div>

      {/* Main Card */}
      <div className="flex items-center justify-center min-h-screen px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/1 backdrop-blur-lg border  shadow-2xl p-12 rounded-3xl max-w-xl text-center"
        >
          <Rocket className="w-14 h-14 mx-auto mb-6 text-white bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-full shadow-lg" />

          <h1 className="text-5xl font-bold font-orbitron text-white mb-4">
            Welcome to PitchPro
          </h1>

          <p className="text-gray-200 mb-8 text-lg">
            Craft stunning pitches effortlessly with AI-powered magic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full shadow-md hover:scale-105 transition-transform"
              >
                Get Started
              </Button>
            </Link>

            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-black hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-md"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
