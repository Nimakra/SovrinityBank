import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import {
  AuthClient,
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from "@dfinity/auth-client";
import { canisterId as iiCanId } from "../../declarations/internet_identity";
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { canisterId, idlFactory } from "../../declarations/Sovrinity_Bank_backend";
import { _SERVICE } from "../../declarations/Sovrinity_Bank_backend/Sovrinity_Bank_backend.did";
import Register from "../modals/register";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

type User = {
  id: Principal;
  username: Text;
  handle: Text;
  created: Text;
};

type Result = {
  err?: any;
  ok?: any;
};

interface ContextType {
  isAdmin: boolean;
  setIsAdmin: (_value: any) => void;
  isAuthenticated: boolean | null;
  user: User;
  storageInitiated: boolean;
  backendActor: ActorSubclass<_SERVICE> | null;
  identity: Identity | null;
  login: () => void;
  logout: () => void;
  setStorageInitiated: (_value: any) => void; 
  setUser: (_value: any) => void; 
  showRegModal: boolean; 
  setShowRegModal: Dispatch<SetStateAction<boolean>>;
  isNew: boolean;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  saving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>>;
  registerSuccess: boolean;
  setRegisterSuccess: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>; //review
  handleRegister: (data: any, e: any) => Promise<void>;
}

const initialContext: ContextType = {
  isAdmin: false,
  //id: null,
  identity: null,
  user: null,
  backendActor: null,
  storageInitiated: false,
  isAuthenticated: false,
  login: (): void => {},
  logout: (): void => {},
  showRegModal: false,
  setShowRegModal: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  isNew: false,
  setIsNew: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  saving: false,
  setSaving: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  registerSuccess: false,
  setRegisterSuccess: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  isLoading: false,
  setIsLoading: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  handleRegister: async (): Promise<void> => {
    throw new Error("handleRegister function must be overridden");
  },
  setIsAdmin: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  setStorageInitiated: (any): void => {
    throw new Error("setContext function must be overridden");
  },
  setUser: (any): void => {
    throw new Error("setContext function must be overridden");
  },
};

const AuthContext = createContext<ContextType>(initialContext);

interface DefaultOptions {
  createOptions: AuthClientCreateOptions;
  loginOptions: AuthClientLoginOptions;
}

const defaultOptions: DefaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      network === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://${iiCanId}.localhost:4943`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [backendActor, setBackendActor] =
    useState<ActorSubclass<_SERVICE> | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [storageInitiated, setStorageInitiated] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);
 
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      console.log("User handle:", user.handle);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && identity)
      (async () => {
        try {
          const res: Result = await backendActor?.getUser();
          const myrole = await backendActor?.my_role();
          if (myrole === "admin") {
            setIsAdmin(true);
          }
          if (res.ok) {
            setUser(res.ok);
          } else {
            if (res.err === "User not found") {
              setIsNew(true);
              setShowRegModal(true);
            }
          }
        } catch (error) {
          console.log("Error in Navbar", error);
        }
      })();
  }, [identity]);

  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    setAuthClient(client);

    const _identity = client.getIdentity();
    setIdentity(_identity);
    console.log("Principal", _identity.getPrincipal().toString());

    let agent = new HttpAgent({
      host: network === "local" ? localhost : host,
      identity: _identity,
    });

    if (network === "local") {
      agent.fetchRootKey();
    }

    const _backendActor: ActorSubclass<_SERVICE> = Actor.createActor(
      idlFactory,
      {
        agent,
        canisterId: canisterId,
      }
    );
    setBackendActor(_backendActor);
  }

  async function logout() {
    await authClient?.logout();
    if (authClient) {
      await updateClient(authClient);
    }
  }

  return {
    isAdmin,
    setIsAdmin,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    setStorageInitiated,
    storageInitiated,
    backendActor,
    login,
    logout,
    identity,
    showRegModal,
    setShowRegModal,
    isNew,
    setIsNew,
    saving,
    setSaving,
    registerSuccess,
    setRegisterSuccess,
    isLoading,
    setIsLoading,
  };
};

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<LayoutProps> = ({ children }) => {
  const auth = useAuthClient();
  const handleRegister = async (data, e: any) => {
    e.preventDefault();
    auth.setIsLoading(true);
    auth.setSaving(true);
    try {
      const id = auth.identity?.getPrincipal();
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split("T")[0];
      const newUser = { ...data, id, created: currentDateString, account: {
        balance: 0,
        transactions: []
      } };
      const result = await auth.backendActor.addUser(newUser);
      auth.setUser(result);
      auth.setIsNew(false);
      auth.setShowRegModal(false);
      auth.setRegisterSuccess(true);
      auth.setIsAuthenticated(true);
    } catch (error) {
      console.log("Error in Navbar", error);
    } finally {
      auth.setSaving(false);
      auth.setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, handleRegister }}>
      {children}
      {auth.isNew && !auth.isAdmin && (
        <Register
          showRegModal={auth.showRegModal}
          setShowRegModal={auth.setShowRegModal}
          handleRegister={handleRegister}
          saving={auth.saving}
        />
      )}
      {auth.registerSuccess && <Fireworks autorun={{ speed: 3 , duration: 3500}} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
