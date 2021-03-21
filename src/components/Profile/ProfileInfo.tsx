import React from 'react';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';

import { getUser, getAuthError } from '../../selectors/authSelectors';
import dictionary from '../../dictionary';
import AuthErrorMessage from '../AuthErrorMessage/AuthErrorMessage';

const { Title } = Typography;

const ProfileInfo: React.FC = () => {
  const user = useSelector(getUser);
  const error = useSelector(getAuthError);

  if (error) {
    return <AuthErrorMessage>{dictionary[error.message]}</AuthErrorMessage>;
  }

  return user?.name ? <Title level={2}>{user?.name}</Title> : null;
};

export default ProfileInfo;
