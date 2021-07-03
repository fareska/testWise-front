import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import SignIn from './Components/SignIn';
import Restaurants from './Components/Home/Restaurants';
import Menu from './Components/Details/Menu';
import Edit from './Components/Edit/Edit';
// import Error from './Components/Error';


class App extends Component {

  constructor() {
    super()
    this.state = {
      user: '',
      allRestaurants: [],
      menu: { items: [] },
      update: [],
      isAdmin: false
    }
  }

  getUser = (email) => this.setState({ user: email })

  dataToUpdate = async (object) => {
    let updateArr = [...this.state.update];
    updateArr.push(object);
    this.setState({ update: updateArr });
  }

  render() {

    return (
      <div >
        <Router>
          <Route path='/' exact render={() => <SignIn getUser={this.getUser} />} />
          <Route path='/restaurants/:page' exact render={({ match }) => <Restaurants match={match} />} />
          <Route path='/menu/:id' exact render={({ match }) => <Menu match={match} />} />
          <Route path='/edit/:id' exact render={({ match }) => <Edit update={this.dataToUpdate} match={match} isAdmin={this.state.isAdmin} menu={this.state.menu} />} />
        </Router>
      </div>
    );
  }
}

export default App;

  // {/* <Route path='/404' exact render={({ }) => <Error />} /> */}
  // {/* <Switch>
  // <Redirect to='/restaurants/0' render={({  }) => <Restaurants   />} />
  // </Switch> */}

  // getMenuResId = async (resId) => {
    // try {
    //   const response = await axios.get(`http://localhost:3200/menu/${resId}?isAdmin=true`)
    //   this.setState({ menu: response.data })
    // } catch (err) {
    //     console.log(err);
    //     console.log("HIII")
    //     return (
    //       <Redirect exact to='/404' render={() => <Error />}/>
    //     ) 
    // }

  //   const response = await axios.get(`http://localhost:3200/menu/${resId}?isAdmin=true`)
  //   if (response.status !== 200) {
  //     console.error(`Did not get an OK from the server. Code: ${response.statusCode}`);
  //     // response.resume();
  //     return;
  //   }else {
  //     this.setState({ menu: response.data })
  //   }
  // }
