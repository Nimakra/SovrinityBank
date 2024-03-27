import { FunctionComponent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/hooks/ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

type Transaction = {
  id: string;
  name: string;
  amount: bigint;
  sender: string;
  recipient: string;
  timestamp: string;
};

const Withdraw: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { backendActor, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = Number(await backendActor.getAccountBalance());
        setBalance(userBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [backendActor, user]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userTransactions = await backendActor.getMyTransactions();
        const withdrawTransactions = userTransactions.filter(
          (transaction) => transaction.name === "Withdraw"
        );
        const transactions = withdrawTransactions.map((transaction) => ({
          ...transaction,
          sender: transaction.sender.toString(),
          recipient: transaction.recipient.toString(),
        }));
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [backendActor, user]);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const result = {
        id: uuidv4(),
        amount: BigInt(parseInt(data.amount)),
        timestamp: new Date().toISOString(),
      };

      console.log(result.amount, result.id, result.timestamp);
      await backendActor.withdraw(result.amount, result.id, result.timestamp);

      console.log("Withdraw successful!");
      setSuccessMessage("Withdraw successful!");

      const userBalance = Number(await backendActor.getAccountBalance());
      setBalance(userBalance);
    } catch (error) {
      console.error(error);
      console.log(error);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-montserrat">
      <Header />
      <div className="mx-auto max-w-[1180px] px-8 mt-10 text-left">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-sm text-gray-500">
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-black" />
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
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="accountNumber"
                >
                  USDT Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="accountNumber"
                  type="text"
                  placeholder="Enter Address"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="withdrawalReason"
                >
                  Withdrawal Reason
                </label>
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="withdrawalReason"
                  type="text"
                  placeholder="Withdrawal Reason"
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
                  {...register("amount", { required: true })}
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Withdrawing..." : "Withhdraw"}
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
                How do I make a withdraw?
              </summary>
              <p>
                To make a withdraw, enter the amount you want to withdraw and
                click the "Withdraw" button.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-bold mb-2">
                How do I know my transaction was successful?
              </summary>
              <p>
                You will receive a confirmation message after the withdraw is
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
          <h2 className="text-xl font-bold mb-4">Recent Withdraws</h2>
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

export default Withdraw;
