import styled from 'styled-components';
import Title from '../../components/Title.tsx';
import { useForm } from 'react-hook-form';
import { IPosting } from '../../type/type.ts';
import usePosts from '../../hooks/usePosts.ts';
import Button from '../../components/buttons/Button.tsx';

function PostingPage() {
  const { register, handleSubmit } = useForm<IPosting>();
  const { handlePosting } = usePosts();

  const onSubmit = (data: IPosting) => {
    if (data) {
    handlePosting(data);
    alert('등록 완료되었습니다.');
    }
  };

  return (
    <>
      <Title bottomsize="60px">글쓰기</Title>
      <PostingStyled onSubmit={ handleSubmit(onSubmit) }>
        <div className="input-style">
          <input
            placeholder="제목을 입력해 주세요." type="text"
            { ...register('title', { required: '제목을 입력해 주세요.' }) }
          />
          <textarea
            placeholder="내용을 입력해 주세요."
            { ...register('content', { required: '내용을 입력해 주세요.' }) }
          />
        </div>
        <div className="btn">
          <Button buttontype="outlined" type="button" onClick={() => {history.back()}}>취소</Button>
          <Button buttontype="filled" type="submit">등록</Button>
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