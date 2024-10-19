import { useState, useEffect } from "react";

export default function Loading() {
  const [loadingText, setLoadingText] = useState("loading ...");

  useEffect(() => {
    const loadingStages = ["loading ... ", "loading ..", "loading .", "loading"];
    let index = 0;

    const interval = setInterval(() => {
      setLoadingText(loadingStages[index]);
      index = (index + 1) % loadingStages.length;
    }, 500); // Change every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex items-start justify-center h-screen text-white mt-16">
      <div className="text-2xl text-center font-bold tracking-wider">
        <span className="mr-2 ">Movie Ticket</span>
        <br></br>
        <span>{loadingText}</span>
      </div>
    </div>
  );
}
