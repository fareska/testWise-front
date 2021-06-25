import React, { Component } from 'react'
import Restaurant from './Restaurant';
import { InputGroup } from 'react-bootstrap';


export default class Restaurants extends Component {

    constructor() {
        super()
        this.state = {
            checkbox :false
        }
    }
   
    checkboxHandler = () => this.setState({checkbox : !this.state.checkbox})
    
    render() {
        let data = this.props.data

        return (
            <div style={{padding:'10px 0px', backgroundColor: 'rgb(64,76,92)', color: 'white'}} >
                 <div>
                    <InputGroup style={{padding: '0px 0px 0px 10px'}} className="mb-3">
                        <InputGroup.Checkbox  onClick={this.checkboxHandler} 
                        aria-label="Checkbox for following text input" />
                        Show all / only with menu
                    </InputGroup>
                </div>

                <div >
                    {this.state.checkbox 
                    ? data.map(r => r.menu_id === 1 && <Restaurant getMenuResId={this.props.getMenuResId} key={r.res_id}  resData={r} />) 
                    : data.map(r => <Restaurant getMenuResId={this.props.getMenuResId} key={r.res_id}  resData={r} />)}
                </div>
            </div>
        )
    }
}
