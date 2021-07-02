import React, { Component } from 'react';
import { ListGroupItem, Container, Row, Col } from 'react-bootstrap';

export default class MenuItem extends Component {
    render() {
        let item = this.props.item;
        return (
            <div>
                <ListGroupItem style={{ margin: '5px 0px', backgroundColor: 'rgb(216,218,195)', WebkitBoxShadow: 'inset 0 0 10px #000000' }}>
                    <Container  >
                        <Row >
                            <Col style={{ backgroundColor: 'rgb(216,218,195)' }}>{item.item_name}</Col>
                            <Col style={{ backgroundColor: 'rgb(216,218,195)' }}>{item.price_string}</Col>
                        </Row>
                    </Container>
                </ListGroupItem>
            </div>
        )
    }
}
