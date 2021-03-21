import React, { useCallback } from 'react';
import { Form, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { editPost } from '../../actions/editPost';
import { getFeedPosts } from '../../selectors/feedSelectors';

import { Post as PostType } from '../../types';
import PostForm from './PostForm';
import AuthErrorMessage from '../AuthErrorMessage/AuthErrorMessage';
import { getAuthStatus } from '../../selectors/authSelectors';

type Params = {
  id: string;
};

const EditPost: React.FC = () => {
  const [form] = Form.useForm();

  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const post = posts.find((post) => post._id === params.id) as PostType;
  const isLoggedIn = useSelector(getAuthStatus);

  const history = useHistory();
  const dispatch = useDispatch();

  const onEditPost = useCallback(
    (id: string, post: Pick<PostType, 'title' | 'content'>) =>
      dispatch(editPost(id, post)),
    [dispatch]
  );

  const handleSubmit = () => {
    const { title, content } = form.getFieldsValue();
    const key = 'updatable';

    message.loading({ content: 'Saving post...', key });
    setTimeout(() => {
      onEditPost(post?._id, {
        title,
        content
      });

      message.success({ content: 'Post saved!', key, duration: 2 });

      history.push('/news');
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <AuthErrorMessage>
        You need to be logged in to edit this post
      </AuthErrorMessage>
    );
  }

  return (
    <PostForm
      onSubmit={handleSubmit}
      form={form}
      title="Edit post"
      initialValues={{
        remember: true,
        title: post?.title,
        content: post?.content
      }}
    />
  );
};

export default EditPost;
