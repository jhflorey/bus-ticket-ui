import * as React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { deleteTrip, getTripById } from "../../../actions/trip";

import * as ITF from "../../../interface/trip";
import _ from "lodash";
import { toggleModal } from "../../../actions/main";

import M from "moment";


interface ITableTripProps {
  data: Array<ITF.Trip>,
  deleteTrip: (id: string) => void,
  toggleModal: (value: boolean) => void,
  getTripById: (id: string) => void
}

interface Data {
  fromStation: string,
  price: string,
  startTime: string,
  toStation: string,
  actions: string,
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'fromStation', numeric: false, label: 'Start' },
  { id: 'price', numeric: true, label: 'Price' },
  { id: 'startTime', numeric: false, label: 'Start time' },
  { id: 'toStation', numeric: false, label: 'Destination' },
  { id: 'actions', numeric: false, label: 'Actions' },
];

interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    button: {
      margin: theme.spacing(1),
    }
  }),
);


const TableTrip: React.FunctionComponent<ITableTripProps> = (props) => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteTrip = (id: string) => {
    props.deleteTrip(id);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                rowCount={props.data.length}
              />
              <TableBody>
                {
                  props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell component="th" id={labelId} scope="row" padding="default">
                            {_.get(row, "fromStationId.name", "")}
                          </TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="left">{M(row.startTime, "YYYY-MM-DDTHH:mm:ss").format("HH:mm DD/MM/YYYY")}</TableCell>
                          <TableCell align="left">{_.get(row, "toStationId.name", "")}</TableCell>
                          <TableCell align="left">
                            <Button color="secondary" onClick={() => onDeleteTrip(_.get(row, "_id", ""))}>Delete</Button>
                            <Button color="primary" onClick={() => {
                              props.toggleModal(true);
                              props.getTripById(_.get(row, "_id", ""))
                            }}>Edit</Button>
                          </TableCell>

                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { deleteTrip, toggleModal, getTripById })(TableTrip);
