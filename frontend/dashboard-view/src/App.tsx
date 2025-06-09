import { useState, useEffect } from "react";
import Header from "./components/Header/Header"

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 font-quicksand">
        <Header  toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      </div>
    </>
  )
}

export default App
