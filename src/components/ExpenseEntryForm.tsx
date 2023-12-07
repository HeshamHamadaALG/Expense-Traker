import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  Transaction,
  addTransactionItem,
} from "../state/Reducers/TransactionSlice";
import { Category } from "../state/Reducers/CategoriesSlice";
import {
  Modal,
  ModalClose,
  Typography,
  ModalDialog,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Select,
  Option,
  Button,
  Textarea,
} from "@mui/joy";
import { Add } from "@mui/icons-material";
import AddCategory from "./AddCategory";

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
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
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

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isModalVisible}
        onClose={() => {
          onCloseModal();
          clearInputFields();
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog size="lg">
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add New Transaction
          </Typography>
          <form onSubmit={onSubmitHandler}>
            <Stack spacing={1.5} sx={{ minWidth: 300 }}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  name="cost"
                  required
                  type="number"
                  onChange={(event) =>
                    onFieldInput(
                      event.target.name as keyof Transaction,
                      Number(event.target.value)
                    )
                  }
                />
                <FormHelperText>
                  Enter your Expenses with (-) nigative value your Income with
                  positive value
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Item</FormLabel>
                <Input
                  name="item"
                  required
                  type="text"
                  onChange={(event) =>
                    onFieldInput(
                      event.target.name as keyof Transaction,
                      event.target.value
                    )
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  required
                  type="date"
                  onChange={(event) =>
                    onFieldInput(
                      event.target.name as keyof Transaction,
                      event.target.value
                    )
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  placeholder="Select a category"
                  required
                  onChange={(event: any) =>
                    onFieldInput("category", event.target.innerText)
                  }
                >
                  {Categories.map((categoryItem: Category, index: number) => (
                    <Option key={index} value={categoryItem.value}>
                      {categoryItem.text}
                    </Option>
                  ))}
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => setShowCategoryModal(true)}
                  >
                    Add New Category
                  </Button>
                </Select>
              </FormControl>

              <FormControl>
                <Textarea
                  placeholder="Notes..."
                  minRows={4}
                  name="notes"
                  onChange={(event) =>
                    onFieldInput(
                      event.target.name as keyof Transaction,
                      event.target.value
                    )
                  }
                />
              </FormControl>
              <Button type="submit" color="success">
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="neutral"
                onClick={() => {
                  onCloseModal();
                  clearInputFields();
                }}
              >
                Cancel
              </Button>
            </Stack>
          </form>
          <AddCategory isShowAddCategory={showCategoryModal} onCloseAddCategory={setShowCategoryModal}/>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ExpenseEntryForm;
