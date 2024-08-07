import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface DashboardData {
  id: number;
  date: string;
  week: number;
  visitors: number;
  revenue: number;
  purchasedCustomer: string;
  totalCustomers: number;
  sellingProduct: string;
}

export default function Admin_Index() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/rsc/dashboard.php");
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const visitorsData = data.map((item) => ({
    date: item.date,
    visitors: item.visitors,
  }));
  const revenueData = data.map((item) => ({
    week: item.week,
    revenue: item.revenue,
  }));
  const dataSummary = data.map((item) => ({
    id: item.id,
    purchasedCustomer: item.purchasedCustomer,
    totalCustomers: item.totalCustomers,
    sellingProduct: item.sellingProduct,
  }));

  const totalCustomersData = [
    {
      name: "Elderly People",
      value: dataSummary.filter((item) => item.totalCustomers < 900).length,
    },
    {
      name: "Athletes",
      value: dataSummary.filter(
        (item) => item.totalCustomers >= 900 && item.totalCustomers < 1000
      ).length,
    },
    {
      name: "Adolescents",
      value: dataSummary.filter(
        (item) => item.totalCustomers >= 1000 && item.totalCustomers < 1100
      ).length,
    },
    {
      name: "Professionals",
      value: dataSummary.filter((item) => item.totalCustomers >= 1100).length,
    },
  ];

  const COLORS = ["#08B6CE", "#74D5DD", "#6A6F9E", "#B086BE"];
  return (
    <>
      <div className="h-[100vh] relative">
        <div className="h-full overflow-auto">
          <Container className="mt-10">
            <Typography variant="h4" className="text-green-200 mb-6">
              Administrator Dashboard
            </Typography>

            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6">Visitors Overview</Typography>
                <LineChart width={1100} height={400} data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6">Total Revenue (Weeks)</Typography>
                <BarChart width={1100} height={400} data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6">Total Customers</Typography>
                <PieChart width={800} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={totalCustomersData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {totalCustomersData.map((entry, index) => (
                      <Cell
                        key={`${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6">Data Summary</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Top Purchased Customer</TableCell>
                        <TableCell>Top Selling Product</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataSummary.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.purchasedCustomer}</TableCell>
                          <TableCell>{row.sellingProduct}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Container>
        </div>
        <div className="w-full absolute bottom-0">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(207, 159, 255, 0.8)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(207, 159, 255, 0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(207, 159, 255, 0.2)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#CF9FFF" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}