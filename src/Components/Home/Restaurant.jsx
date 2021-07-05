import '../../styles/res.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class Restaurant extends Component {

    render() {
        return (
            <div >
                <Card className='cardBody' >
                    <Card.Body >
                        <Card.Title>
                            {this.props.resData.res_name}
                        </Card.Title>
                        <Card.Text>
                            <strong>Address : </strong>
                            {this.props.resData.address}
                            <br />

                            <strong>Phone Number : </strong>
                            {this.props.resData.res_phone}
                            <br />
                            <a id="website" href={this.props.resData.res_website}>Website</a>
                        </Card.Text>
                        {
                            this.props.resData.menu_id === 1
                                ? <Button className="button" onClick={this.getMenuResId} variant="primary">
                                    <Link style={{ color: 'white' }} to={`/menu/${this.props.resData.res_id}`}>
                                        Menu
                                    </Link>
                                </Button>
                                : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unfortunately the menu not available yet, please visit the restaurant website!</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button id="disabled" className="button" disabled style={{ pointerEvents: 'none' }}>Menu </Button>
                                    </span>
                                </OverlayTrigger>
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
