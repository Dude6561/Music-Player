import { useContext } from "react";
import { Passcontext } from "./App";

export default function SearchHandle() {
  const YOUR_API_KEY = "";
  const context = useContext(Passcontext);

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const { playid } = context;

  const fetchYoutubeData = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playid}&key=${YOUR_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed To Fetch Data");
      }
      const data = await response.json();
      console.log(data);
      console.log(data.items[0].snippet.title);
    } catch (Error) {
      console.error("error fetching youtube Data");
    }
  };

  return (
    <div>
      <button onClick={fetchYoutubeData} className="border-2 border-black ">
        Search
      </button>
    </div>
  );
}
