import { useState } from "react";
import ExpenseEntryForm from "./components/ExpenseEntryForm";
import TransactionsSummary from "./components/TransactionsSummary";

function App() {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);

  const onHideModal = () => setShowEntryForm(false);
  const onShowModal = () => setShowEntryForm(true);

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <button
        className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => onShowModal()}
      >
        Add Transaction
      </button>
      <ExpenseEntryForm isModalVisible={showEntryForm} onCloseModal={onHideModal}/>
      <TransactionsSummary /> 
    </div>
    </>
  );
}

export default App;
