import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transactions {
    id: string;
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string;
}

type TransactionsInput = Omit<Transactions, "id" | "createdAt">;

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transactions[];
    createTransaction: (Transactions: TransactionsInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transactions[]>([]);

    useEffect(() => {
        api.get("transactions")
         .then((response) => setTransactions(response.data.transactions));
    }, []);
  
    async function createTransaction(transactionInput: TransactionsInput){
        const response = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )

}

export function useTransactions(){
    const context = useContext(TransactionsContext);
    
    return context;
}