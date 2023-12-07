import reducer, { addTransactionItem } from "../state/Reducers/TransactionSlice";


describe("TransactionSlice", () => {
  test("should dispatch addTransactionItem action", () => {
    const initialState = {
      TransactionItems: [],
      FilteredTransactions: [],
      Balance: 0,
      InCome: 0,
      OutCome: 0,
      MonthlyBudget: 0,
    };
    const transaction = {
      id: "1",
      item: "Item 1",
      category: "Category 1",
      cost: 10,
      date: "2022-01-01",
      notes: "test notes",
    };

    const transactionState = reducer(initialState, addTransactionItem(transaction));
    

    expect(transactionState.TransactionItems).toContain(transaction);
  });
});
