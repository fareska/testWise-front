import '../../styles/res.css';
import React, { Component } from 'react';
import Restaurant from './Restaurant';
import { InputGroup } from 'react-bootstrap';
import ApiManager from '../../ApiManager';
import { ChevronCompactRight, ChevronCompactLeft } from 'react-bootstrap-icons';
const apiManager = new ApiManager();

export default class Restaurants extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allRestaurants: [],
            hasMenu: false,
            page: 0,
            totalPages: 0,
            isAdmin: true
        }
    }

    componentDidMount = async () => this.getRestaurants();

    getRestaurants = async () => {
        const response = await apiManager.getRestaurants(this.state.page, this.state.hasMenu);
        const totalPages = Math.ceil((response[1][0]["COUNT (*)"])/3)
        this.setState({ allRestaurants: response[0], totalPages });
    }

    rightPage = () => {
        let page = this.state.page + 1;
        this.setState({ page }, () => this.getRestaurants());
    }
    leftPage = () => {
        if (this.state.page - 1 >= 0) {
            let page = this.state.page - 1;
            this.setState({ page }, () => this.getRestaurants());
        };
    }

    checkboxHandler = () => this.setState({ hasMenu: !this.state.hasMenu });

    render() {
        return (
            <div id="container" >
                <div >
                    <InputGroup style={{ padding: '0px 0px 0px 10px' }} className="mb-3">
                        <InputGroup.Checkbox onClick={this.checkboxHandler} aria-label="Checkbox for following text input" />
                        Show all / only with menu
                    </InputGroup>

                    <div id="pageContainer" >
                        <div className="pageButton" onClick={this.leftPage} ><ChevronCompactLeft /></div>
                        <div id="pageNumber" > {this.state.page} /{this.state.totalPages} </div>
                        <div className="pageButton" onClick={this.rightPage} ><ChevronCompactRight /></div>
                    </div>
                </div>

                <div >
                    {this.state.hasMenu
                        ? this.state.allRestaurants.map(r => r.menu_id === 1 && <Restaurant isAdmin={this.state.isAdmin} getMenuResId={this.props.getMenuResId} key={r.res_id} resData={r} />)
                        : this.state.allRestaurants.map(r => <Restaurant isAdmin={this.state.isAdmin} getMenuResId={this.props.getMenuResId} key={r.res_id} resData={r} />)}
                </div>
            </div>
        )
    }
}


    // getRestaurants = async () => {
    //     if (this.state.hasMenu === false) {
    //         const response = await axios.get(`http://localhost:3200/restaurants/${this.state.page}`)
    //         this.setState({ allRestaurants: response.data })
    //     } else {
    //         const response = await axios.get(`http://localhost:3200/restaurants/${this.state.page}/?hasMenu=true`)
    //         this.setState({ allRestaurants: response.data })

    //     }
    // }
