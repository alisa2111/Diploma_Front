import React, { Component } from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";

// material ui version 3.6.2
export default class Account extends React.PureComponent <{}> {

    render() {
        return (
           <React.Fragment>
               <PrimarySearchAppBar/>
               <h1>ACCOUNT PAGE</h1>
           </React.Fragment>
        );
    }
}

