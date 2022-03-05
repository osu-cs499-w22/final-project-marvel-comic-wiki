import Header from '../components/header';
import Footer from '../components/footer';
import Spinner from '../components/spinner';
import ErrorContainer from '../components/errorContainer';
import CharacterModal from '../components/characterModal';

import useMarvelSearch from '../hooks/useMarvelSearch';

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
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

const StyledCard = styled(Card)`
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

const StyledForm = styled.form`


  display:flex;
  justify-content: flex-end;
  padding:10px;
  padding-right: 75px;
  padding-bottom: 20px;
`;

const StyledInput = styled.input`
  border:0;
  border-bottom: 1px solid grey;
  &:focus{
    outline:none;
  }
`

function Characters() {

  const baseUrl = `https://gateway.marvel.com/v1/public/characters?`;
  const [ inputQuery, setInputQuery] = useState('') 
   const [ url, setUrl] = useState(baseUrl);

  useEffect(()=>{ // changes the URL depending on what the user searched for
      if(inputQuery === ''){
        setUrl(baseUrl); // use base URL when user doesnt search for a specific character
      }
      else {
        setUrl(`${baseUrl}nameStartsWith=${inputQuery}&`); // change URL when user searches for a specific character
      }


    }, [inputQuery])


  const [ characters, loadingAll, errorAll ] = useMarvelSearch(url);
  const [ characterName, setCharacterName ] = useState('');
  const [ characterDescription, setCharacterDescription ] = useState('');
  const [ characterComics, setCharacterComics ] = useState([]);
  const [ characterEvents, setCharacterEvents ] = useState([]);
  const [ characterSeries, setCharacterSeries ] = useState([]);
  const [ characterToSearch, setCharacterToSearch] = useState(''); // used for the search bar
  const [ modalShow, setModalShow ] = React.useState(false);
 
  console.log(characters);
  
  
  return (
    <div>
	  <Header></Header>
      <Title>Characters</Title>
      <StyledForm  onSubmit={(e) => {
        e.preventDefault();
        setInputQuery(characterToSearch);
      }}>
        <StyledInput placeholder= 'Enter a character name ' onChange={e => setCharacterToSearch(e.target.value)} /> 
      </StyledForm>
      {loadingAll ? ( <Loading> <Spinner /> </Loading> ) : (
        <StyledContainer>
          <Row className="row-cols-1 row-cols-md-4 g-4">
            {characters.map(character =>
              
              <Col key={character.id}>
                <StyledCard onClick={() => {
                  setCharacterName(character.name);
                  setCharacterDescription(character.description);
                  setCharacterComics(character.comics.items);
                  setCharacterEvents(character.events.items);
                  setCharacterSeries(character.series.items);
                  setModalShow(true);
                }}>

                  
                  <img src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}className="card-img-top"alt=""></img>
                  <StyledCardBody>
                    <StyledCardTitle>{character.name}</StyledCardTitle>
                  </StyledCardBody>
                </StyledCard>
                
                
              </Col>
            )}
          </Row>
          <CharacterModal 
            name={characterName}
            description={characterDescription || "Not Available"}
            comics={characterComics}
            events={characterEvents}
            series={characterSeries}
            show={modalShow} 
            onHide={() => setModalShow(false)} 
          />
        </StyledContainer>
      )}
      {errorAll && <ErrorContainer>Error!</ErrorContainer>}
      <Footer></Footer>
    </div>
  )
}

export default Characters;