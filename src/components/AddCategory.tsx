import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { addCategory } from "../state/Reducers/CategoriesSlice";
import {
  Modal,
  ModalClose,
  Typography,
  ModalDialog,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@mui/joy";

interface Props {
  isShowAddCategory: boolean;
  onCloseAddCategory: (value: boolean) => void;
}

const AddCategory: React.FC<Props> = ({
  isShowAddCategory,
  onCloseAddCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newCategory, setNewCategory] = useState<string>("");

  const onAddCategory = (e: any) => {
    e.preventDefault();
    dispatch(
      addCategory({
        text: newCategory,
        value: newCategory,
      })
    );
    onCloseAddCategory(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isShowAddCategory}
        onClose={() => {
          onCloseAddCategory(false);
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
            Add New Category
          </Typography>
          <form onSubmit={onAddCategory}>
            <Stack spacing={1.5} sx={{ minWidth: 300 }}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  name="categoryName"
                  required
                  type="text"
                  onChange={(event) => setNewCategory(event.target.value)}
                />
              </FormControl>

              <Button type="submit" color="primary">
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="neutral"
                onClick={() => {
                  onCloseAddCategory(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddCategory;
