import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

export default class SidePanel extends Component {
  state = {
    open: false,
    query: ""
  }

  styles = {
    list: {
      width: "250px",
      padding: "0px 15px 0px"
    },
    noBullets: {
      listStyleType: "none",
      padding: 0
    },
    fullList: {
      width: 'auto'
    },
    listItem: {
      marginBottom: "15px"
    },
    listLink: {
      background: "transparent",
      border: "none",
      color: "black"
    },
    filterEntry: {
      border: "1px solid gray",
      padding: "3px",
      margin: "30px 0px 10px",
      width: "100%"
    }
  }

  render() {
    return ( <h1>Hello from Side Panel</h1>)
  }
}
