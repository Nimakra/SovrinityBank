import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate
} from "react-router-dom";
import SovrinityHome from "./pages/SovrinityHome";
import Deposit from "./pages/Deposit";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import { useAuth } from "./components/hooks/ContextWrapper";
import { initActors } from './storage-config/functions';

function ProtectedRoute({ element, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}


function App() {
  const { backendActor, setStorageInitiated, login, logout, isAuthenticated, identity, storageInitiated } = useAuth();
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const init = async () => {
    const res = await initActors();
    if (res) {
        setStorageInitiated(true)
    }
  };

  useEffect(() => {
    init();
  }, []);
  

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/invest":
        title = "";
        metaDescription = "";
        break;
      case "/Deposit":
        title = "";
        metaDescription = "";
        break;
        case "/Transfer":
        title = "";
        metaDescription = "";
        break;
      case "/blogs":
        title = "";
        metaDescription = "";
        break;
      case "/learn":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);


  return (
    <Routes>
    <Route path="/" element={<SovrinityHome />} />
    <Route path="/deposit" element={<ProtectedRoute element={<Deposit />} isAuthenticated={isAuthenticated} />} />
    <Route path="/withdraw" element={<ProtectedRoute element={<Withdraw />} isAuthenticated={isAuthenticated} />} />
    <Route path="/transfer" element={<ProtectedRoute element={<Transfer />} isAuthenticated={isAuthenticated} />} />
    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
    <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} isAuthenticated={isAuthenticated} />} />
  </Routes>
  );
}
export default App;
