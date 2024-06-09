import { Router } from "routes";
import "./App.css";
import PastCases from "./Components/PastCasesRecord/PastCases";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Router> */}
        <Routes>
          <Route path="/pastCases" element={<PastCases/>}/>
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;

// import './App.css';
// import Header from './components/Header/Header';
// import Summary from './components/Summary';
// import PastCases from "./components/PastCases";

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Summary />
//       <PastCases/>
//     </div>
//   );
// }

// export default App;


