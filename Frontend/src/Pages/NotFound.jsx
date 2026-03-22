import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (overlayRef.current) {
        const mask = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 150px)`;
        overlayRef.current.style.maskImage = mask;
        overlayRef.current.style.webkitMaskImage = mask;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Page Not Found
        </h1>

        <p className="text-lg md:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <Link
          to="/"
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded transition"
        >
          Go Home
        </Link>
      </div>

      {/* Spotlight Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-20 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle 120px at 50% 50%, transparent 0%, black 150px)",
          WebkitMaskImage:
            "radial-gradient(circle 120px at 50% 50%, transparent 0%, black 150px)",
        }}
      ></div>
    </div>
  );
};

export default NotFound;