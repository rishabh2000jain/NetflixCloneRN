import {createContext, useContext, useRef, useState} from 'react';

type OnCompleteType = (data: any) => void;

export const DebounceContext = createContext<Map<string, NodeJS.Timeout>>(
  new Map<string, NodeJS.Timeout>(),
);

export function useDebounce({
  onComplete,
  key,
  time = 700,
}: {
  onComplete: OnCompleteType;
  time: number;
  key: string;
}) {
  const debounceMapRef = useRef(useContext(DebounceContext));
  const debounce = (data: any) => {
    const debounceMap = debounceMapRef.current;
    console.log(debounceMap);
    if (debounceMap.has(key)) {
      clearTimeout(debounceMap.get(key));
    }
    let timer = setTimeout(() => {
      debounceMap.delete(key);
      debounceMapRef.current = debounceMap;
      onComplete(data);
    }, time);
    debounceMap.set(key, timer);
    debounceMapRef.current = debounceMap;
  };

  return {debounce};
}
