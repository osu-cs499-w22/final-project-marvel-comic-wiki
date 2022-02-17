import Header from '../components/header';
import Footer from '../components/footer';
import styled from '@emotion/styled/macro';
import useMarvelSearch from '../hooks/useMarvelSearch';
import Spinner from '../components/spinner';
import ErrorContainer from '../components/errorContainer';

const Title = styled.h1`
  text-align: center;
  padding: 10px;
`;

const Loading = styled.div`
  text-align: center;
  padding-top: 20px;
`;

function Characters() {

  const url = `https://gateway.marvel.com/v1/public/characters`;
  const [ characters, loading, error ] = useMarvelSearch(url);
  
  return (
    <div>
	  <Header></Header>
      <Title>Characters</Title>
      {console.log("loading: ", loading)}
      {loading ? ( <Loading> <Spinner /> </Loading> ) : (
        <ul>
          {characters.map(character => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      )}
      {error && <ErrorContainer>Error!</ErrorContainer>}
      <Footer></Footer>
    </div>
  );
}

export default Characters;