import Header from '../components/header';
import Footer from '../components/footer';
import Spinner from '../components/spinner';
import ErrorContainer from '../components/errorContainer';
import ComicModal from '../components/comicModal';

import useMarvelSearch from '../hooks/useMarvelSearch';

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { MDBIcon } from "mdb-react-ui-kit";

const PageContainer = styled.div`
  background: ${props => props.theme ? 'white' : '#181A1B'};
`;

const Title = styled.h1`
  text-align: center;
  padding: 10px;
  margin-bottom: -42px;
  @media (max-width: 700px) {
    margin-bottom: 0px;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding-top: 50px;
`;

const StyledContainer = styled(Container)`
  max-width: 95%;
`;

const StyledCard = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }
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

const StyledLongCardTitle = styled(Card.Title)`
  text-align: center;
  padding-bottom: 5px;
  font-size: 0.97rem;
`;

const StyledForm = styled.form`
  text-align: right;
  padding-right: 5px;
  padding-bottom: 25px;
  @media (max-width: 700px) {
    text-align: center;
    padding-right: 0px;
  }
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;

const StyledIcon = styled(MDBIcon)`
  margin-right: 5px;
`;

const StyledBtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, .125);
  &:hover {
    border-color: rgba(0, 0, 0, .125);
    background-color: #efefef;
  }
`;

const StyledSearch = styled.button`
  border:none;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
`;

function Comics() {
  
  const [ themeMode, setThemeMode ] = React.useState(true);
  
  const [offset, setOffset] = useState(0);
  const baseUrl = `https://gateway.marvel.com/v1/public/comics?offset=${offset*20}&`; // marvel api gives comics in 20 comics chunks
  const [ inputQuery, setInputQuery] = useState('') 
  const [ url, setUrl] = useState(baseUrl);

  useEffect(() => { // changes the URL depending on what the user searched for
      if (inputQuery === '') {
        setUrl(baseUrl); // use base URL when user doesnt search for a specific comic
      }
      else {        
        setUrl(`${baseUrl}titleStartsWith=${inputQuery}&`); // change URL when user searches for a specific comic
      }
    }, [inputQuery, offset])

  const [ comics, loadingAll, errorAll ] = useMarvelSearch(url);
  const [ comicTitle, setComicTitle ] = useState('');
  const [ comicDescription, setComicDescription ] = useState('');
  const [ comicCreators, setComicCreators ] = useState([]);
  const [ comicEvents, setComicEvents ] = useState([]);
  const [ comicCharacters, setComicCharacters ] = useState([]);
  const [ comicToSearch, setComicToSearch ] = useState(''); // used for the search bar
  const [ modalShow, setModalShow ] = React.useState(false);
 
  return (
    <div>
	  <Header themeMode={themeMode} setThemeMode={setThemeMode}></Header>
      
      <Title>Comics</Title>
      
      {loadingAll ? ( <Loading> <Spinner /> </Loading> ) : (
        
        <StyledContainer>
          
          <StyledForm onSubmit={(e) => {
            e.preventDefault();
            setOffset(0); // reset off set when the user chooses a specific comic so that they get comics in order
            setInputQuery(comicToSearch);
          }}>
            <StyledSearch type="submit"><StyledIcon icon="search"/></StyledSearch>
            <StyledInput placeholder= 'Enter a comic name ' onChange={e => setComicToSearch(e.target.value)} /> 
          </StyledForm>
        
          <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 g-4">
            {comics.map(comic =>
              <Col key={comic.id}>
                <StyledCard onClick={() => {
                  setComicTitle(comic.title);
                  setComicDescription(comic.description);
                  setComicCreators(comic.creators.items);
                  setComicEvents(comic.events.items);
                  setComicCharacters(comic.characters.items);
                  setModalShow(true);
                }}>
                  <img src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}className="card-img-top"alt=""></img>
                  <StyledCardBody>
                    {comic.title.length > 40 ? 
                      <StyledLongCardTitle>{comic.title}</StyledLongCardTitle> 
                      : 
                      <StyledCardTitle>{comic.title}</StyledCardTitle>
                    }
                  </StyledCardBody>
                </StyledCard>
              </Col>
            )}
          </Row>
          
          <ComicModal 
            title={comicTitle}
            description={comicDescription || "Not Available"}
            creators={comicCreators}
            events={comicEvents}
            characters={comicCharacters}
            show={modalShow} 
            onHide={() => setModalShow(false)} 
          />
          
          <StyledBtnsContainer>
            <StyledButton disabled={offset === 0} variant="light" onClick={() => offset !== 0 ? setOffset(offset - 1) : setOffset(offset)}>&lt; Previous</StyledButton>
            <StyledButton disabled={comics.length < 20}variant="light" onClick={() => setOffset(offset + 1)}>Next &gt;</StyledButton>
          </StyledBtnsContainer>
          
        </StyledContainer>
      )}
      
      {errorAll && <ErrorContainer>Error!</ErrorContainer>}
      
      <Footer></Footer>
    </div>
  )
}

export default Comics;