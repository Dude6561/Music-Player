import { useState, createContext } from "react";
import SearchHandle from "./searchHandle";

interface Passvalue {
  playid: any;
}
export const Passcontext = createContext<Passvalue | null>(null);

export default function App() {
  const [playid, setPlayid] = useState<any>();

  function handleinput(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayid(event.target.value);
  }

  return (
    <div className="">
      <input
        type="text"
        className=" relative border-2 border-black  top-2 p-1 left-[800px] rounded-xl"
        onChange={handleinput}
      />
      <Passcontext.Provider value={{ playid }}>
        <SearchHandle />
      </Passcontext.Provider>
      <h1>day 4 of not learning anything</h1>
    </div>
  );
}
