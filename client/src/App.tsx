import { Link, Route, Routes } from "react-router-dom";

import EventsPage from "./routes/EventsPage";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import ParticipantsPage from "./routes/ParticipantsPage";
import SettingsPage from "./routes/SettingsPage";
import UsersPage from "./routes/UsersPage";
import { useEffect } from "react";
import { useMainStore } from "./zustand";

function Header() {
  const { user } = useMainStore();

  const links = [
    ["Tapahtumat", "/tapahtumat"],
    ["Osallistujat", "/osallistujat"],
    ["Käyttäjät", "/kayttajat"],
    ["Asetukset", "/asetukset"],
  ];

  return (
    <div className="bg-sky-600 w-full text-lg flex justify-between text-white">
      <div className="flex gap-4 font-bold bg-sky-600">
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
        {user ? user.username : <Link to="/login">Kirjaudu sisään</Link>}
      </div>
    </div>
  );
}

function App() {
  const { setUser } = useMainStore();

  const refreshUser = async () => {
    const result = await fetch("/api/user").then((res) => res.json());
    if (result.user) {
      setUser(result.user);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="w-full h-full flex bg-secondary">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tapahtumat" element={<EventsPage />} />
          <Route path="/osallistujat" element={<ParticipantsPage />} />
          <Route path="/asetukset" element={<SettingsPage />} />
          <Route path="/kayttajat" element={<UsersPage />} />
          <Route path="/" element={<EventsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
