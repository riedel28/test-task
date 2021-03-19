import React, { useCallback } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Row, Col, Typography, Space, Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { deletePost } from '../../actions/deletePost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedPosts, getFeedError } from '../../selectors/feedSelectors';
import displayDateTime from '../../helpers/displayDateTime';
import dictionary from '../../dictionary';
import { Post as PostType } from '../../types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type Params = {
  id: string;
};

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const ShowPost: React.FC = () => {
  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const isLoggedIn = useSelector(getAuthStatus);
  const error = useSelector(getFeedError);
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
    return (
      <div className="ion-text-center">
        {error ? (
          <h2>{dictionary[error.message]}</h2>
        ) : (
          <>
            <h2>Post not found</h2>
            <NavLink to="/">Go home</NavLink>
          </>
        )}
      </div>
    );
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
          style={{ margin: '-20px 0 20px' }}
        >
          <Space>
            <Title level={5} style={{ color: '#000033' }}>
              {post.creator.displayName}&nbsp;&nbsp;·
            </Title>
            <Title level={5} style={{ color: '#000033' }}>
              {displayDateTime(post.createDate)}
            </Title>
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
