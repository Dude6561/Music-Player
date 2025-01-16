declare global {
  interface Window {
    YT: any; // This tells TypeScript about the global YT object
  }
}

import { useContext, useEffect, useState } from "react";
import { Passcontext } from "./App";

export default function SearchHandle() {
  const YOUR_API_KEY = "AIzaSyDpYcH-GOMEBAJhe5zkRTLpQgZY4fmO_CI";
  const context = useContext(Passcontext);

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const { playid } = context;
  const [handleData, setHandleData] = useState<any[]>([]);
  const [handleId, setHandleId] = useState<string[]>([]);
  const [handleTitle, setHandleTitle] = useState<string[]>([]);
  const [handleThumbnail, setHandleThumbnail] = useState<string[]>([]);
  const [arrayCount, setArrayCount] = useState<number>(0);
  const [controls, setcontrols] = useState<number>(1);

  // Load YouTube data
  const fetchYoutubeData = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playid}&key=${YOUR_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed To Fetch Data");
      }
      const Apidata = await response.json();
      setHandleData(Apidata.items);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  };

  // Set the fetched data
  useEffect(() => {
    if (handleData.length > 0) {
      handleData.forEach((data) => {
        setHandleTitle((prev) => [...prev, data.snippet.title]);
        setHandleId((prev) => [...prev, data.contentDetails.videoId]);
        setHandleThumbnail((prev) => [
          ...prev,
          data.snippet.thumbnails.standard.url,
        ]);
      });
    }
  }, [handleData]);

  // Play YouTube video using the YT API
  const fetchyoutubeAudio = (videoId: string) => {
    try {
      if (window.YT) {
        new window.YT.Player("player", {
          height: "360",
          width: "640",
          videoId,
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
            },
          },
        });
      } else {
        console.error("YouTube API not loaded.");
      }
    } catch (error) {
      console.error("Error creating YouTube player", error);
    }
  };

  // Next button handler
  const handleNext = () => {
    if (arrayCount < handleData.length - 1) {
      setArrayCount(arrayCount + 1);
    }
  };

  // Previous button handler
  const handlePrevious = () => {
    if (arrayCount > 0) {
      setArrayCount(arrayCount - 1);
    }
  };

  //function for playpause
  const pp = () => {
    if (controls == 1) {
      setcontrols(2);
    } else {
      setcontrols(1);
    }
    console.log(controls);
  };

  return (
    <div>
      <button
        onClick={() => {
          fetchYoutubeData(); // Fetch YouTube data
          if (handleId[arrayCount]) {
            fetchyoutubeAudio(handleId[arrayCount]); // Play video based on the current ID
          }
        }}
        className="text-white bg-gray-800"
      >
        Search
      </button>

      <div className="flex items-center justify-center space-x-8 relative top-36">
        <img
          src={handleThumbnail[arrayCount + 1]?.toString()}
          alt="img"
          className="h-72 w-72 box-border bg-white"
        />
        <img
          src={handleThumbnail[arrayCount]?.toString()}
          alt="img"
          className="h-96 w-96 box-border bg-white"
        />
        <img
          src={handleThumbnail[arrayCount + 2]?.toString()}
          alt="img"
          className="h-72 w-72 box-borde bg-white"
        />
      </div>

      <div className="flex space-x-32 p-4 relative top-[320px] left-[850px] ">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios/100/previous.png"
          alt="previous"
          onClick={handlePrevious}
        />
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios/100/next.png"
          alt="next"
          onClick={handleNext}
        />
      </div>

      <div className="relative top-[110px] left-[800px] font-extrabold text-white text-2xl">
        <h1 className="relative top-[110px] left-[900px] font-extrabold text-white text-2xl">
          Music Name
        </h1>
        <h1>{handleTitle[arrayCount]}</h1>
      </div>
      <div className="flex justify-center mt-10">
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${handleId[arrayCount]}?autoplay=${controls} `}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button onClick={() => pp()}>pause</button>
    </div>
  );
}
