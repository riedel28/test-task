import React from 'react';
import { Row, Col, Typography } from 'antd';

import ProfileInfo from './ProfileInfo';

const { Title } = Typography;

const Profile: React.FC = () => {
  return (
    <Row>
      <Col offset={1}>
        <Title>Profile</Title>
        <ProfileInfo />
      </Col>
    </Row>
  );
};

export default Profile;
