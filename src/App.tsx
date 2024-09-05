import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setFilter } from "./store/userSlice";
import { RootState, AppDispatch } from "./store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, loading, filters } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange =
    (field: keyof typeof filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter({ field, value: event.target.value }));
    };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" gutterBottom>
        User Management Table
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TextField
                label="Name"
                value={filters.name}
                onChange={handleFilterChange("name")}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Username"
                value={filters.username}
                onChange={handleFilterChange("username")}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Email"
                value={filters.email}
                onChange={handleFilterChange("email")}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Phone"
                value={filters.phone}
                onChange={handleFilterChange("phone")}
                fullWidth
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default App;

