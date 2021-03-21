import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link
        to="https://github.com/riedel28/test-task"
        target="_blank"
        rel="noopener noreferrer"
      >
        Test task #3
      </Link>{' '}
      |{' '}
      <a
        href="https://github.com/riedel28"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubOutlined /> riedel28
      </a>
    </footer>
  );
};

export default Footer;
