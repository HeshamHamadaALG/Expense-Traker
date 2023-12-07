import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";

const BalanceCard: React.FC = () => {
  const Balance = useSelector((state: RootState) => state.transaction.Balance);
  const InCome = useSelector((state: RootState) => state.transaction.InCome);
  const OutCome = useSelector((state: RootState) => state.transaction.OutCome);

  return (
    <div>
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", margin: "auto" }}
      >
        <Card
          variant="solid"
          color="neutral"
          invertedColors
          sx={{ minWidth: "35%" }}
        >
          <CardContent orientation="horizontal">
            <CardContent sx={{ textAlign: "left" }}>
              <Typography level="h3">
                Balance: <Typography level="h2">{Balance} EGP</Typography>
              </Typography>
            </CardContent>
          </CardContent>
          <Card variant="soft" color="neutral" invertedColors>
            <CardContent orientation="horizontal" sx={{ margin: "auto" }}>
              <div>
                <Typography level="body-xs">Income:</Typography>
                <Typography
                  fontSize="lg"
                  fontWeight="lg"
                  sx={{ color: "green" }}
                >
                  {InCome} EGP
                </Typography>
              </div>
              <div>
                <Typography level="body-xs">Outcome:</Typography>
                <Typography fontSize="lg" fontWeight="lg" sx={{ color: "red" }}>
                  {OutCome} EGP
                </Typography>
              </div>
            </CardContent>
          </Card>
          <CardActions>
            <Button component={Link} to={"/reports"} variant="solid" size="sm">
              See Reports
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default BalanceCard;
