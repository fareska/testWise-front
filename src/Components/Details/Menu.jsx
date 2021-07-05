import '../../styles/menu.css';
import Loader from "react-loader-spinner";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import MenuItem from './MenuItem';
import Error from '../Error';
import ApiManager from '../../ApiManager';
const apiManager = new ApiManager();

export default class Menu extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            isAdmin: true,
            menu: {},
            resId: '',
            errMessage: ''
        }
    }

    componentDidMount = async () => {
        let resId = window.location.pathname.slice(6, window.location.pathname.length);
        this.setState({ resId });
        const res = await apiManager.getMenu(resId);
        res === 'Not Found'
            ? this.setState({ errMessage: "Restaurant doesn't exist", loading: false })
            : this.setState({ menu: res, loading: false });
    }

    render() {
        return (
            <div className='background' >
                <div style={{ margin: '0px 100px', paddingTop: '100px' }}>
                    {this.state.loading
                        ? <Loader
                            type="Circles"
                            color="#00BFFF"
                            height={80}
                            width={80}
                        />
                        : this.state.errMessage.length > 1
                            ? <Error err={this.state.errMessage} />
                            : <Card className='cardContainer' style={{ color: 'black', textAlign: 'center', backgroundColor: '#000000', opacity: '0.7', border: 'none' }} >
                                <Card.Body>
                                    <Card.Title style={{ color: 'white' }} >{this.state.menu.menuName}</Card.Title>
                                </Card.Body>

                                <ListGroup className="list-group-flush">
                                    {this.state.menu.items.map(i => <MenuItem key={i.item_id} item={i} />)}
                                </ListGroup>

                                <Card.Body>
                                    {this.state.isAdmin
                                        ? <Button variant="primary">
                                            <Link style={{ color: 'white' }} to={`/edit/${this.state.resId}`}>
                                                Edit Menu
                                            </Link>
                                        </Button>

                                        : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Only admin allowed to edit the menu!</Tooltip>}>
                                            <span className="d-inline-block">
                                                <Button disabled style={{ pointerEvents: 'none' }}>Edit menu </Button>
                                            </span>
                                        </OverlayTrigger>
                                    }
                                </Card.Body>
                            </Card>
                    }
                </div>
            </div>
        )
    }
}