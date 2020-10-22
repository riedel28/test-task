export type Post = {
  _id: string,
  title: string,
  content: string,
  creator: {
    _id: string,
    displayName: string,
  },
  __v: string,
  createDate: string,
};

export type User = { name: string, token: string };

export type Error = { message: string };
