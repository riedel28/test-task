type Errors = {
  heading: string,
  postContent: string,
};

const validate = ({ heading, postContent }: Errors) => {
  const errors = {} as Errors;

  if (heading.length === 0) {
    errors.heading = 'Заголовок не должен быть пустым';
  }

  if (postContent.length === 0) {
    errors.postContent = 'Содержание поста не должно быть пустым';
  }

  return errors;
};

export default validate;
