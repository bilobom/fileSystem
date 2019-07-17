import React, { Component } from 'react'
import { ListItem, List, ListItemIcon, Toolbar, AppBar, ListItemText, Typography, IconButton, Avatar, ListItemSecondaryAction, Grid, TextField, Dialog, DialogActions, Button, DialogTitle, DialogContent } from '@material-ui/core';
import { Folder as FolderIcon, Menu as MenuIcon, CreateNewFolder, Edit, Delete, Assignment } from '@material-ui/icons';

import { connect } from 'react-redux'
import { addListing, deleteListing, renameListing } from '../redux/actionCreators'
import { withStyles } from '@material-ui/styles';
import OpenMenu from './openMenu';
import RenameDialog from './renameDialog'


const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}
class Listings extends React.Component {

  state = {
    openRenameDialog: false,
    wichOne: '',
    shownListings: { names: [], listingName: '' },
    pathArray: ['0'],
  }
  componentDidMount() {
    this.updateListings(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.updateListings(nextProps)
  }
  updateListings = (nextProps) => {
    const { currentListings={} } = nextProps

    const { pathname } = this.props.history.location;

    let pathArray = pathname.split('/')
    
    // console.log('pathArray', pathArray)

    pathArray = pathArray.filter(el => el != "")
    const tobeshown = getNestedObject(currentListings, pathArray);
    console.log('TobeShown are ', tobeshown, "but currentListings is ", currentListings)
    this.setState({ shownListings: tobeshown, pathArray })
  }
  handleListingClicked = (listingName) => {
    if (this.state.shownListings[listingName].type == "folder")
      this.props.history.push('/' + listingName)
    else return
  }
  handleDelete = (name) => {
    console.log('delete', name)
    this.props.deleteListing(name)
  }
  handleEditClicked = (name) => {
    console.log('rename', name)
    this.setState({ openRenameDialog: true, wichOne: name })
  }
  onRenamed = (name, newName) => {
    this.props.renameListing(name, newName, this.state.pathArray)
  }
  onNewListing = (name, type) => {
    this.props.addListing(name, type, this.state.pathArray)
  }
  render() {
    const { currentListings, classes } = this.props
    const { shownListings } = this.state
    console.log("shownListings", shownListings)
    return (
      <div>
        <AppBar position="static" >
          <Grid container className={classes.toolbar}>
            <Grid item>
              <Typography variant="h6">
                {shownListings.listingName}
              </Typography>
            </Grid>
            <Grid item>
              <OpenMenu onNewListing={this.onNewListing} />
            </Grid>
          </Grid>
        </AppBar>
        <List

        >
          {shownListings.subListings && shownListings.subListings.map((name, index) => {
            return (
              <ListItem
                key={index}
                button
                onClick={() => this.handleListingClicked(name)}
              >
                <ListItemIcon>
                  {shownListings[name].type == "folder" ? (<FolderIcon />) : (<Assignment />)}
                </ListItemIcon>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.handleDelete(name)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => this.handleEditClicked(name)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
        <RenameDialog openRenameDialog={this.state.openRenameDialog} wichOne={this.state.wichOne} onRenamed={this.onRenamed} />
      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  currentListings: state.currentListings
})

const mapDispatchToProps = {
  addListing,
  deleteListing,
  renameListing
}
const styles = {
  toolbar: {
    justifyContent: 'space-between',
    padding: 15,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Listings))
