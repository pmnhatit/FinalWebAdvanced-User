import React, { useState,useContext } from 'react';
import  { useEffect } from "react";
// import clsx from 'clsx';
// import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Context } from "../Constant/context";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';



const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));


export default function MatchHistory() {
  const history=useHistory();
  const classes = useStyles();
  // const [orders] = useState(data);
  const [context, setContext] = useContext(Context);
  //----------------------------------------------
  const user = JSON.parse(localStorage.getItem('user'));
  const token=JSON.parse(localStorage.getItem('token'));
  //-------localstorage-----------------
  // const user=context.user;
  // const token =context.token;
  
  const url = localStorage.getItem("backend");
  const [success, setSuccess] = useState(true);
  const [data, setData]=useState([{_id: "5fd98a90fea29a4868ed1953", player_id: "null", enemy: "a", date: "dd/mm/yyyy", status: "null"}]);
  
//   console.log(user);
//   console.log(token);

  useEffect(() => {

  
  const res =  fetch(url+`profile/history/${user._id}`, {
    method: "GET",
    mode: "cors",
    headers: {
       Authorization:'Bearer '+ `${token}`,
       'Content-Type': 'application/json',
  },
    // body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setData(result);
      console.log(data);
    })
    .catch((err) => {
      setSuccess(false);
      console.log("fail load history");
    });
  }, [])

  return (
    <div>
    <Card
      // className={clsx(classes.root, className)}
      // {...rest}
    >
      <CardHeader title="Histories" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Số thứ tự
                </TableCell>
                <TableCell>
                 Đối thủ
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Ngày
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order) => (
                <TableRow
                  hover
                key={order._id}
                >
                  <TableCell>
                    {order.order}
                  </TableCell>
                  <TableCell>
                    {order.enemy}
                  </TableCell>
                  <TableCell>
                    {/* {moment(order.createdAt).format('DD/MM/YYYY')} */}
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                  <Button
                      color="primary"
                      endIcon={<ArrowRightIcon />}
                      size="small"
                      variant="text"
                      href={`/gamehistory/${order._id}`}
                      >
                       View all
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button> */}
      </Box>
    </Card>
    <div style={{marginTop: '10px'}}>
    <Button variant="contained" color="primary" onClick={handleReturn}>Trở về</Button>
    </div>
    </div>
  );
  function handleReturn(){
    history.push('/homepage')
  }
};

// LatestOrders.propTypes = {
//   className: PropTypes.string
// };

