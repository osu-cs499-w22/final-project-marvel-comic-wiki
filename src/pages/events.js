import Header from '../components/header';
import Footer from '../components/footer';
import Spinner from '../components/spinner';
import ErrorContainer from '../components/errorContainer';
import EventModal from '../components/eventsModal';

import useMarvelSearch from '../hooks/useMarvelSearch';

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { MDBIcon } from "mdb-react-ui-kit";


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

  const [offset, setOffset] = useState(0);
  const baseUrl = `https://gateway.marvel.com/v1/public/events?offset=${offset*20}&`; // marvel api gives events in 20 event chunks
  const [ inputQuery, setInputQuery] = useState('') 
   const [ url, setUrl] = useState(baseUrl);

  useEffect(()=>{ // changes the URL depending on what the user searched for
      if(inputQuery === ''){
        setUrl(baseUrl); // use base URL when user doesnt search for a specific event
      }
      else {        
        setUrl(`${baseUrl}nameStartsWith=${inputQuery}&`); // change URL when user searches for a specific event
      }


    }, [inputQuery, offset])


  const [ events, loadingAll, errorAll ] = useMarvelSearch(url);
  const [ eventName, setEventName ] = useState('');
  const [ eventDescription, setEventDescription ] = useState('');
  const [ eventCharacters, setEventCharacters ] = useState([]);
  const [ eventComics, setEventComics ] = useState([]);
  const [ eventCreators, setEventCreators ] = useState([]);
  const [ eventSeries, setEventSeries ] = useState([]);
  const [ eventToSearch, setEventToSearch] = useState(''); // used for the search bar
  const [ modalShow, setModalShow ] = React.useState(false);
  
  return (
    <div>
	  <Header></Header>
      
      <Title>Events</Title>
      
      {loadingAll ? ( <Loading> <Spinner /> </Loading> ) : (
        
        <StyledContainer>
          
          <StyledForm onSubmit={(e) => {
            e.preventDefault();
            setOffset(0); // reset off set when the user choses a specific event so that they get events in order
            setInputQuery(eventToSearch);
          }}>
          <StyledSearch type="submit"><StyledIcon icon="search"/></StyledSearch>
            <StyledInput placeholder= 'Enter an event name ' onChange={e => setEventToSearch(e.target.value)} /> 
          </StyledForm>
        
          <Row className="row-cols-2 row-cols-md-4 row-cols-xl-6 g-4">
            {events.map(event =>
              
              <Col key={event.id}>
                <StyledCard onClick={() => {
                  setEventName(event.title);
                  setEventDescription(event.description);
                  setEventCharacters(event.characters.items);
                  setEventComics(event.comics.items);
                  setEventCreators(event.creators.items);
                  setEventSeries(event.series.items);
                  setModalShow(true);
                }}>
                
                  <img src={`${event.thumbnail.path}/standard_xlarge.${event.thumbnail.extension}`}className="card-img-top"alt=""></img>
                  <StyledCardBody>
                    <StyledCardTitle>{event.title} </StyledCardTitle>
                  </StyledCardBody>
                </StyledCard>
              </Col>
            )}
          </Row>
          <EventModal 
            title={eventName}
            description={eventDescription || "Not Available"}
            characters ={eventCharacters}
            comics={eventComics}
            creators={eventCreators}
            series={eventSeries}
            show={modalShow} 
            onHide={() => setModalShow(false)} 
          />
          
          <StyledBtnsContainer>
            <StyledButton variant="light" onClick={() => offset !== 0 ? setOffset(offset - 1) : setOffset(offset)}>&lt; Previous</StyledButton>
            <StyledButton variant="light" onClick={() => setOffset(offset + 1)}>Next &gt;</StyledButton>
          </StyledBtnsContainer>
          
        </StyledContainer>
      )}
      {errorAll && <ErrorContainer>Error!</ErrorContainer>}
      <Footer></Footer>
    </div>
  )
}

export default Comics;