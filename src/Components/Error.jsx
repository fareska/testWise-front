import React, { Component } from 'react';
import '../styles/err.css';

export default class Error extends Component {
    render() {
        let err = this.props.err;

        return (
            <div id="errContainer">
                <div id="textContainer">
                    {
                        err === "Restaurant doesn't exist"
                            ? "Restaurant doesn't exist - ERROR 404"
                            : (err === "Unauthorized" || err === "Forbidden")
                                ? "Unauthorized - ERROR 403"
                                : "Page Not Found - ERROR 404"
                    }
                </div>
            </div>
        )
    }
}
