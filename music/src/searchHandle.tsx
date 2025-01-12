import { useContext, useEffect } from "react";
import { Passcontext } from "./App";
import { useState } from "react";

export default function SearchHandle() {
  const YOUR_API_KEY = "AIzaSyDpYcH-GOMEBAJhe5zkRTLpQgZY4fmO_CI";
  const context = useContext(Passcontext);

  // replicated the api data structure for easyness
  interface YoutubeDataItem {
    contentDetails: {
      videoId: string;
    };
    snippet: {
      position: number;
      title: string;
      thumbnails: {
        standard: {
          url: URL;
        };
      };
    };
  }

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  //All the requried state variable
  const { playid } = context;
  const [handledata, setHandleData] = useState<YoutubeDataItem[]>([]);
  const [handleId, setHandleId] = useState<string[]>([]);
  const [handleTitle, setHandleTitle] = useState<string[]>([]);
  const [handleThumbnail, setHandleThumbnail] = useState<URL[]>([]);
  const [arrayCount, setArrayCount] = useState<number>(0);

  //fetching Data From Youtube API

  const fetchYoutubeData = async () => {
    let Apidata = null;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playid}&key=${YOUR_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed To Fetch Data");
      }
      Apidata = await response.json();
      setHandleData(Apidata.items); // Set the fetched data here
    } catch (Error) {
      console.error("error fetching youtube Data");
    }
  };

  // mapping over item of json and setting value of id title and thumbnail :)
  // datas are parameter we are passing handle data through datas
  function setData() {
    if (handledata.length > 0) {
      handledata.forEach((datas, index) => {
        setHandleTitle((prev) => [...prev, datas.snippet.title]);
        setHandleId((prev) => [...prev, datas.contentDetails.videoId]);
        setHandleThumbnail((prev) => [
          ...prev,
          datas.snippet.thumbnails.standard.url,
        ]);
      });
    }
    console.log(handleTitle);
    console.log(handleId);
    console.log(handledata);
  }

  useEffect(() => {
    if (handledata.length > 0) {
      setData(); // Call setData only when handledata is populated
    }
  }, [handledata]); // Re-run the effect when handledata changes

  // solution for double clicking because react batches the state update and the dat awasnt updating
  const handleDoubleClickSimulation = () => {
    fetchYoutubeData(); // First click
    setTimeout(() => {
      fetchYoutubeData(); // Second click after a small delay
    }, 100); // 100ms delay
  };

  //function for changing title
  function handleNext() {
    setArrayCount(arrayCount + 1);
  }
  function handlePrevious() {
    setArrayCount(arrayCount - 1);
  }

  return (
    <div className=" ">
      <div className=" ">
        <button
          onClick={handleDoubleClickSimulation}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 absolute left-[1000px]  bottom-[875px]"
        >
          Search
        </button>
      </div>

      <div className="flex items-center justify-center   space-x-8  relative top-36">
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

      <div className=" flex space-x-32 p-4 relative top-[320px] left-[850px] ">
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
      <h1 className="relative relative top-[110px] left-[900px]  font-extrabold text-white text-2xl">
        Music Name
      </h1>
      <div className="relative  top-[110px] left-[650px]  font-extrabold text-white text-2xl">
        <h1> {handleTitle[arrayCount]}</h1>
      </div>
    </div>
  );
}
