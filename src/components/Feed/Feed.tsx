import React, { useEffect, useCallback } from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NewsItem from './NewsItem';
import { fetchFeed } from '../../actions/fetchFeed';
import { getFeedPosts, getFeedError } from '../../selectors/feedSelectors';
import dictionary from '../../dictionary';
import { Post as PostType } from '../../types';

const { Title, Paragraph } = Typography;

const Feed: React.FC = () => {
  const news = useSelector(getFeedPosts);
  const newsIds = news.map((post: PostType) => post._id);
  const error = useSelector(getFeedError);
  const dispatch = useDispatch();

  const fetchPosts = useCallback(() => dispatch(fetchFeed()), [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (error) {
    return (
      <div className="ion-text-center">
        <h2>{dictionary[error.message]}</h2>
      </div>
    );
  }

  return (
    <Row>
      <Col span={12} offset={6}>
        <Typography>
          <Title>News Feed</Title>
        </Typography>
        {news.length < 1 ? (
          <Row justify="center">
            <div style={{ textAlign: 'center' }}>
              <Title level={2}>No news yet</Title>

              <Title level={5}>
                <NavLink to="/news/new">
                  <Space>
                    You can write a post yourself
                    <EditOutlined />
                  </Space>
                </NavLink>
              </Title>
              <Paragraph>You need to be logged in for this.</Paragraph>
            </div>
          </Row>
        ) : (
          newsIds.map((id: string) => {
            return <NewsItem key={id} id={id} />;
          })
        )}
      </Col>
    </Row>
  );
};

export default Feed;
