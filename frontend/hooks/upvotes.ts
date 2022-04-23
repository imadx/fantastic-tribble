import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io();
const CUSTOM_EVENT_UPVOTES = 'custom-event-upvotes';

socket.on('upvote-changed', (data) => {
  window.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_UPVOTES, { detail: { ...data } })
  );
});

export const useUpvoteCount = (
  id: string,
  callback: (count: number) => void
) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.detail.id !== id) {
        return;
      }

      callback(event.detail.count);
    };

    window.addEventListener(CUSTOM_EVENT_UPVOTES, listener);

    return () => {
      window.removeEventListener(CUSTOM_EVENT_UPVOTES, listener);
    };
  }, []);
};
