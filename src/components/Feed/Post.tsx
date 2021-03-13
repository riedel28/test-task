import React from 'react';
import { Button, Typography, Divider, Modal, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { deletePost } from '../../actions/deletePost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedPosts } from '../../selectors/feedSelectors';
import displayDateTime from '../../helpers/displayDateTime';
import shortenText from '../../helpers/shortenText';
import { Post as PostType } from '../../types';

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;

const NewsItem = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const posts = useSelector(getFeedPosts);
  const isLoggedIn = useSelector(getAuthStatus);

  const { title, content, creator, createDate } = posts.find(
    (post) => post._id === id
  ) as PostType;

  const onDelete = (id: string) => dispatch(deletePost(id));

  const showConfirmDialog = () => {
    confirm({
      title: 'Delete post',
      icon: <DeleteOutlined />,
      content: 'Are you sure you want to delete this post?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDelete(id);
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <article>
      <NavLink to={`/news/${id}`}>
        <Title level={3}>{title}</Title>
      </NavLink>

      <div className="post">
        <div className="post-meta">
          <Text>{creator.displayName}</Text> ·{' '}
          <Text>{displayDateTime(createDate)}</Text>
        </div>

        {isLoggedIn && (
          <Space direction="horizontal">
            <NavLink to={`/news/edit/${id}`} style={{ marginRight: '5px' }}>
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
      </div>
      <Paragraph>{shortenText(content)}</Paragraph>
      <Divider />
    </article>
  );
};

export default NewsItem;
