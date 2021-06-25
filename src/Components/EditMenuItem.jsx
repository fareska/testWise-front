import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';


export default class EditMenuItem extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            price: ''
        }
    }


    handleItemInput = (e) => {
        let value = e.target.value
        let name = e.target.name
        console.log(name, value);
        this.setState({
            [name]: value
        })
    }


    updateItem = () => {
        let item = {
            item_id: this.props.item.item_id,
            item_name: this.state.name,
            price_string: this.state.price,
            table: 'item'
        }

        this.props.update(item)
    }

    render() {

        let item = this.props.item
        console.log('hello', this.props.item.item_id);

        return (
            <div style={{textAlign: 'center'}} >
                <Row>

                    <Row>
                        <Col>
                            item name
                        </Col>
                        <Col>
                            <Form.Control name='name' onChange={this.handleItemInput} style={{ color: 'black' }} placeholder={item.item_name} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            item price
                        </Col>
                        <Col>
                            <Form.Control name='price' onChange={this.handleItemInput} style={{ color: 'black' }} placeholder={item.price_string} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col style={{margin: '4px 10px'}}>
                            <Button onClick={this.updateItem} variant="primary">Submit</Button>
                        </Col>
                    </Row>
                    <br />
                </Row>


            </div>
        )
    }
}
