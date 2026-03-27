// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { FileSearch } from "lucide-react";

// export default function NotFound() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-6">
//       <Card className="max-w-lg w-full text-center shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-lg animate-fadeIn rounded-3xl overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500 via-orange-500 to-yellow-500"></div>
//         <CardContent className="py-16">
//           {/* Icon */}
//           <div className="flex justify-center mb-6">
//             <div className="bg-red-50 p-6 rounded-full ring-8 ring-red-50/50">
//               <FileSearch className="w-16 h-16 text-red-500" />
//             </div>
//           </div>

//           {/* 404 Text */}
//           <div className="mb-6">
//             <h1 className="text-8xl font-black text-gray-200 absolute left-1/2 -translate-x-1/2 -top-4 opacity-50 z-0 select-none">
//               404
//             </h1>
//             <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1533] relative z-10">
//               Page Not Found
//             </h2>
//           </div>

//           {/* Subtitle */}
//           <p className="text-md md:text-lg mb-10 text-gray-600 text-center px-4 leading-relaxed">
//             Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
//             Check the URL or return home to find what you need.
//           </p>

//           {/* Button */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
//             <Link href="/" className="w-full sm:w-auto">
//               <Button className="w-full bg-[#0B1533] text-white hover:bg-[#1a2445] px-8 py-6 h-auto text-lg font-medium cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-105 rounded-2xl shadow-xl">
//                 Back to Home
//               </Button>
//             </Link>
//             <Button
//               variant="outline"
//               onClick={() => globalThis.history.back()}
//               className="w-full sm:w-auto border-2 border-gray-200 hover:bg-gray-50 px-8 py-6 h-auto text-lg font-medium cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-105 rounded-2xl"
//             >
//               Go Back
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Animation */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-6">
      <Card className="max-w-lg w-full text-center shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md animate-fadeIn rounded-3xl">
        <CardContent className="py-12">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#0B1533]/10 p-4 rounded-full">
              <Clock className="w-10 h-10 text-[#0B1533]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1533]">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="text-md md:text-lg mb-8 text-gray-600 text-center px-4">
            🚀 We’re working hard to bring this feature to life.
            <br />
            Stay tuned — something amazing is on the way!
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-[#0B1533] text-white hover:bg-[#1a2445] px-8 py-4 h-auto text-lg font-medium cursor-pointer flex items-center gap-2 transition-transform hover:scale-105 rounded-full shadow-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
