import React from 'react';
import { Row, Col, Typography, Form, message, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createPost } from '../../actions/createPost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { Post } from '../../types';
import PostForm from './PostForm';

const { Title } = Typography;

const CreatePost: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const isLoggedIn = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const onCreatePost = (post: Pick<Post, 'title' | 'content'>) =>
    dispatch(createPost(post));

  const handleSubmit = () => {
    const { title, content } = form.getFieldsValue();
    const key = 'updatable';

    message.loading({ content: 'Adding post...', key });
    setTimeout(() => {
      onCreatePost({
        title,
        content
      });

      message.success({ content: 'Post added!', key, duration: 2 });

      history.push('/news');
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <Row justify="center">
        <Col style={{ textAlign: 'center' }}>
          <Typography>
            <Title>Auth error</Title>
          </Typography>
          <Typography>
            <Title level={5}>
              You need to be logged in to create a new post
            </Title>
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
  }
  return (
    <PostForm onSubmit={handleSubmit} form={form} title="Create new post" />
  );
};

export default CreatePost;
