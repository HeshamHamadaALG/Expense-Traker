import { useState } from "react";
import ExpenseEntryForm from "./components/ExpenseEntryForm";
import TransactionsSummary from "./components/TransactionsSummary";
import BalanceCard from "./components/BalanceCard";

function App() {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);

  const onHideModal = () => setShowEntryForm(false);
  const onShowModal = () => setShowEntryForm(true);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Expense Tracker App
        </h1>
        <BalanceCard />
        <ExpenseEntryForm
          isModalVisible={showEntryForm}
          onCloseModal={onHideModal}
        />
        <TransactionsSummary onOpenModal={onShowModal} />
      </div>
    </>
  );
}

export default App;
