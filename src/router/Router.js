import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {Router, Route, Link, Switch} from 'react-router-dom';
import history from './history'

import { NavBar } from "../components/navbar/Navbar";
import Homer from "../components/home/Home";
import Map2 from "../components/map/MapClass";
import Plans from "../components/plans/Plan";
import SinglePlan from "../components/plans/singleplan/SinglePlan";
import Maptest from "../components/map/Maptest";
import Content from "../components/content/Content";
import EditPreviousPlan2 from "../components/plans/EditPreviousPlan2";
import AddReferencePictures from "../components/plans/AddReferencePictures";
import About from "../components/home/About";
import Calculators from "../components/calculators/Calculators";

class Router1 extends Component {
  render() {
    return (
      //       <Provider store={store}>
      <Router history={history}>
        <NavBar />
        <>
          <Switch>
            <Route exact path="/plan" component={Plans} />
            <Route exact path="/map" component={Maptest} />
            <Route exact path="/plans/:id" component={SinglePlan} />
            <Route path="/feed" component={Content} />
            <Route exact path="/about" component={About} />
            <Route exact path="/plans/:id/edit" component={EditPreviousPlan2} />
            <Route
              exact
              path="/plans/:id/addpictures"
              component={AddReferencePictures}
            />
            <Route exact path="/calculators" component={Calculators} />
            <Route path="/" component={Homer} />
          </Switch>
        </>
      </Router>
      //       </Provider>
    );
  }
}
export default Router1;
