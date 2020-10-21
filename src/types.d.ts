export type Post = {
  _id: 'string',
  title: 'string',
  content: 'string',
  creator: {
    _id: 'string',
    displayName: 'string',
  },
  __v: 0,
  createDate: 'string',
};

export type Error = { message: string };
