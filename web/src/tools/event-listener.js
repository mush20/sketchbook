import { useEffect} from 'react';

/**
 * Custom event listener hook
 * @param target
 * @param event
 * @param listener
 */
export const useEventListener = (target, event, listener) => {
  useEffect(
    () => {
      const currentTarget = target.current;
      if (currentTarget)
        currentTarget.addEventListener(event, listener);
      return () => {
        if (currentTarget)
          currentTarget.removeEventListener(event, listener);
      };
    },
    [target, event, listener]
  );
};
