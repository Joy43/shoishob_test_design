"use client";
import { useEffect, useState } from "react";

const Cursor = () => {
  const [smallPos, setSmallPos] = useState({ x: 0, y: 0 });
  const [largePos, setLargePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setSmallPos({ x: e.clientX, y: e.clientY });

      // Smooth delay for large circle
      setTimeout(() => {
        setLargePos({ x: e.clientX, y: e.clientY });
      }, 50); 
    };

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("a, button, input, textarea").forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a, button, input, textarea").forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      {/*------------- Large Red Circle (Trailing Effect)----------- */}
      <div
        className={`cursor-large ${isHovering ? "hover" : ""}`}
        style={{
          left: `${largePos.x}px`,
          top: `${largePos.y}px`,
        }}
      />
      
      {/* Small Pink Dot (Follows Instantly) */}
      <div
        className={`cursor-small ${isHovering ? "hover" : ""}`}
        style={{
          left: `${smallPos.x}px`,
          top: `${smallPos.y}px`,
        }}
      />
    </>
  );
};

export default Cursor;
