import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Hello extends Component {
  render() {

    let products = [{
      id: 1,
      name: "Product1",
      price: 120
    }, {
      id: 2,
      name: "Product2",
      price: 80
    }];

    const selectRow = {
      mode: 'checkbox',  // multi select
      hideSelectColumn: true,
      columnWidth: '20%'
    };

    return (
      <BootstrapTable data={ products } selectRow={ selectRow } striped hover>
        <TableHeaderColumn width="20%" isKey dataField='id'>Product ID</TableHeaderColumn>
        <TableHeaderColumn width="20%" dataField='name'>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Hello;
