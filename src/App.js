import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Restaurants from './Components/Home/Restaurants';
import Menu from './Components/Details/Menu';
import Edit from './Components/Edit/Edit';

class App extends Component {

  constructor() {
    super()
    this.state = {
      user: '',
      allRestaurants: [],
      menu: { items: [] },
      update: [],
      errMessage: '',
      isAdmin: false
    }
  }

  dataToUpdate = async (object) => {
    let updateArr = [...this.state.update];
    updateArr.push(object);
    this.setState({ update: updateArr });
  }

  errHandler = (errMessage) => this.setState({ errMessage });

  render() {

    return (
      <div >
        <Router>
          <Switch>
            <Route path='/restaurants/:page' exact render={({ match }) => <Restaurants errMessage={this.state.errMessage} match={match} />} />
            <Route path='/menu/:id' exact render={({ match }) => <Menu match={match} />} />
            <Route path='/edit/:id' exact render={({ match }) => <Edit errHandler={this.errHandler} update={this.dataToUpdate} match={match} isAdmin={this.state.isAdmin} menu={this.state.menu} />} />
            <Redirect to='/restaurants/0' render={({ match }) => <Restaurants errMessage={this.state.errMessage} match={match} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;