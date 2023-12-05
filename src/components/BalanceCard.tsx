import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy";

const BalanceCard: React.FC = () => {
  const Balance = useSelector((state: RootState) => state.transaction.Balance);
  const InCome = useSelector((state: RootState) => state.transaction.InCome);
  const OutCome = useSelector((state: RootState) => state.transaction.OutCome);
  return (
    <div>
      <Card variant="solid" color="neutral" invertedColors>
        <CardContent orientation="horizontal">
          <CardContent>
            <Typography level="body-md">Balance</Typography>
            <Typography level="h2">{Balance} EGP</Typography>
          </CardContent>
        </CardContent>
        <Card variant="soft" color="neutral" invertedColors>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs">Income:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {InCome} EGP
              </Typography>
            </div>
            <div>
              <Typography level="body-xs">Outcome:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {OutCome} EGP
              </Typography>
            </div>
          </CardContent>
        </Card>
        <CardActions>
          <Button variant="solid" size="sm">
            See Reports
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default BalanceCard;
