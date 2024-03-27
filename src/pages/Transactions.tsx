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

const Transactions: FunctionComponent = () => {
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
        const transactions = userTransactions.map((transaction) => ({
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
      await backendActor.deposit(result.amount, result.id, result.timestamp);

      console.log("Deposit successful!");
      setSuccessMessage("Deposit successful!");

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
          <h1 className="text-2xl font-bold">My Transactions</h1>
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

        <div className="mt-10">
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

export default Transactions;
