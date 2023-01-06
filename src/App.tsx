import React from "react";
import { Routes, Route, HashRouter, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchPage, ShowPage } from "./pages";
import NasaLogo from "./assets/nasa-logo-web-rgb.png";
import "./style.scss";

export const API_URL = "https://images-api.nasa.gov";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20, // 20s
    },
  },
});

function App() {
  return (
    <div className="content-wrapper">
      <HashRouter basename="/">
        <Link to="/">
          <div title="Go to main page" className="nasa-logo-wrapper">
            <img alt="NASA logo" src={NasaLogo} />
            <span className="logo-label">Image Search API</span>
          </div>
        </Link>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/show/:nasaId" element={<ShowPage />} />
            <Route path="*" element={"404"} />
          </Routes>
        </QueryClientProvider>
      </HashRouter>
    </div>
  );
}

export default App;
