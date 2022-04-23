import React from 'react';
import ReactDOM from 'react-dom/client';
import { Upvote } from './components/upvote';

window.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.action-upvote-container')
    .forEach((upvoteElement) => {
      const { threadId, upvotes } = (upvoteElement as HTMLElement).dataset as {
        threadId?: string;
        upvotes?: string;
      };

      if (!threadId) {
        return;
      }

      ReactDOM.createRoot(upvoteElement).render(
        <Upvote id={threadId} count={Number(upvotes)} />
      );
    });
});
