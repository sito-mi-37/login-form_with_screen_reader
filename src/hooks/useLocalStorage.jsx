import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
    // considering SSR NextJs
    if(typeof window === 'undefined') return initValue

    const localValue = JSON.parse(localStorage.getItem(key))
    // considering a localvalue already exist
    if(localValue) return localValue

    if(initValue instanceof Function) return initValue()

    return initValue
}


const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(
    () => getLocalValue(key, initValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
