import React from 'react';

const NewsItem = ({ heading, children }: { heading: any, children: any }) => {
  return (
    <div>
      <h2>{heading}</h2>
      <p>{children}</p>
    </div>
  );
};

export default NewsItem;
