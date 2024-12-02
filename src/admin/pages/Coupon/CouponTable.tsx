import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, styled, TableFooter, TablePagination } from '@mui/material';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}


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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const accountStatuses = [
    { status: 'ACTIVE', title: 'Active', description: 'Account is active and in good standing' },

    { status: 'PENDING_VERIFICATION', title: 'Pending Verification', description: 'Account is created but not yet verified' },
    { status: 'SUSPENDED', title: 'Suspended', description: 'Account is temporarily suspended, possibly due to violations' },
    { status: 'DEACTIVATED', title: 'Deactivated', description: 'Account is deactivated, user may have chosen to deactivate it' },
    { status: 'BANNED', title: 'Banned', description: 'Account is permanently banned due to severe violations' },
    { status: 'CLOSED', title: 'Closed', description: 'Account is permanently closed, possibly at user request' }
];


export default function CouponTable() {

    const [status, setStatus] = React.useState(accountStatuses[0].status)
 
 
    const rows = [
        createData('Pankaj',12,23,34,28),
        createData('Poonam',10,22,3,89),
        createData('Rahul',10,53,56,56)
      ]


    return (
        <>
            <div className='pb-5 w-60'>
                <FormControl color='primary' fullWidth>
                    <Select
                        //   labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        // onChange={handleAccountStatusChange}
                        color='primary'
                        className='text-primary-color'

                    >
                        {accountStatuses.map((status) =>
                            <MenuItem value={status.status}>{status.title}</MenuItem>)}

                    </Select>
                </FormControl>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Coupon Code</StyledTableCell>
                            <StyledTableCell >Start Date</StyledTableCell>
                            <StyledTableCell >End Date</StyledTableCell>
                            <StyledTableCell >Minimum Order Value</StyledTableCell>
                            <StyledTableCell >Discount %</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((seller) => (
                            <StyledTableRow key={seller.name}>
                                <StyledTableCell component="th" scope="row">
                                    {seller.name}
                                </StyledTableCell>
                                <StyledTableCell >{seller.fat}</StyledTableCell>
                                <StyledTableCell >{seller.carbs}</StyledTableCell>
                                <StyledTableCell >{seller.calories}</StyledTableCell>
                                <StyledTableCell >{seller.protein}</StyledTableCell>
                             

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
