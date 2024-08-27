import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //ref hook
  const passwordRef = useRef(null);
  const passwordGenertor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*-_+={}[]~`";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, charAllowed, setPassword]);
  //optimise if dependencies changes
  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    alert("Password Copied to Clipboard");
  }, [password]);
  //page load pe run hota hai use effect
  useEffect(() => {
    passwordGenertor();
  }, [length, number, charAllowed]);
  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-lg shadow-lg mt-20 bg-gradient-to-r from-pink-500 to-yellow-500">
        <h1 className="mt-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          PassWord - Generator
        </h1>
        <div
          className="flex shadow
      rounded-lg overflow-hidden mt-5 ml-2 mr-5 bg-cyan-500 "
        >
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-emerlad-500 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ml-2">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center mt-2 mb-2 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              className="w-4 h-4 "
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center mt-2 mb-2 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="w-4 h-4"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
