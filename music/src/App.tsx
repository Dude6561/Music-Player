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
    <div>
      <input
        type="text"
        className="border-2 border-black "
        onChange={handleinput}
      />
      <Passcontext.Provider value={{ playid }}>
        <SearchHandle />
      </Passcontext.Provider>

      <h1>{playid}</h1>
    </div>
  );
}
