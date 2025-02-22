import React, { useState } from "react";
import "./styles.css"; // Import your CSS file here

const App = () => {
  const [inputText, setInputText] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/send-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      // Handle response as needed
      console.log("Text submitted:", inputText);
      setInputText(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <h1>Braille Converter</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
          placeholder="Enter text"
        />
        <button onClick={handleSubmit}>Convert to Braille</button>
      </div>
    </div>
  );
};

export default App;
