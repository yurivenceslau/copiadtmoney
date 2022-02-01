import { FormEvent, useState} from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg"
import IncomeImg from "../../assets/income.svg"
import OutcomeImg from "../../assets/outcome.svg"
import { useTransactions } from "../../hooks/useTransactions";
import { Container,TransactionsTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
const { createTransaction } = useTransactions();

const [type, setType] = useState("")
const [title, setTitle] = useState("")
const [amount, setAmount] = useState(0)
const [category, setCategory] = useState("")
  
  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle("");
    setType("");
    setCategory("");
    setAmount(0);

    onRequestClose();
  }

  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
    
    <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="close.svg" />
    </button>
        
    <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input placeholder="Titulo" value={title} onChange={event => setTitle(event.target.value)}/>
        <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
        <TransactionsTypeContainer>
            <RadioBox type="button" isActive={type === "deposit"} activeColor="green" onClick={() => {setType("deposit");}}>
                <img src={IncomeImg} alt="income.svg" />
                <span>Entrada</span>
            </RadioBox>

            <RadioBox type="button" isActive={type === "withdraw"} activeColor="red" onClick={() => {setType("withdraw");}}>
                <img src={OutcomeImg} alt="outcome.svg" />
                <span>Retirada</span>
            </RadioBox>
        </TransactionsTypeContainer>
        <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>
        <button type="submit">Cadastrar</button>
    </Container>
    </Modal>
  );
}
