import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import MenuItem from './MenuItem';

export default class Menu extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            isAdmin: false
        }
    }

    checkAdmin = () => {
        let ans = this.props.manager.managerEmail === this.props.user
        this.setState({ isAdmin: ans })
    }

    componentDidMount = async () => {
        this.checkAdmin()
        await this.props.getMenuResId(this.props.match.params.id)
        this.setState({ loading: false })
    }

    render() {
        let menu = this.props.menu
        return (
            <div>
                {this.state.loading
                    ? 'Loding...'
                    : <Card style={{ color: 'black', textAlign: 'center', backgroundColor: 'rgb(183,197,184)', border: 'none' }} >
                        <Card.Body>
                            <Card.Title style={{ color: 'white' }} >{menu.menuName}</Card.Title>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            {menu.items.map(i => <MenuItem key={i.item_id} item={i} />)}
                        </ListGroup>

                        <Card.Body>
                            {this.state.isAdmin
                                ? <Button variant="primary">
                                    <Link style={{ color: 'white' }} to={`/edit`}>
                                        Edit Menu
                                    </Link>
                                </Button>

                                : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Only admin allowed to edit the menu!</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button disabled style={{ pointerEvents: 'none' }}>Menu </Button>
                                    </span>
                                </OverlayTrigger>}
                        </Card.Body>
                    </Card>
                }
            </div>
        )
    }
}

// const data = {
//     section_name: "Beverages",
//     menu_items: [
//         {
//             name: "Regular Coffee",
//             price: 2.25,
//             pricing: [],
//         },
//         {
//             name: "Regular Iced Cofee",
//             price: 3,
//             pricing: [],
//         },
//         {
//             name: "Decaf Coffee",
//             price: 2.25,
//             pricing: [],
//         },],
// }

// const pricing = {
//     currency: "USD",
//     price: 3,
//     priceString: "$3.00"
// }