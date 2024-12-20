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
  const { isPostInfo } = usePost(idInt);
  const { handlePutPost } = useModifyPost(idInt);
  const { register, handleSubmit, setValue, reset } = useForm<IPost>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (!isPostInfo) return;

    if (isPostInfo.id !== getInfo?.id) {
      alert('권한이 없습니다.');
      navigate(`/posts/${ idInt }`);
    }

    setValue('title', isPostInfo.title, { shouldValidate: true });
    setValue('content', isPostInfo.content, { shouldValidate: true });

  }, [ isPostInfo ]);

  const onSubmit = async (data: IPosting) => {
    try {
      if (!idInt && data) {
        handlePosting(data);
        alert('등록 완료되었습니다.');
        navigate(`/posts/`);
        reset();
      } else {
        handlePutPost(data);
        alert('수정이 완료되었습니다.');
        navigate(`/posts/${ idInt }`);
        reset();
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

  };


  return (
    <>
      <Title bottomsize="60px">글쓰기</Title>
      <PostingStyled onSubmit={ handleSubmit(onSubmit) }>
        <div className="input-style">
          <input
            placeholder="제목을 입력해 주세요." type="text"
            { ...register('title', {
              required: '제목을 입력해 주세요.',
            }) }
          />
          <textarea
            placeholder="내용을 입력해 주세요."
            { ...register('content', { required: '내용을 입력해 주세요.' }) }
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


        input {
            padding: 0 20px;
            font-size: ${ ({ theme }) => theme.fontSize.text };
            height: 100px;
            border-bottom: 1px solid ${ ({ theme }) => theme.color.lightGrey };

            &::placeholder {
                color: ${ ({ theme }) => theme.color.lightGrey };
            }

            &:focus {
                outline: none;
                background-color: ${ ({ theme }) => theme.color.f9 };
            }
        }


        textarea {
            height: 400px;
            padding: 40px 20px;
            font-size: ${ ({ theme }) => theme.fontSize.text };

            &::placeholder {
                color: ${ ({ theme }) => theme.color.lightGrey };
            }

            &:focus {
                outline: none;
                background-color: ${ ({ theme }) => theme.color.f9 };
            }
        }
    }

    .btn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 22px;
    }
`;


export default PostingPage;