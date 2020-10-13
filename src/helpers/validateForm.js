const validate = ({ heading, postContent }) => {
  const errors = {};

  if (heading.length === 0) {
    errors.heading = 'Заголовок не должен быть пустым';
  }

  if (postContent.length === 0) {
    errors.postContent = 'Содержание поста не должно быть пустым';
  }

  return errors;
};

export default validate;
