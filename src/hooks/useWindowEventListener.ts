import { useEffect } from 'react';

export function useWindowEventListener<T extends keyof GlobalEventHandlersEventMap>(
  eventName: T,
  listener: (event: GlobalEventHandlersEventMap[T]) => void
): void {
  useEffect(() => {
    window.addEventListener(eventName, listener);

    return (): void => {
      window.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
}
