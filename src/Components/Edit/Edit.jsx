import '../../styles/edit.css';
import React, { Component } from 'react';
import { Redirect, Switch } from "react-router-dom";
import Select from './Select';
import SelectTextInput from './SelectTextInput';
import SelectNumInput from './SelectNumInput';
import Button from 'react-bootstrap/Button';
import ApiManager from '../../ApiManager';
import Error from '../Error';
const apiManager = new ApiManager();
const axios = require('axios');

export default class Edit extends Component {

    constructor() {
        super()
        this.state = {
            menu: {},
            selectOptions: [],
            selectValue: {},
            newValue: '',
            display: false,
            updateStatus: '',
            errMessage: ''
        }
    }

    componentDidMount = async () => {
        const res = await apiManager.getEditMenu(this.props.match.params.id, this.props.isAdmin);
        if (res === 'Unauthorized' || res === 'Not Found' || res === 'Forbidden') {
            this.setState({ errMessage: res });
            this.props.errHandler('Only admins allowed to update the menu');
        } else {
            this.setState({ menu: res });
            let selectOptions = this.generateSelectDropDown();
            this.setState({ selectOptions });
        };
    }

    getSelectedVal = (selectValue) => this.setState({ selectValue, display: true, newValue: '', updateStatus: '' });

    getNewVal = (newValue) => this.setState({ newValue: newValue });

    generateSelectDropDown = () => {
        let menu = this.state.menu;
        let selectArr = [];
        selectArr.push({ value: { table: 'menu', id: menu.menuId, col: 'menu_name' }, label: 'Menu name' });
        for (const item of menu.items) {
            let firstSelect = {
                value: { table: 'item', id: item.item_id, col: 'item_name' },
                label: `${item.item_name} dish name`
            };
            let secondSelect = {
                value: { table: 'item', id: item.item_id, col: 'price_string' },
                label: `${item.item_name} dish price`
            };
            selectArr.push(firstSelect);
            selectArr.push(secondSelect);
        }
        return selectArr;
    }

    handleInputDisplay = () => {
        if (this.state.selectValue.col === 'price_string') {
            return (<SelectNumInput getNewVal={this.getNewVal} newValue={this.state.newValue} />);
        }
        else { return (<SelectTextInput getNewVal={this.getNewVal} newValue={this.state.newValue} />); }
    }

    putData = async (data) => {
        let result = await axios.put('http://localhost:3200/menu', data);
        this.setState({ updateStatus: result.data });
    }

    updateData = async () => {
        if (this.state.newValue === '') {
            alert('enter value');
        } else {
            let data = { ...this.state.selectValue };
            data.newVal = this.state.selectValue.col === 'price_string'
                ? '$' + this.state.newValue
                : this.state.newValue;
            await this.putData(data);
        }
    }

    render() {
        return (
            <div id='editContainer'>
                {this.state.errMessage.length > 0
                    ? <Switch>
                        <Redirect to="/restaurants/0"  />
                    </Switch>
                    // ? <Error err={this.state.errMessage} />
                    : <div id='nestedContainer'>
                        <Select selectVal={this.getSelectedVal} selectValue={this.state.selectValue} select={this.state.selectOptions} />
                        {this.state.display ? this.handleInputDisplay() : null}
                        {this.state.display
                            ? <Button onClick={this.updateData} variant="outline-secondary">Confirm Changes</Button>
                            : null}
                        {this.state.updateStatus !== '' && <div>{this.state.updateStatus}</div>}
                    </div>
                }
            </div>
        )
    }
}