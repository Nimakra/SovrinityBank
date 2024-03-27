import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
<<<<<<<< HEAD:src/declarations/Sovrinity_Bank_backend/index.js
import { idlFactory } from "./Sovrinity_Bank_backend.did.js";
export { idlFactory } from "./Sovrinity_Bank_backend.did.js";
========
import { idlFactory } from "./icp_ledger_canister.did.js";
export { idlFactory } from "./icp_ledger_canister.did.js";
>>>>>>>> 71c3497 (Sovrinity_bank):src/declarations/icp_ledger_canister/index.js

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
<<<<<<<< HEAD:src/declarations/Sovrinity_Bank_backend/index.js
  process.env.CANISTER_ID_SOVRINITY_BANK_BACKEND ||
  process.env.SOVRINITY_BANK_BACKEND_CANISTER_ID;
========
  process.env.CANISTER_ID_ICP_LEDGER_CANISTER ||
  process.env.ICP_LEDGER_CANISTER_CANISTER_ID;
>>>>>>>> 71c3497 (Sovrinity_bank):src/declarations/icp_ledger_canister/index.js

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

<<<<<<<< HEAD:src/declarations/Sovrinity_Bank_backend/index.js
export const Sovrinity_Bank_backend = canisterId ? createActor(canisterId) : undefined;
========
export const icp_ledger_canister = canisterId ? createActor(canisterId) : undefined;
>>>>>>>> 71c3497 (Sovrinity_bank):src/declarations/icp_ledger_canister/index.js
