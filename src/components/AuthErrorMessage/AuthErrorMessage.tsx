import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AuthErrorMessage: React.FC = ({ children }) => {
  return (
    <Row justify="center">
      <Col style={{ textAlign: 'center' }}>
        <Typography>
          <Title>Auth error</Title>
        </Typography>
        <Typography>
          <Title level={5}>{children}</Title>
        </Typography>

        <Row justify="center">
          <Title level={5}>
            <NavLink to="/">
              <Space>
                <HomeOutlined />
                Return to home page
              </Space>
            </NavLink>
          </Title>
        </Row>
      </Col>
    </Row>
  );
};

export default AuthErrorMessage;
