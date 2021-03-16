import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/riedel28/test-task"
        target="_blank"
        rel="noopener noreferrer"
        className="user-info-link"
      >
        Test task #3
      </a>{' '}
      |{' '}
      <a
        href="https://github.com/riedel28"
        target="_blank"
        rel="noopener noreferrer"
        className="user-info-link"
      >
        <GithubOutlined /> riedel28
      </a>
    </footer>
  );
};

export default Footer;
