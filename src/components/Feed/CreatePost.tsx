import React from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  message,
  Space
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createPost } from '../../actions/createPost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { Post } from '../../types';

const { Title } = Typography;
const { TextArea } = Input;

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
    <Row style={{ paddingBottom: '30px' }}>
      <Col span={12} offset={6}>
        <Typography>
          <Title style={{ color: '#000033' }}>Create new post</Title>
        </Typography>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Post title"
            name="title"
            rules={[{ required: true, message: "Post title can't be empty" }]}
          >
            <Input size="large" type="text" required />
          </Form.Item>
          <Form.Item
            label="Post content"
            name="content"
            rules={[
              { required: true, message: 'You should provide some content' }
            ]}
          >
            <TextArea rows={10} />
          </Form.Item>

          <Form.Item>
            <Row justify="end">
              <Button type="primary" htmlType="submit" size="large">
                Save
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreatePost;
