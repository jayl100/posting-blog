import { createContext, ReactNode, useContext, useState } from 'react';

interface PostContextProps {
  id: string | null;
  setId: (id: string) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [ id, setId ] = useState<string | null>(null);

  return (
    <PostContext.Provider value={ { id, setId } }>
      { children }
    </PostContext.Provider>

  );

};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if(!context) {
    throw new Error('usePostContext 에러입니다.');
  }
  return context;
}