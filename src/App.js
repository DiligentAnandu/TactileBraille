import React, { useState } from "react";
import "./styles.css"; // Import your CSS file here

const App = () => {
  const [inputText, setInputText] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    const uppercaseMessage = inputText.toUpperCase(); // Uppercase the message
    const formData = new FormData();
    formData.append("message", uppercaseMessage);
    console.log(inputText)
    try {
      const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        body: formData,
      });
      // Handle response as needed
      console.log("Text submitted:", inputText);
      setMessageHistory([...messageHistory, inputText]); // Add sent message to history
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
      <div className="history-container">
        <h2>Message History</h2>
        <ul>
          {messageHistory.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;