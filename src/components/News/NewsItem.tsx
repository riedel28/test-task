import React from 'react';

import displayDateTime from './../../helpers/displayDateTime';

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
      <span className="created-at">{displayDateTime(createdAt)}</span>
      <p>{children}</p>
    </>
  );
};

export default NewsItem;
