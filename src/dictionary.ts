type Dictionary = Record<string, string>;

const dictionary: Dictionary = {
  wrong_email_or_password: 'Имя пользователя или пароль введены не верно',
  user_not_found: 'Пользователь не найден',
  'Network Error': 'Ошибка соединения. Не удалось получить список новостей',
  'Request failed with status code 404': 'Не удалось выполнить запрос'
};

export default dictionary;
