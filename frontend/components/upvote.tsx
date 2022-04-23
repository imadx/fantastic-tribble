import React, { useState } from 'react';
import { useUpvoteCount } from '../hooks/upvotes';

interface UpvoteProps {
  id: string;
  count: number;
}

export const Upvote = ({ id, count }: UpvoteProps) => {
  const [upvoteCount, setUpvoteCount] = useState(count.toString());

  useUpvoteCount(id, (count) => {
    setUpvoteCount(count);
  });

  const handleOnClick = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      setUpvoteCount((Number(upvoteCount) + 1).toString());
      await fetch(`/thread/${id}/upvote`, { method: 'POST' });
    } catch (exception) {
      setUpvoteCount('-');
    }
  };

  return (
    <>
      <a
        href="#"
        className="action-upvote"
        data-thread-id={id}
        data-upvotes={upvoteCount}
        onClick={handleOnClick}
      >
        Upvote
      </a>
    </>
  );
};
