import React from 'react';

const NewsItem = ({ title, children }: { title: any, children: any }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
};

export default NewsItem;
