export interface DashboardSummaryResponse {
  notPaidOrders:         number;
  numberOfOrders:        number;
  paidOrders:            number;
  numberOfClients:       number;
  numberOfProducts:      number;
  produtsWithNoInvetory: number;
  lowInventory:          number;
}
