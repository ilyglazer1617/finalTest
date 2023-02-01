import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SignIn from "./components/signin";
import Register from "./components/register";
import AllJobs from "./components/allJobs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comments" element={<AllJobs />} />
      </Routes>
    </div>
  );
}

export default App;
