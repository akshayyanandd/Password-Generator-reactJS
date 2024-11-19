import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

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
  }, [length, number, charAllowed]);

  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    alert("Password Copied to Clipboard");
  }, [password]);

  useEffect(() => {
    passwordGenertor();
  }, [length, number, charAllowed, passwordGenertor]);

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <div className="password-container">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="password-input"
        />
        <button onClick={copyPasswordClipboard} className="copy-button">
          Copy
        </button>
      </div>
      <div className="controls">
        <div className="control-item">
          <label>Length: {length}</label>
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="control-item">
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div className="control-item">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
