import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportCharts: React.FC = () => {
  const Transactions = useSelector(
    (state: RootState) => state.transaction.TransactionItems
  );
  useEffect(() => {
    filterDataCharts();
  }, [Transactions]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDataInCome, setChartDataInCome] = useState<number[]>([]);
  const [chartDataOutCome, setChartDataOutCome] = useState<number[]>([]);
  const [yearsArrayList, setYearsArrayList] = useState<number[]>([]);
  const [showYearSelect, setShowYearSelect] = useState<boolean>(false);
  const [monthsArray, setMonthsArray] = useState<any[]>([]);
  const [last30DaysArray, setLast30DaysArray] = useState<any[]>([]);

  const filterDataCharts = () => {
    const newArray: any[] = Transactions.map((item) => {
      const transactionDate = new Date(item.date);
      return {
        date: transactionDate.getDate(),
        month: transactionDate.getMonth() + 1,
        year: transactionDate.getFullYear(),
        cost: item.cost,
      };
    });

    // Array with last 30 days
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      const dayTransactions = newArray.filter(
        (item) =>
          item.date === currentDate.getDate() &&
          item.month === currentDate.getMonth() + 1 &&
          item.year === currentDate.getFullYear()
      );
      const totalInCome = dayTransactions
        .filter((item) => item.cost > 0)
        .reduce((sum, item) => sum + item.cost, 0);
      const totalOutCome = dayTransactions
        .filter((item) => item.cost < 0)
        .reduce((sum, item) => sum + item.cost, 0);
      setLast30DaysArray((prev) => [
        {
          DayDate: currentDate.getDate(),
          Month: currentDate.getMonth() + 1,
          TotalInCome: totalInCome || 0,
          TotalOutCome: totalOutCome * -1 || 0,
        },
        ...prev,
      ]);
    }

    // Array with years
    const yearsArray: number[] = Array.from(
      new Set(newArray.map((item) => item.year))
    );

    setYearsArrayList(yearsArray);

    // Array with months for each year
    yearsArray.forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        const monthTransactions = newArray.filter(
          (item) => item.month === month && item.year === year
        );
        const MonthInCome = monthTransactions
          .filter((item) => item.cost > 0)
          .reduce((sum, item) => sum + item.cost, 0);
        const MonthOutCome = monthTransactions
          .filter((item) => item.cost < 0)
          .reduce((sum, item) => sum + item.cost, 0);
        setMonthsArray((prev) => [
          ...prev,
          {
            Month: month,
            Year: year,
            MonthInCome: MonthInCome || 0,
            MonthOutCome: MonthOutCome * -1 || 0,
          },
        ]);
      }
    });
  };

  const handleLast7Days = () => {
    const last7Days = last30DaysArray.slice(-7);
    const labels = last7Days.map((day) => `${day.DayDate}/${day.Month}`);
    const dataInCome = last7Days.map((day) => day.TotalInCome);
    const dataOutCome = last7Days.map((day) => day.TotalOutCome);
    setShowYearSelect(false);
    setChartLabels(labels);
    setChartDataInCome(dataInCome);
    setChartDataOutCome(dataOutCome);
  };

  const handleLast30Days = () => {
    const labels = last30DaysArray.map((day) => `${day.DayDate}/${day.Month}`);
    const dataInCome = last30DaysArray.map((day) => day.TotalInCome);
    const dataOutCome = last30DaysArray.map((day) => day.TotalOutCome);

    setShowYearSelect(false);
    setChartLabels(labels);
    setChartDataInCome(dataInCome);
    setChartDataOutCome(dataOutCome);
  };

  const handleByYear = (selectedYear: number) => {
    const newMonthsArray: any[] = monthsArray.filter(
      (itemMonth) => selectedYear == itemMonth.Year
    );
    const labels = [
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
    const dataInCome = newMonthsArray.map((month) => month.MonthInCome);
    const dataOutCome = newMonthsArray.map((month) => month.MonthOutCome);

    setChartLabels(labels);
    setChartDataInCome(dataInCome);
    setChartDataOutCome(dataOutCome);
  };

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "InCome",
        data: chartDataInCome,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "OutCome",
        data: chartDataOutCome,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const onSelectFilter = (selectedValue: any) => {
    selectedValue === "last7Days" && handleLast7Days();
    selectedValue === "last30Days" && handleLast30Days();
    selectedValue === "ByYear" && setShowYearSelect(true);
  };

  return (
    <>
      <Card variant="plain" invertedColors sx={{ marginTop: "1rem" }}>
        <CardActions sx={{ marginLeft: "auto" }}>
          <Button
            component={Link}
            to={"/"}
            variant="solid"
            color="success"
            size="lg"
          >
            Back to Home
          </Button>
        </CardActions>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
            <Typography level="h3">Select Filter: </Typography>
            <Select
              placeholder="Filter By…"
              size="lg"
              sx={{ minWidth: 160 }}
              onChange={(event: any, selectedValue) => {
                event.preventDefault();
                onSelectFilter(selectedValue);
              }}
            >
              <Option value="last7Days">Last 7 days</Option>
              <Option value="last30Days">Last 30 days</Option>
              <Option value="ByYear">By Year</Option>
            </Select>

            {showYearSelect && (
              <Select
                placeholder="Select Year"
                size="lg"
                onChange={(e: any, value) => {
                  e.preventDefault();
                  handleByYear(Number(value));
                }}
              >
                {yearsArrayList.map((year: number) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            )}
          </CardContent>
          <Line options={options} data={data} style={{ maxHeight: "550px" }} />
        </Box>
      </Card>
    </>
  );
};

export default ReportCharts;
