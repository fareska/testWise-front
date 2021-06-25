import '../styles/res.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class Restaurant extends Component {

    getMenuResId = () => this.props.getMenuResId(this.props.resData.res_id)

    render() {
        return (
            <div >
                <Card className='cardBody' style={{ margin: '2px 0px', width: '100%', height: 'auto', color: 'black' }}>
                    {/* <Card.Img variant="top" src={this.props.resData.img} /> */}
                    <Card.Body >
                        <Card.Title>{this.props.resData.res_name}</Card.Title>
                        <Card.Text>
                            <strong>Address: </strong>
                            {this.props.resData.address}
                            <br />

                            <strong>Phone Number: </strong>
                            {this.props.resData.res_phone}
                            <br />
                            <a href={this.props.resData.res_website}>Website</a>

                        </Card.Text>
                        {
                            this.props.resData.menu_id === 1
                                ? <Button onClick={this.getMenuResId} variant="primary">
                                    <Link style={{ color: 'white' }} to={`menu/${this.props.resData.res_id}`}>
                                        Menu
                                    </Link>
                                </Button>
                                : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unfortunately the menu not available yet, please visit the restaurant website!</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button disabled style={{ pointerEvents: 'none' }}>Menu </Button>
                                    </span>
                                </OverlayTrigger>
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
