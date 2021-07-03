import React, { Component } from 'react';
import '../styles/err.css';

export default class Error extends Component {
    render() {
        let err = this.props.err;

        return (
            <div id="container">
                <div id="textContainer">
                {
                    err === "Restaurant doesn't exist"
                    ? "Restaurant doesn't exist" 
                    : "Page Not Found - ERROR 404"
                }
                </div>
            </div>
        )
    }
}
