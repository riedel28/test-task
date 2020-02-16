import React from 'react';

const NewsItem = ({
  title,
  children,
  creator,
  createdAt,
}: {
  title: any,
  children: any,
  creator: any,
  createdAt: any,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <span className="creator">{creator.displayName}</span> ·{' '}
      <span className="created-at">{createdAt}</span>
      <p>{children}</p>
    </>
  );
};

export default NewsItem;
