import '../../styles/edit.css';
import React, { Component } from 'react';
import Select from './Select';
import SelectTextInput from './SelectTextInput';
import SelectNumInput from './SelectNumInput';
import Button from 'react-bootstrap/Button';
import ApiManager from '../../ApiManager';
const apiManager = new ApiManager();
const axios = require('axios');

export default class Edit extends Component {

    constructor() {
        super()
        this.state = {
            isAdmin: true,
            menu: {},
            selectOptions: [],
            selectValue: {},
            newValue: '',
            display: false,
            updateStatus: '',
            error: ''
        }
    }

    getEditMenu = async (resId, isAdmin) => {
        try {
            const response = await axios.get(`http://localhost:3200/menu/edit/${resId}/?isAdmin=${isAdmin}`);
            this.setState({ menu: response.data });
        } catch (error) {
            const res = error.response.data;
            this.setState({ error: res }, () => {
                console.log(this.state);
                debugger
            })
            return error
        }
    }

    componentDidMount = async () => {
        await this.getEditMenu(this.props.match.params.id, this.state.isAdmin);
        let selectOptions = this.generateSelectDropDown();
        this.setState({ selectOptions });
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
                <div id='nestedContainer'>
                    <Select selectVal={this.getSelectedVal} selectValue={this.state.selectValue} select={this.state.selectOptions} />
                    {this.state.display ? this.handleInputDisplay() : null}
                    {this.state.display
                        ? <Button onClick={this.updateData} variant="outline-secondary">Confirm Changes</Button>
                        : null}
                    {this.state.updateStatus !== '' && <div>{this.state.updateStatus}</div>}
                </div>
            </div>
        )
    }
}


    // getEditMenu = async (resId) => {
    //     try{
    //         const res = await apiManager.getEditMenu(resId, this.state.isAdmin);
    //         this.setState({ menu: res })
    //     } catch (err) {
    //         console.log('I got the catch',err);
    //     }
    // }