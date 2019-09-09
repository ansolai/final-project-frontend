import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homer from "../components/home/Home";
import { NotLoggedNavbar } from '../components/navbar/NotLoggedNavbar'
import About from "../components/home/About";
import Calculators from '../components/calculators/Calculators'


class NotLoggedRouter extends Component {
    render() {
        return (
          <Router>
            <NotLoggedNavbar />
            <>
              <Switch>
                <Route exact path="/about" component={About} />
                <Route exact path="/calculators" component={Calculators} />
                <Route path="/" component={Homer} />
              </Switch>
            </>
          </Router>
        );
    }
}
export default NotLoggedRouter;