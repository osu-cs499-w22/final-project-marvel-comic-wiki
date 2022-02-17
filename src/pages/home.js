import Header from '../components/header';
import Footer from '../components/footer';

function Home() {
  return (
    <div>
	  <Header></Header>
      <h1>Welcome to the Marvel Comic Wiki</h1>
      <img src="https://wallpapercave.com/wp/wp1829345.jpg" alt="" width="50%"/>
      <h2>This is your one-stop shop for all Marvel related information.</h2>
      <p>Marvel was started in 1939 by Martin Goodman as Timely Comics, and by 1951 had generally become known as Atlas Comics. The Marvel era began in 1961, the year that the company launched The Fantastic Four and other superhero titles created by Stan Lee, Jack Kirby, Steve Ditko and many others. The Marvel brand, which had been used over the years, was solidified as the company's primary brand.</p>
	  <Footer></Footer>
	</div>
  );
}

export default Home;