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
  const classes = useStyles();
  const history=useHistory();
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
  const [top, setTop]=useState([{_id: "",order:0, name: "",match:0,trophies:0,win_rate:0}]);

  useEffect(() => {

  
  const res =  fetch(url+`chart`, {
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
      setTop(result);
      
    })
    .catch((err) => {
      setSuccess(false);
      console.log("fail load history");
    });
  }, []);
  function handleReturn(){
    history.push('/homepage')
  }

  return (
    <>
    <Card
      // className={clsx(classes.root, className)}
      // {...rest}
    >
      <CardHeader title="Bảng xếp hạng" />
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
                 Tên người chơi
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
                      Số cúp
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Số trận
                </TableCell>
                <TableCell>
                  Tỉ lệ thắng
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {top.map((order) => (
                <TableRow
                  hover
                key={order._id}
                >
                  <TableCell>
                    {order.order}
                  </TableCell>
                  <TableCell>
                    {order.name}
                  </TableCell>
                  <TableCell>
                    {/* {moment(order.createdAt).format('DD/MM/YYYY')} */}
                    {order.trophies}
                  </TableCell>
                  <TableCell>
                    {order.matches}
                  </TableCell>
                  <TableCell>
                    {order.win_rate}
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
          href='/'
        >
          Xem chi tiết
        </Button> */}
      </Box>
       {/* <Button variant="contained" href='/homepage'  color="primary">
           Quay về
        </Button> */}
    </Card>
    <div>
      <div style={{marginTop: '10px'}}>
        <Button variant="contained" color="primary" onClick={handleReturn}>Trở về</Button>
      </div>
    </div>
    </>
  );
};

// LatestOrders.propTypes = {
//   className: PropTypes.string
// };

