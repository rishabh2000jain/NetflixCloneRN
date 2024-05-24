import {createContext, useContext, useEffect, useRef, useState} from 'react';

type OnCompleteType = (data: any) => void;

export const DebounceContext = createContext<Map<string, NodeJS.Timeout>>(
  new Map<string, NodeJS.Timeout>(),
);

export function useDebounce({
  onComplete,
  onStart,
  key,
  time = 700,
}: {
  onComplete: OnCompleteType;
  onStart?:()=>void;
  time: number;
  key: string;
}) {
  const debounceMapRef = useRef(useContext(DebounceContext));
  const debounce = (data: any) => {
    const debounceMap = debounceMapRef.current;
    if (debounceMap.has(key)) {
      clearTimeout(debounceMap.get(key));
    }else{
      onStart?.();
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
