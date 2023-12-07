import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Input,
  Stack,
  Typography,
} from "@mui/joy";

const MonthlyBudget: React.FC = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0);
  const [totalTransactionsCost, setTotalTransactionsCost] = useState<number>(0);
  const [incomeTransactionsCost, setIncomeTransactionsCost] =
    useState<number>(0);
  const [outcomeTransactionsCost, setOutcomeTransactionsCost] =
    useState<number>(0);
  const [currentMonthString, setCurrentMonthString] = useState<string>("");
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState<number>(0);

  const transactions = useSelector(
    (state: RootState) => state.transaction.TransactionItems
  );

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() + 1 === currentMonth;
    });

    const totalCost = filteredTransactions.reduce(
      (total, transaction) => total + transaction.cost,
      0
    );

    const incomeCost = filteredTransactions
      .filter((transaction) => transaction.cost > 0)
      .reduce((total, transaction) => total + transaction.cost, 0);

    const outcomeCost = filteredTransactions
      .filter((transaction) => transaction.cost < 0)
      .reduce((total, transaction) => total + transaction.cost, 0);

    setTotalTransactionsCost(totalCost);
    setIncomeTransactionsCost(incomeCost);
    setOutcomeTransactionsCost(outcomeCost);
    setCurrentMonthString(getCurrentMonth());
  }, [transactions, monthlyBudget]);

  const handleBudgetSubmit = (e: any) => {
    e.preventDefault();
    setMonthlyBudget(monthlyBudgetInput);
  };

  function getCurrentMonth(): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthString = months[currentMonth];
    const formattedDate = `${monthString}, ${currentYear}`;

    return formattedDate;
  }

  return (
    <Card
      variant="solid"
      color="neutral"
      invertedColors
      sx={{ minWidth: "35%", marginLeft: "auto" }}
    >
      {monthlyBudget ? (
        <>
          <CardContent orientation="horizontal">
            <CardContent sx={{ textAlign: "left" }}>
              <Typography level="h4">
                Month Budget: {monthlyBudget} EGP
              </Typography>
              <Typography level="h4">{currentMonthString}</Typography>
            </CardContent>
          </CardContent>
          <Card variant="soft" color="neutral">
            <CardContent orientation="vertical" sx={{ display: "flex", alignItems: "centre"}}>
              <Typography level="h2">
                {totalTransactionsCost}
                <Typography fontSize="lg" fontWeight="lg" color="primary">
                  /{monthlyBudget} EGP
                </Typography>
              </Typography>
              <CardContent orientation="horizontal" sx={{ margin: "auto" }}>
                <div>
                  <Typography level="body-xs">Month Income:</Typography>
                  <Typography
                    fontSize="lg"
                    fontWeight="lg"
                    sx={{ color: "#79fb79" }}
                  >
                    {incomeTransactionsCost} EGP
                  </Typography>
                </div>
                <div>
                  <Typography level="body-xs">Month Outcome:</Typography>
                  <Typography
                    fontSize="lg"
                    fontWeight="lg"
                    sx={{ color: "#faa" }}
                  >
                    {outcomeTransactionsCost} EGP
                  </Typography>
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <CardContent sx={{ textAlign: "centre" }}>
            <Typography level="h3">No Budget Added</Typography>
            <form onSubmit={handleBudgetSubmit}>
              <Stack spacing={1.5} sx={{ minWidth: 300 }}>
                <FormControl>
                  <Input
                    name="budget"
                    required
                    type="number"
                    placeholder="Add Budget"
                    onChange={(event) =>
                      setMonthlyBudgetInput(Number(event.target.value))
                    }
                  />
                </FormControl>

                <Button type="submit" color="primary">
                  Add
                </Button>
              </Stack>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default MonthlyBudget;
