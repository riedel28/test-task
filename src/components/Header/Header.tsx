import React, { useState, useCallback, useEffect } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  ReadOutlined,
  ProfileOutlined,
  FormOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { handleLogin } from '../../actions/handleLogin';
import { handleLogout } from '../../actions/handleLogout';
import { getAuthStatus, getUser } from '../../selectors/authSelectors';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [currentMenuItem, setCurrentMenuItem] = useState(pathname);
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentMenuItem(pathname);
  }, [pathname]);

  const onLogin = useCallback(() => {
    dispatch(handleLogin());
  }, [dispatch]);

  const onLogout = useCallback(() => {
    dispatch(handleLogout());
  }, [dispatch]);

  return (
    <Menu mode="horizontal" selectedKeys={[currentMenuItem]}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="/news" icon={<ReadOutlined />}>
        <NavLink to="/news">News</NavLink>
      </Menu.Item>
      {isLoggedIn && (
        <Menu.Item key="/profile" icon={<ProfileOutlined />}>
          <NavLink to="/profile">Profile</NavLink>
        </Menu.Item>
      )}
      {isLoggedIn && (
        <Menu.Item key="news/new" icon={<FormOutlined />}>
          <NavLink to="/news/new">New post</NavLink>
        </Menu.Item>
      )}

      {!isLoggedIn ? (
        <Menu.Item
          key="login"
          onClick={onLogin}
          icon={<GoogleOutlined style={{ marginLeft: 'auto' }} />}
        >
          Log in with Google
        </Menu.Item>
      ) : (
        <Menu.Item onClick={onLogout}>{user && user.name} | Logout</Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
