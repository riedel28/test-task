import React, { useCallback } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Row, Col, Typography, Space, Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { deletePost } from '../../actions/deletePost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedPosts } from '../../selectors/feedSelectors';
import displayDateTime from '../../helpers/displayDateTime';

import { Post as PostType } from '../../types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import NotFound from '../NotFound/NotFound';

type Params = {
  id: string;
};

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const ShowPost: React.FC = () => {
  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const isLoggedIn = useSelector(getAuthStatus);

  const post = posts.find((post) => post._id === params.id) as PostType;
  const dispatch = useDispatch();
  const history = useHistory();

  const onDelete = useCallback(
    (id: string) => {
      dispatch(deletePost(id));

      history.push('/');
    },
    [dispatch, history]
  );

  const showConfirmDialog = () => {
    confirm({
      title: 'Delete post',
      icon: <DeleteOutlined />,
      content: 'Are you sure you want to delete this post?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDelete(post._id);
      },
      onCancel() {
        return;
      }
    });
  };

  if (!post) {
    return <NotFound />;
  }

  return (
    <Row style={{ paddingBottom: '30px' }}>
      <Col span={12} offset={6}>
        <Typography>
          <Title style={{ color: '#000033' }}>{post.title}</Title>
        </Typography>

        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: '30px' }}
        >
          <Space>
            <Paragraph style={{ color: '#000033' }}>
              {post.creator.displayName}&nbsp;&nbsp;·
            </Paragraph>
            <Paragraph style={{ color: '#000033' }}>
              {displayDateTime(post.createDate)}
            </Paragraph>
          </Space>
          {isLoggedIn && (
            <Space>
              <NavLink
                to={`/news/edit/${post._id}`}
                style={{ marginRight: '5px' }}
              >
                <Button icon={<EditOutlined />}>Edit</Button>
              </NavLink>
              <Button
                onClick={showConfirmDialog}
                icon={<DeleteOutlined />}
                danger
              >
                Delete
              </Button>
            </Space>
          )}
        </Row>

        <Paragraph
          style={{ lineHeight: 1.7, fontSize: '1rem', color: '#000033' }}
        >
          {post.content}
        </Paragraph>
      </Col>
    </Row>
  );
};

export default ShowPost;
