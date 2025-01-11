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
        maxres: {
          url: URL;
        };
      };
    };
  }

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const { playid } = context;
  const [handledata, setHandleData] = useState<YoutubeDataItem[]>([]);
  const [handleId, setHandleId] = useState<string[]>([]);
  const [handleTitle, setHandleTitle] = useState<string[]>([]);
  const [handleThumbnail, setHandleThumbnail] = useState<URL[]>([]);

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

  useEffect(() => {
    setTimeout(() => {
      console.log(handledata);
    }, 7000);
  }, [handledata]);

  // mapping over item of json and setting value of id title and thumbnail :)
  // datas are parameter we are passing handle data through datas
  function setData() {
    if (handledata.length > 0) {
      handledata.forEach((datas, index) => {
        setHandleTitle((prev) => [...prev, datas.snippet.title]);
        // setHandleThumbnail((prev) => [
        //   ...prev,
        //   datas.snippet.thumbnails.maxres.url,
        // ]);
      });
    }
    console.log(handleTitle); // This will show the updated titles
  }

  // useEffect(() => {
  //   if (handledata.length > 0) {
  //     setData(); // Call setData only when handledata is populated
  //   }
  // }, [handledata]); // Re-run the effect when handledata changes

  return (
    <div>
      <button onClick={fetchYoutubeData} className="border-2 border-black ">
        Search
      </button>
      <h1>Hello dai</h1>
    </div>
  );
}
