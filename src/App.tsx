// import styled from 'styled-components'

import { useState } from "react";
import { Dashboard } from "./componentes/Dashboard";
import { Header } from "./componentes/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal"
import { NewTransactionModal } from "./componentes/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

// let Title = styled.h1`
//   font-size: 4rem;
//   color: darkkhaki;
//   p{
//     font-size: 1.5rem;
//     background-color: darkmagenta;
//   }

// `

Modal.setAppElement("#root")

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen]=useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }
  
  return (
      <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
        <Dashboard/>
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
        <GlobalStyle/>
      </TransactionsProvider>
      
)
}