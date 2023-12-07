import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Option,
  Select,
  SelectStaticProps,
  Typography,
} from "@mui/joy";
import { CloseRounded } from "@mui/icons-material";
import { Transaction } from "../state/Reducers/TransactionSlice";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { Category } from "../state/Reducers/CategoriesSlice";

interface Props {
  filterTransactions: Transaction[];
  onHandleFilter: (filtered: Transaction[]) => void;
  resetFilters: () => void;
}

interface FilterDates {
  startDate: Date | null;
  endDate: Date | null;
}

const FiltersCard: React.FC<Props> = ({
  filterTransactions,
  onHandleFilter,
  resetFilters,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>("");
  const [dateValues, setDateValues] = useState<FilterDates>({
    startDate: null,
    endDate: null,
  });
  const action: SelectStaticProps["action"] = useRef(null);
  const Categories = useSelector(
    (state: RootState) => state.categories.Categories
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filtered = filterTransactions.filter((transaction) => {
      const result = transaction.item
        .toLowerCase()
        .includes(value.toLowerCase());
      return result;
    });
    onHandleFilter(filtered);
  };

  const handleCategoryFilter = (categoryValue: any) => {
    const filtered = filterTransactions.filter(
      (transaction) => categoryValue === transaction.category
    );
    onHandleFilter(filtered);
  };

  const handleDateFilter = () => {
    const { startDate, endDate } = dateValues;

    const filtered = filterTransactions.filter((transaction) => {
      const transTime = new Date(transaction.date);
      return (
        startDate && endDate && startDate < transTime && transTime < endDate
      );
    });

    onHandleFilter(filtered);
  };

  return (
    <>
      <Select
        action={action}
        value={selectedValue}
        placeholder="Filter By…"
        size="lg"
        onChange={(e: any, newValue) => {
          e && e.preventDefault();
          setSelectedValue(newValue);
        }}
        {...(selectedValue && {
          endDecorator: (
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
              onClick={() => {
                setSelectedValue(null);
                resetFilters();
                action.current?.focusVisible();
              }}
            >
              <CloseRounded />
            </IconButton>
          ),
          indicator: null,
        })}
        sx={{ minWidth: 160 }}
      >
        <Option value="Category">Category</Option>
        <Option value="Item">Item</Option>
        <Option value="Date">Date</Option>
      </Select>

      {selectedValue === "Category" && (
        <Select
          name="categoryFilter"
          placeholder="Select a category"
          size="lg"
          onChange={(e: any, catValue) => {
            e && e.preventDefault();
            handleCategoryFilter(catValue);
          }}
        >
          {Categories.map((categoryItem: Category, index: number) => (
            <Option key={index} value={categoryItem.value}>
              {categoryItem.text}
            </Option>
          ))}
        </Select>
      )}

      {selectedValue === "Item" && (
        <Input
          name="item"
          required
          placeholder="Type to search"
          type="text"
          size="lg"
          onChange={handleSearchChange}
        />
      )}

      {selectedValue === "Date" && (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleDateFilter();
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography>From: </Typography>
            <FormControl>
              <Input
                name="startDate"
                required
                type="date"
                onChange={(event) =>
                  setDateValues((prevDateValues: FilterDates) => ({
                    ...prevDateValues,
                    startDate: new Date(event.target.value),
                  }))
                }
              />
            </FormControl>
            <Typography>To: </Typography>
            <FormControl>
              <Input
                name="endDate"
                required
                type="date"
                onChange={(event) =>
                  setDateValues((prevDateValues: FilterDates) => ({
                    ...prevDateValues,
                    endDate: new Date(event.target.value),
                  }))
                }
              />
            </FormControl>
            <Button type="submit" color="success">
              Check
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default FiltersCard;
