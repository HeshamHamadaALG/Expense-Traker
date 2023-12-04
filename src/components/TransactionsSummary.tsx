import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { Transaction, deleteTransactionItem } from "../state/Reducers/TransactionSlice";

const TransactionsSummary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Transactions = useSelector(
    (state: RootState) => state.transaction.TransactionItems
  );

  const onHandleDelete = (deletedItem: Transaction) => {
    dispatch(deleteTransactionItem(deletedItem));
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Cost
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Transactions.map((transItem: any) => (
                  <tr
                    key={transItem.id}
                    className="border-b border-danger-200 bg-danger-100 text-neutral-800"
                    style={{backgroundColor: transItem.cost < 0 ?  "rgb(250 229 233)" : "rgb(214 250 228)"}}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {transItem.item}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transItem.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transItem.cost} EGP
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transItem.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transItem.notes}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => onHandleDelete(transItem)}
                        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsSummary;
