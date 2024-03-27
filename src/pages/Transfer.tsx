import { FunctionComponent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../components/hooks/ContextWrapper";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { Principal } from "@dfinity/principal";

const Transfer: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { backendActor, user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalanceAndTransactions = async () => {
      const userBalance = Number(await backendActor.getAccountBalance());
      let userTransactions = await backendActor.getMyTransactions();
      userTransactions = userTransactions.filter(
        (transaction) => transaction.name === "Transfer"
      );
      setBalance(userBalance);
      setTransactions(userTransactions);
    };

    fetchBalanceAndTransactions();
  }, [backendActor, user]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);
      const { recipientId, amount } = data;
      const id = uuidv4();
      const timestamp = new Date().toISOString();
      let recipientPrincipal;
      try {
        recipientPrincipal = Principal.fromText(recipientId);
      } catch (error) {
        setError("Invalid recipient address.");
        console.error(error);
        return;
      }
      const result = await backendActor.transfer(
        recipientPrincipal,
        BigInt(parseInt(amount)),
        id,
        timestamp
      );
      if ("ok" in result) {
        console.log("Transfer was successful!");
        setSuccessMessage("Transfer was successful!");
        const userBalance = Number(await backendActor.getAccountBalance());
        setBalance(userBalance);
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-montserrat">
      <Header />
      <div className="mx-auto max-w-[1180px] px-8 mt-10 text-left">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Transfer Funds</h1>
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-sm text-gray-500">
                <FontAwesomeIcon icon={faWallet} className="mr-2 text-black" />
                Current Balance
              </h3>
              <p className="text-xl font-semibold">
                ${balance.toFixed(2)} USDT
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-2/3 pr-4">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="recipientId"
                >
                  Recipient Address
                </label>
                <input
                  {...register("recipientId", { required: true })}
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="recipientId"
                  type="text"
                  placeholder="Recipient Address"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  {...register("amount", { required: true, min: 0 })}
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  min="0"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Transferring..." : "Transfer"}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
            </form>
          </div>
          <div className="w-1/3 px-3 ml-2">
            <h2 className="text-xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <details className="mb-4">
              <summary className="font-bold mb-2">
                How do I make a transfer?
              </summary>
              <p>
                Enter the recipient's ID and the amount you want to transfer,
                then click the "Transfer" button.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-bold mb-2">
                How do I know my transaction was successful?
              </summary>
              <p>
                You will receive a confirmation message after the transfer is
                successful.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-bold mb-2">
                How do I check my transaction history?
              </summary>
              <p>
                Your recent transactions are listed at the bottom of the page.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-bold mb-2">What are ZKPs?</summary>
              <p>
                ZKPs, or Zero-Knowledge Proofs, are a cryptographic method by
                which one party (the prover) can prove to another party (the
                verifier) that they know a value x, without conveying any
                information apart from the fact that they know the value x.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-bold mb-2">
                How is the bank processing the transactions using ZKPs?
              </summary>
              <p>
                The bank uses ZKPs to verify the authenticity of transactions
                without revealing sensitive information. When a transaction is
                made, the bank can use a ZKP to prove that the transaction is
                valid and that the sender has enough funds, without revealing
                the sender's balance or the transaction amount.
              </p>
            </details>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Recent Transfers</h2>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p>
                  <strong>Transaction ID:</strong> {transaction.id}
                </p>
                <p>
                  <strong>Type:</strong> {transaction.name}
                </p>
                <p>
                  <strong>Amount:</strong> {transaction.amount.toString()}
                </p>
                <p>
                  <strong>Recipient:</strong> {transaction.recipient.toString()}
                </p>
                <p>
                  <strong>Timestamp:</strong> {transaction.timestamp}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <FontAwesomeIcon icon={faInfoCircle} />
              <p className="text-black1-700 text-lg font-medium">
                No records found{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
