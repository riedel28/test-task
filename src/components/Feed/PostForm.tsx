import React from 'react';
import { Row, Col, Typography, Form, Input, Button, FormInstance } from 'antd';
import { Store } from 'rc-field-form/lib/interface';

const { Title } = Typography;
const { TextArea } = Input;

type PostFormProps = {
  form: FormInstance<string> | undefined;
  title: string;
  onSubmit: () => void;
  initialValues?: Store & {
    title: string;
    content: string;
  };
};

const PostForm: React.FC<PostFormProps> = ({
  form,
  onSubmit,
  title,
  initialValues = {}
}) => {
  return (
    <Row style={{ paddingBottom: '30px' }}>
      <Col span={12} offset={6}>
        <Typography>
          <Title style={{ color: '#000033' }}>{title}</Title>
        </Typography>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={initialValues}
        >
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

export default PostForm;
