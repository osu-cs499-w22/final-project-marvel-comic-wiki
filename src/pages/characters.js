import Header from '../components/header';
import Footer from '../components/footer';
import styled from '@emotion/styled/macro';
import useMarvelSearch from '../hooks/useMarvelSearch';
import Spinner from '../components/spinner';
import ErrorContainer from '../components/errorContainer';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Title = styled.h1`
  text-align: center;
  padding: 10px;
`;

const Loading = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const StyledContainer = styled(Container)`
  max-width: 95%;
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100px;
`;

const StyledCardTitle = styled(Card.Title)`
  text-align: center;
  padding-bottom: 5px;
`;

const StyledCardText = styled(Card.Text)`
  text-align: center;
  margin-bottom: 0px;
`;


function Characters() {

  const url = `https://gateway.marvel.com/v1/public/characters`;
  const [ characters, loadingAll, errorAll ] = useMarvelSearch(url);
  
  return (
    <div>
	  <Header></Header>
      <Title>Characters</Title>
      {loadingAll ? ( <Loading> <Spinner /> </Loading> ) : (
        <StyledContainer>
          <Row className="row-cols-1 row-cols-md-4 g-4">
            {characters.map(character =>
              <Col key={character.id}>
                <Card>
                  <img src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}className="card-img-top"alt=""></img>
                  <StyledCardBody>
                    <StyledCardTitle>{character.name}</StyledCardTitle>
                  </StyledCardBody>
                </Card>
              </Col>
            )}
          </Row>
        </StyledContainer>
      )}
      {errorAll && <ErrorContainer>Error!</ErrorContainer>}
      <Footer></Footer>
    </div>
  );
}

export default Characters;