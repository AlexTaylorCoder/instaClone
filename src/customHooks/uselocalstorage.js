import { useState, useEffect } from "react";
function getLocalStorageValue(key) {
    const storedValue = localStorage.getItem(key);
    try {
      return JSON.parse(storedValue);
    } catch {}
    return storedValue;
  }
  
  function setLocalStorageValue(key, value) {
    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }
  
  export function useLocalStorage(key, initialValue = null) {
    const storedValue = getLocalStorageValue(key);
    const [state, setState] = useState(storedValue || initialValue);
  
    useEffect(() => {
      setLocalStorageValue(key, state);
    }, [key, state]);
  
    useEffect(() => {
      function handleChange() {
        const newValue = getLocalStorageValue(key);
        setState(newValue);
      }
  
      window.addEventListener("storage", handleChange);
  
      return function cleanup() {
        window.removeEventListener("storage", handleChange);
      };
    }, [key]);
  
    return [state, setState];
  }

