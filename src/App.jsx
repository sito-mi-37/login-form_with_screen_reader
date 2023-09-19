import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Routes path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/linkpage" element={<LinkPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* protected routes */}
      <Route element={<PersistLogin />}>
        {" "}
        <Route element={<RequireAuth allowedroles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedroles={[1984]} />}>
          <Route path="/editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedroles={[5150]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        
        <Route element={<RequireAuth allowedroles={[1984, 5150]} />}>
          <Route path="/lounge" element={<Lounge />} />
        </Route>
      </Route>

      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
