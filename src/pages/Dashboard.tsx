import { FunctionComponent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/hooks/ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faInfoCircle,
  faUser,
  faAt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { Principal } from "@dfinity/principal";
import QRCode from "qrcode.react";

type Transaction = {
  id: string;
  name: string;
  amount: bigint;
  sender: string;
  recipient: string;
  timestamp: string;
};

const Dashboard: FunctionComponent = () => {
  const {
    formState: { errors },
  } = useForm();
  const { backendActor, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = Number(await backendActor.getAccountBalance());
        setBalance(userBalance);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [backendActor, user]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userTransactions = await backendActor.getMyTransactions();
        const depositTransactions = userTransactions.filter(
          (transaction) => transaction.name === "Deposit"
        );
        const transactions = depositTransactions.map((transaction) => ({
          ...transaction,
          sender: transaction.sender.toString(),
          recipient: transaction.recipient.toString(),
        }));
        setTransactions(transactions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [backendActor, user]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-montserrat">
      <Header />
      <div className="mx-auto max-w-[1180px] px-8 mt-10 text-left">
        {user && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">My Account</h1>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-sm text-gray-500">
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="mr-2 text-black"
                    />
                    Current Balance
                  </h3>
                  <p className="text-xl font-semibold">
                    ${balance.toFixed(2)} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="bg-white shadow-lg p-4 rounded w-1/2 mr-8 h-[230px]">
                <h2 className="text-2xl font-bold mb-4">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> User
                  Info
                </h2>
                <p>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <strong>Username:</strong> {user.username.toString()}
                </p>
                <p>
                  <FontAwesomeIcon icon={faAt} className="mr-2" />
                  <strong>Handle:</strong> {user.handle.toString()}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  <strong>Created:</strong> {user.created.toString()}
                </p>
              </div>
              <div className="bg-white shadow-lg p-4 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">
                  <FontAwesomeIcon icon={faWallet} className="mr-2" /> My
                  Address
                </h2>
                <p className="text-base font-semibold w-4/5">
                  {user.id.toString()}
                </p>
                <div className="mt-2">
                  <QRCode value={user.id.toString()} size={100} />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 mt-8">
              Recent Transactions
            </h2>
            {transactions.map((transaction, index) => (
              <div key={index}>
                <p>
                  <strong>Transaction {index + 1}:</strong>
                </p>
                <p>
                  <strong>Type:</strong> {transaction.name}
                </p>
                <p>
                  <strong>Sender:</strong> {transaction.recipient.toString()}
                </p>
            
                <p>
                  <strong>Amount:</strong> {transaction.amount.toString()}
                </p>
              </div>
            ))}
            <Link
              to="/transactions"
              className="mt-4 no-underline inline-block bg-blue-500 text-white rounded px-4 py-2"
            >
              View All Transactions
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
