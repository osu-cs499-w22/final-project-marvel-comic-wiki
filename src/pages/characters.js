import Header from '../components/header';
import Footer from '../components/footer';
import styled from '@emotion/styled/macro';
import useMarvelSearch from '../hooks/useMarvelSearch';

const Title = styled.h1`
  text-align: center;
  padding: 10px;
`;

function Characters() {

  const url = `https://gateway.marvel.com/v1/public/characters`;
  const [ characters, loading, error ] = useMarvelSearch(url);
  
  return (
    <div>
	  <Header></Header>
      <Title>Characters</Title>
      <ul>
          {characters.map(character => (
            <li>{character.name}</li>
          ))}
        </ul>
      <Footer></Footer>
    </div>
  );
}

export default Characters;