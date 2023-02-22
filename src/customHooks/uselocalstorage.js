import { useState, useEffect } from "react";
function getLocalStorageValue(key) {
    // Handle if empty object
    const storedValue = localStorage.getItem(key);
    try {
      //if JSON value turn to dict, else do nothing
      return JSON.parse(storedValue);
    } catch {}
    return storedValue;
  }
  
  function setLocalStorageValue(key, value) {
    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }
  
  export function useLocalStorage(key, initialValue = null) {
    //Get value from localstorage first, if null get intial value
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
      // Adds to when mounts
      window.addEventListener("storage", handleChange);
      
      // Removes when dismounts
      return function cleanup() {
        window.removeEventListener("storage", handleChange);
      };
    }, [key]);
  
    return [state, setState];
  }

