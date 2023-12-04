import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TEInput,
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
  TEModalHeader,
  TERipple,
  TESelect,
  TETextarea,
} from "tw-elements-react";
import { AppDispatch, RootState } from "../state/store";
import {
  Transaction,
  addTransactionItem,
} from "../state/Reducers/TransactionSlice";
import { addCategory } from "../state/Reducers/CategoriesSlice";

interface Props {
  isModalVisible: boolean;
  onCloseModal: () => void;
}

const ExpenseEntryForm: React.FC<Props> = ({
  isModalVisible,
  onCloseModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const Categories = useSelector(
    (state: RootState) => state.categories.Categories
  );
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    item: "",
    category: "",
    cost: 0,
    date: "",
    notes: "",
  });

  const onFieldInput = <key extends keyof Transaction>(
    id: key,
    value: Transaction[key]
  ) => {
    setNewTransaction({ ...newTransaction, [id]: value });
  };

  const clearInputFields = () => {
    setNewTransaction({
      id: "",
      item: "",
      category: "",
      cost: 0,
      date: "",
      notes: "",
    });
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    dispatch(
      addTransactionItem({ ...newTransaction, id: self.crypto.randomUUID() })
    );
    onCloseModal();
    clearInputFields();
  };

  const onAddCategory = (e: any) => {
    dispatch(
      addCategory({
        text: e.target.value,
        value: e.target.value,
      })
    );

    e.target.value = "";
  };

  return (
    <>
      {console.log("Categories: ", Categories)}
      <TEModal show={isModalVisible}>
        <TEModalDialog centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Add New Transaction
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => onCloseModal()}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              {/*body*/}
              <form>
                <TEInput
                  id="cost"
                  type="number"
                  label="Amount"
                  size="lg"
                  value={newTransaction.cost}
                  onChange={(event) =>
                    onFieldInput(
                      event.target.id as keyof Transaction,
                      Number(event.target.value)
                    )
                  }
                >
                  <small className="absolute w-full text-neutral-500 dark:text-neutral-200">
                    Enter your Expenses with (-) nigative value your Income with
                    positive value
                  </small>
                </TEInput>
                <TEInput
                  id="item"
                  type="text"
                  label="Item"
                  className="mt-12 mb-6"
                  size="lg"
                  value={newTransaction.item}
                  onChange={(event) =>
                    onFieldInput(
                      event.target.id as keyof Transaction,
                      event.target.value
                    )
                  }
                ></TEInput>
                <TEInput
                  id="date"
                  type="date"
                  label="Date"
                  className="mt-12 mb-6"
                  size="lg"
                  value={newTransaction.date}
                  onChange={(event) =>
                    onFieldInput(
                      event.target.id as keyof Transaction,
                      event.target.value
                    )
                  }
                ></TEInput>

                <div className="relative mt-12 mb-6">
                  <TESelect
                    id="category"
                    label="category"
                    preventFirstSelection
                    data={Categories}
                    value={newTransaction.category}
                    size="lg"
                    onValueChange={(event: any) =>
                      onFieldInput("category", event.value)
                    }
                  >
                    <div className="relative flex-auto p-4">
                      <TEInput
                        type="text"
                        label="Add Category"
                        className="relative"
                        onKeyUp={(e) => {
                          e.key === "Enter" ? onAddCategory(e) : null;
                        }}
                      >
                        <small className="absolute w-full text-neutral-500 dark:text-neutral-200">
                          press "ENTER" to add new Cateogry
                        </small>
                      </TEInput>
                    </div>
                  </TESelect>
                </div>

                <TETextarea
                  id="notes"
                  label="Notes"
                  rows={4}
                  value={newTransaction.notes}
                  onChange={(event) =>
                    onFieldInput(
                      event.target.id as keyof Transaction,
                      event.target.value
                    )
                  }
                ></TETextarea>
                {/* <!--Submit button--> */}
                <TEModalFooter>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      onClick={() => onCloseModal()}
                    >
                      Close
                    </button>
                  </TERipple>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={onSubmitHandler}
                    >
                      Save
                    </button>
                  </TERipple>
                </TEModalFooter>
              </form>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </>
  );
};

export default ExpenseEntryForm;
