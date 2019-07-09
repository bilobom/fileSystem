import React from 'react';
import { connect } from 'react-redux';
import Listings from './components/listings'
import { Route, Switch, withRouter } from "react-router-dom";


class App extends React.Component {


  render() {

    return (
      <Route path="/:folderName" component={Listings} />
    );
  }
}
const mapStateToProps = state => ({
  currentListings: state.currentListings
})
export default connect(mapStateToProps, {})(withRouter(Listings))

