import incomeTag from '../../assets/income.svg'
import outcomeTag from '../../assets/outcome.svg'
import totalTag from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function Summary() {
    const { transactions } = useTransactions()
   
    // const totalDeposit = transactions.reduce((acc, transactions) => {
    //     if(transactions.type === "deposit" ){
    //         return acc + transactions.amount;
    //     }
    //     return acc
    // }, 0);
    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === "deposit" ){
            acc.deposit += transaction.amount
            acc.total += transaction.amount
        }else{
            acc.withdraw += transaction.amount
            acc.total -= transaction.amount
        } 
        return acc;
    }, {
        deposit: 0,
        withdraw: 0,
        total: 0,
    })

  return (
    <Container>
        <div>
            <header>
                <p>Entradas</p>
                <img src={incomeTag} alt="income.svg" />
            </header>
            <strong>
                {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
                }).format(summary.deposit)}
            </strong>
        </div>

        <div>
            <header>
                <p>Saída</p>
                <img src={outcomeTag} alt="outcome.svg" />
            </header>
            <strong>
                - {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
                }).format( summary.withdraw)}
                
            </strong>
        </div>

        <div className="total_card">
            <header>
                <p>Total</p>
                <img src={totalTag} alt="total.svg" />
            </header>
            <strong>
                {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
                }).format(summary.total)}
                
            </strong>
        </div>
    </Container>
  );
}
