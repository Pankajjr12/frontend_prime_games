import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  num: number,
  name: string,
  calories: number,
  carbs: number
) {
  return { num, name, calories, carbs };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 24),
  createData(2, "Ice cream sandwich", 237, 37),
  createData(3, "Eclair", 262,  24),
  createData(4, "Cupcake", 305, 67),
  createData(5, "Gingerbread", 356, 49),
];

export default function DealsTable() {
  const handleDelete = (id: any) => () => {
    console.log("delete");
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>image</StyledTableCell>
            <StyledTableCell>category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.num}</StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>

              <StyledTableCell align="right">
                    <IconButton >
                      <EditIcon className="text-black cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton>
                      
                      <Delete className="text-red-600 cursor-pointer" />
                    </IconButton>
                  </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
