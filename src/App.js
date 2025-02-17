import { Route, BrowserRouter as Routers, Routes } from 'react-router-dom';
import './App.css';
import { Episode } from './Components/Episodes/Episode';
import { Search } from './Components/Search/Search';
import { Seasons } from './Components/Season/Season';
import { Single } from './Components/SingleShow/Single';
function App() {
  return (
    <div className="App">
      <Routers>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/unique/:name' element={<Single />} />
          <Route path='/unique/:name/season/:season' element={<Seasons />} />
          <Route path='/unique/:name/season/:season/episode/:ep' element={<Episode />} />
        </Routes>
      </Routers>
      <i style={{padding: "25px"}}><b>@Argane Mohamed</b></i>
    </div>
  );
}

export default App;
