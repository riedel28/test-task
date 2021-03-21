import React, { useState, useCallback, useEffect } from 'react';
import { Row, Menu } from 'antd';
import {
  HomeOutlined,
  ReadOutlined,
  FormOutlined,
  GoogleOutlined,
  UserOutlined,
  LogoutOutlined
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
    <Row justify="space-between" style={{ borderBottom: '1px solid #f0f0f0' }}>
      <Menu
        mode="horizontal"
        selectedKeys={[currentMenuItem]}
        style={{ border: 'none' }}
        className="menu"
      >
        <Menu.Item key="/" icon={<HomeOutlined />} className="menu-item">
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/news" icon={<ReadOutlined />} className="menu-item">
          <NavLink to="/news">News</NavLink>
        </Menu.Item>

        {isLoggedIn && (
          <Menu.Item
            key="news/new"
            icon={<FormOutlined />}
            className="menu-item"
          >
            <NavLink to="/news/new">New post</NavLink>
          </Menu.Item>
        )}
      </Menu>
      <Menu mode="horizontal" style={{ border: 'none' }}>
        {!isLoggedIn ? (
          <Menu.Item
            key="/login"
            onClick={onLogin}
            icon={<GoogleOutlined />}
            className="menu-item"
          >
            Log in with Google
          </Menu.Item>
        ) : (
          <Menu.SubMenu title={user?.name}>
            <Menu.Item
              key="/profile"
              icon={<UserOutlined />}
              className="menu-item"
            >
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item
              key="/logout"
              onClick={onLogout}
              icon={<LogoutOutlined />}
            >
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </Row>
  );
};

export default Header;
