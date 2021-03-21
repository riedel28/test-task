import React, { useCallback } from 'react';
import { Form, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { editPost } from '../../actions/editPost';
import { getFeedPosts } from '../../selectors/feedSelectors';

import { Post as PostType } from '../../types';
import PostForm from './PostForm';

type Params = {
  id: string;
};

const EditPost: React.FC = () => {
  const [form] = Form.useForm();

  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const post = posts.find((post) => post._id === params.id) as PostType;

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

  // return (
  //   <Row style={{ paddingBottom: '30px' }}>
  //     <Col span={12} offset={6}>
  //       <Typography>
  //         <Title style={{ color: '#000033' }}>Edit post</Title>
  //       </Typography>
  //       <Form
  //         form={form}
  //         layout="vertical"
  //         onFinish={handleSubmit}
  //         initialValues={{
  //           remember: true,
  //           title: post?.title,
  //           content: post?.content
  //         }}
  //       >
  //         <Form.Item
  //           label="Post title"
  //           name="title"
  //           rules={[{ required: true, message: "Post title can't be empty" }]}
  //         >
  //           <Input size="large" type="text" required />
  //         </Form.Item>
  //         <Form.Item
  //           label="Post content"
  //           name="content"
  //           rules={[
  //             { required: true, message: 'You should provide some content' }
  //           ]}
  //         >
  //           <TextArea rows={10} />
  //         </Form.Item>

  //         <Form.Item>
  //           <Row justify="end">
  //             <Button type="primary" htmlType="submit" size="large">
  //               Save
  //             </Button>
  //           </Row>
  //         </Form.Item>
  //       </Form>
  //     </Col>
  //   </Row>
  // );
};

export default EditPost;
