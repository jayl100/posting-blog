import styled from 'styled-components';
import { useState } from 'react';

interface Props {
  activeTab: string;
  setActiveTab: (string: string) => void;
}

function MyTabMenu({ activeTab, setActiveTab }: Props) {


  return (
    <>
      <MyTabMenuStyled>
        <button
          onClick={ () => {setActiveTab('posts')} }
          className={ activeTab === 'posts' ? 'active' : '' }
        >나의 게시글
        </button>
        <button
          onClick={ () => {setActiveTab('reset')} }
          className={ activeTab === 'reset' ? 'active' : '' }
        >비밀번호 변경하기
        </button>
        <button
          onClick={ () => {setActiveTab('withdraw')} }
          className={ activeTab === 'withdraw' ? 'active' : '' }
        >회원 탈퇴하기
        </button>
      </MyTabMenuStyled>
    </>
  );
}

const MyTabMenuStyled = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 60px;

    button {
        text-align: center;
        align-content: center;
        width: 178px;
        height: 60px;
        border-bottom: 1px solid ${ ({ theme }) => theme.color.d9 };
        color: ${ ({ theme }) => theme.color.mediumGrey };
        background-color: #fff;
        font-size: 16px;
        font-weight: 400;
    }

    .active {
        border-bottom: 1px solid ${ ({ theme }) => theme.color.primary };
        color: ${ ({ theme }) => theme.color.primary };
        font-weight: 600;
    }
`;

export default MyTabMenu;