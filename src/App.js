import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignIn from './Components/SignIn'
import Restaurants from './Components/Restaurants'
import Menu from './Components/Menu';
import EditMenu from './Components/EditMenu';

const axios = require('axios')

class App extends Component {

  constructor() {
    super()
    this.state = {
      user: '',
      allRestaurants: [],
      menu: {},
      update: [],
    }
  }

  componentDidMount = async () => this.getRestaurants()
  

  getUser = (email) => this.setState({user: email})
  

  getRestaurants = async () => {
    const response = await axios.get("http://localhost:3200/restaurants")
    this.setState({ allRestaurants: response.data })
  }

  getMenuResId = async (resId) => {
    const response = await axios.get(`http://localhost:3200/menu/${resId}`)
    this.setState({ menu: response.data })
  }

  dataToUpdate = async (object) => {
    let updateArr = [...this.state.update]
    updateArr.push(object)
    this.setState({update: updateArr})
  }


  render() {

    return (
      <div >
        <Router>
          <Route exact path='/' render={() => <SignIn getUser={this.getUser} />} />
          <Route path='/restaurants' exact render={() => <Restaurants data={this.state.allRestaurants} getMenuResId={this.getMenuResId} />} />
          <Route exact path='/menu/:id' render={({ match }) => <Menu user={this.state.user} manager={this.state.allRestaurants.find(r => r.res_id == match.params.id)} match={match} getMenuResId={this.getMenuResId} menu={this.state.menu} />} />
          <Route exact path='/edit' render={() => <EditMenu update={this.dataToUpdate} menu={this.state.menu} />} />
        </Router>
      </div>
    );
  }
}

export default App;
