import React, { useState, useEffect } from 'react';
import { useUpvoteCount } from '../hooks/upvotes';

interface UpvoteProps {
  id: string;
  count: number;
}

export const Upvote = ({ id, count }: UpvoteProps) => {
  const [upvoteCount, setUpvoteCount] = useState(count.toString());
  const [isChangeAnimationVisible, setIsChangeAnimationVisible] =
    useState(false);

  useUpvoteCount(id, (count) => {
    setUpvoteCount(count.toString());
    setTimeout(() => {
      setIsChangeAnimationVisible(true);
    }, 0);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsChangeAnimationVisible(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
      setIsChangeAnimationVisible(false);
    };
  }, [upvoteCount]);

  const handleOnClick = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      setUpvoteCount((Number(upvoteCount) + 1).toString());
      await fetch(`/thread/${id}/upvote`, { method: 'POST' });
    } catch (exception) {
      setUpvoteCount('-');
    }
  };

  const classNames = ['action-upvote'];
  if (isChangeAnimationVisible) {
    classNames.push('action-upvote--animating');
  }

  return (
    <>
      <a
        href="#"
        className={classNames.join(' ')}
        data-thread-id={id}
        data-upvotes={upvoteCount}
        onClick={handleOnClick}
      >
        Upvote
      </a>
    </>
  );
};
