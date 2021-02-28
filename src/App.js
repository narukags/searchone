import './App.css';
import Search from './component/Search';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {

  return (
    <div className="app">
      <Container maxWidth="lg">
        <Typography component="div"
          className="typo"
        >
          <div class="heading">
            <h1>SEARCHING APP</h1>
          </div>
          <Search />
        </Typography>
      </Container>
      {/* <Search/> */}

    </div>
  );
}

export default App;
