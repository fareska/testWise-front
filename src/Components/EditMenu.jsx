import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';

import EditMenuItem from './EditMenuItem';

export default class EditMenu extends Component {

    constructor() {
        super()
        this.state = {
            menuName: '',
            table: 'menu',
            items: []
        }
    }

    handleMenuName = (e) => {
        let value = e.target.value
        let name = e.target.name
        console.log(name, value);
        this.setState({
            [name]: value
        })
    }

    updateItem = (item) => {
        let items = [...this.state.items]
        items.push(item)
        this.setState({items})
    }

    updateMenu = () => this.props.update(this.state)

    render() {
        let menu = this.props.menu

        return (
            <div>
                <br />
                <Form>
                    <Row style={{margin: '4px 10px'}}>
                        
                        <Col>
                            Menu 
                            <Form.Control name='menuName' onChange={this.handleMenuName} placeholder={menu.menuName} />
                        </Col>

                        <Col> 
                        <Col>
                           name
                        </Col>
                            <Button onClick={this.updateMenu} variant="primary">Submit</Button>
                        </Col>

                    </Row>
                    <br />

                    <br />
                    {menu.items.map(i => <EditMenuItem updateItem={this.updateItem} key={i.item_id} item={i} />)}
                </Form>
                <br />
            </div>
        )
    }
}

