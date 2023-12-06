import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  Transaction,
  deleteTransactionItem,
  getTotalBalance,
  getTotalInCome,
  getTotalOutCome,
} from "../state/Reducers/TransactionSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, Button } from "@mui/joy";
import FiltersCard from "./FiltersCard";

interface Props {
  onOpenModal: () => void;
}

const TransactionsSummary: React.FC<Props> = ({ onOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const Transactions = useSelector(
    (state: RootState) => state.transaction.TransactionItems
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState(Transactions);

    useEffect(() => {
      const result = Transactions.filter(function (ob1) {
        return filteredTransactions.some(function (ob2) {
          return ob1.id === ob2.id;
        });
      }); 
      setFilteredTransactions(result);
    }, [Transactions]);
    

  const onHandleDelete = (deletedItem: Transaction) => {
    dispatch(deleteTransactionItem(deletedItem));
    dispatch(getTotalBalance());
    dispatch(getTotalInCome());
    dispatch(getTotalOutCome());
  };

  const resetFilteredValues = () => {
    setFilteredTransactions(Transactions);
  }

  return (
    <>
      <Card variant="plain" invertedColors sx={{ marginTop: "1rem" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FiltersCard
            filterTransactions={Transactions}
            onHandleFilter={setFilteredTransactions}
            resetFilters={resetFilteredValues}
          />
          <Button
            variant="solid"
            color="success"
            size="lg"
            onClick={() => onOpenModal()}
            sx={{ marginLeft: "auto" }}
          >
            Add New Transaction
          </Button>
        </Box>
        <Box sx={{ position: "relative" }}>
          <CardContent orientation="horizontal">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                {filteredTransactions.length > 0 ? (
                  <TableBody>
                    {filteredTransactions.map((transItem: any) => (
                      <TableRow
                        key={transItem.id}
                        style={{
                          backgroundColor:
                            transItem.cost < 0
                              ? "rgb(250 229 233)"
                              : "rgb(214 250 228)",
                        }}
                      >
                        <TableCell>{transItem.item}</TableCell>
                        <TableCell>{transItem.category}</TableCell>
                        <TableCell>{transItem.cost} EGP</TableCell>
                        <TableCell>{transItem.date}</TableCell>
                        <TableCell>{transItem.notes}</TableCell>
                        <TableCell>
                          <Button
                            variant="solid"
                            color="danger"
                            onClick={() => onHandleDelete(transItem)}
                            startDecorator={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableCell colSpan={6} align="center">
                      <h2 style={{ color: "#636b74" }}>
                        No Transactions Added
                      </h2>
                    </TableCell>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default TransactionsSummary;
