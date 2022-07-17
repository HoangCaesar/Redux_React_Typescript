import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

const StyledButton = styled(Button)`
    margin-right: 8px;
`;

export interface StudentTableProps {
    studentList: Student[];
    cityMap: {
        [key: string]: City;

    }
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
    //  ****************************

    // Dialog+Remove logic
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (student: Student) => {
        // Set Selected student
        setSelectedStudent(student);
        // Show confirm dialog
        setOpen(true);
    };

    const handleRemoveConfirm = (student: Student) => {
        onRemove?.(student);
        setOpen(false);
    }

    return (
        <Box>
            {/* {Student Table} */}
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {studentList.map((student, index) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={getMarkColor(student.mark)}>
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="right">
                                    <StyledButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit?.(student)}
                                    >
                                        Edit
                                    </StyledButton>
                                    <StyledButton
                                        size="small"
                                        sx={{ color: '#aaa' }}
                                        onClick={() => handleRemoveClick(student)}
                                    >
                                        Remove
                                    </StyledButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Remove dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to remove this student?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove student name: <b>{selectedStudent?.name}</b>. <br />
                        This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
                    <Button
                        onClick={() => handleRemoveConfirm(selectedStudent as Student)}
                        color="secondary"
                        autoFocus
                        variant="contained"
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default StudentTable;
