import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title.tsx';
import Button from '../components/buttons/Button.tsx';
import { GrCircleInformation } from 'react-icons/gr';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Content>
      <div className="text-area">
        <GrCircleInformation />
        <Title>Page Not Found</Title>
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
      </div>
      <Button buttontype="filled" onClick={ () => {navigate('/')} }>
        메인페이지
      </Button>
    </Content>
  )

}

const Content = styled.div`
    margin: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 80px 0;

    .text-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        
        svg {
            width: 40px;
            height: 40px;
        }
        
        p {
            color: ${({ theme }) => theme.color.lightGrey};
        }
    }
`


export default NotFoundPage;