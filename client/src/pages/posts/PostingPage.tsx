import styled from 'styled-components';
import Title from '../../components/Title.tsx';
import { useForm } from 'react-hook-form';
import { IPost, IPosting } from '../../type/type.ts';
import usePosts from '../../hooks/usePosts.ts';
import Button from '../../components/buttons/Button.tsx';
import useModifyPost from '../../hooks/useModifyPost.ts';
import { useNavigate, useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost.ts';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contexts/authContext.ts';

function PostingPage() {
  const navigate = useNavigate();
  const { handlePosting } = usePosts();
  const { getInfo } = useContext(AuthContext);
  const { id } = useParams() as { id: string };
  const idInt = parseInt(id);
  const { isPostInfo, fetchPost } = usePost();
  const { handlePutPost } = useModifyPost(idInt);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<IPost>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    fetchPost(idInt);

    if (!isPostInfo) return;

    if (isPostInfo.userId !== getInfo?.id) {
      alert('권한이 없습니다.');
      navigate(`/posts/${ idInt }`);
    }

    setValue('title', isPostInfo.title, { shouldValidate: true });
    setValue('content', isPostInfo.content, { shouldValidate: true });

  }, [ isPostInfo?.updatedAt ]);

  const onSubmit = async (data: IPosting) => {
      if (!idInt && data) {
        await handlePosting(data);
        reset();
      } else {
        await handlePutPost(data);
        reset();
      }
  };


  return (
    <>
      <Title bottomsize="60px">{ idInt ? '글수정' : '글쓰기' }</Title>
      <PostingStyled onSubmit={ handleSubmit(onSubmit) }>
        <div className="input-style">
          <InputStyled
            $errorColor={ errors?.title ? `#ec0000` : `#999` }
            placeholder="제목을 입력해 주세요." type="text"
            { ...register('title', {
              required: '제목을 입력해 주세요.',
            }) }
          />

          <TextareaStyled
            $errorColor={ errors?.content ? `#ec0000` : `#999` }
            placeholder="내용을 입력해 주세요."
            { ...register('content', {
              required: '내용을 입력해 주세요.',
            }) }
          />

        </div>
        <div className="btn">
          <Button buttontype="outlined" type="button" onClick={ () => {navigate(-1)} }>취소</Button>
          <Button buttontype="filled" type="submit">{ idInt ? '수정' : '등록' }</Button>
        </div>
      </PostingStyled>
    </>
  );
}


const PostingStyled = styled.form`
    width: 100%;
    height: 100%;

    .input-style {
        display: flex;
        flex-direction: column;
        height: 100%;
        border-bottom: 2px solid ${ ({ theme }) => theme.color.secondary };
        border-top: 2px solid ${ ({ theme }) => theme.color.secondary };
        margin-bottom: 60px;
    }

    .btn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 22px;
    }
`;

const InputStyled = styled.input<{ $errorColor?: string }>`
    padding: 0 20px;
    font-size: ${ ({ theme }) => theme.fontSize.text };
    height: 100px;
    border-bottom: 1px solid ${ ({ theme }) => theme.color.lightGrey };

    &::placeholder {
        color: ${ props => props.$errorColor || '#fff' };
    }

    &:focus {
        outline: none;
        background-color: ${ ({ theme }) => theme.color.f9 };
    }
`

const TextareaStyled = styled.textarea<{ $errorColor?: string }>`
    height: 400px;
    padding: 40px 20px;
    font-size: ${ ({ theme }) => theme.fontSize.text };
    line-height: 1.6;

    &::placeholder {
        color: ${ props => props.$errorColor || '#fff' };
    }

    &:focus {
        outline: none;
        background-color: ${ ({ theme }) => theme.color.f9 };
    }
`


export default PostingPage;