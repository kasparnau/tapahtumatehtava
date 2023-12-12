import { Link, Route, Routes } from "react-router-dom";

import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";

function Header() {
  const links = [
    ["tapahtumat", "/tapahtumat"],
    ["osallistujat", "/osallistujat"],
    ["käyttäjät", "/kayttajat"],
    ["asetukset", "/asetukset"],
  ];

  return (
    <div className="bg-sky-600 w-full text-lg flex justify-between">
      <div className="flex gap-4 uppercase font-bold bg-sky-600 text-white">
        {links.map((link) => (
          <Link
            key={link[1]}
            to={link[1]}
            className="hover:bg-sky-500 items-center flex justify-center p-4"
          >
            {link[0]}
          </Link>
        ))}
      </div>
      <div className="p-4">
        <Link to="/login">Kirjaudu sisään</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="w-full h-full flex bg-secondary">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
