import React from 'react';

const NewsItem = ({ title, children }: { title: any, children: any }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{children}</p>
    </>
  );
};

export default NewsItem;
