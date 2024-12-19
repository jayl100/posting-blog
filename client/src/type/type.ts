// db
export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IToken {
  id: number;
  token: string;
  userId: number;
}

// signup
export interface ISignup {
  email: string;
  name: string;
  password: string;
}

// login
export interface ILogin {
  email: string;
  password: string;
}

// postList
export interface IPostList extends IUser {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

// postWrite
export interface IPosting extends IPost {
  id: number;
  title: string;
  content: string;
}

// pagination
export interface IMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface IModifyPost {
  title: string;
  content: string;
}