import React, { Component } from 'react'
import { ListItem, List, ListItemIcon, Toolbar, AppBar, ListItemText, Typography, IconButton, Avatar, ListItemSecondaryAction, Grid, TextField, Dialog, DialogActions, Button, DialogTitle, DialogContent } from '@material-ui/core';
import { Folder as FolderIcon, Menu as MenuIcon, CreateNewFolder, Edit, Delete, Assignment } from '@material-ui/icons';

import { connect } from 'react-redux'
import { addListing, deleteListing, renameListing } from '../redux/actionCreators'
import { withStyles } from '@material-ui/styles';
import OpenMenu from './openMenu';
import RenameDialog from './renameDialog'

class Listings extends React.Component {

  state = {
    openRenameDialog: false,
    wichOne: '',
    shownListings:{}
  }
  componentDidMount(){
    const { pathname } = this.props.history.location;
    console.log('mounted', pathname)
  }
  componentWillReceiveProps(nextProps){
    const {currentListings}=nextProps
    const { pathname } = this.props.history.location;
    const pathnames=pathname.split('/')
    console.log('pathName is ', pathname,pathnames)
    this.setState({ shownListings: currentListings})
  }
  handleListingClicked = (listingName) => {
    console.log('folder or file opened')
    this.props.history.push('/' + listingName)
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
    this.props.renameListing(name, newName)
  }
  onNewListing = (name, type) => {
    this.props.addListing(name, type)
  }
  render() {
    const { currentListings, classes } = this.props
    const {shownListings}=this.state
    return (
      <div>
        <AppBar position="static" >
          <Grid container className={classes.toolbar}>
            <Grid item>
              <Typography variant="h6">
                {currentListings.listingName}
              </Typography>
            </Grid>
            <Grid item>
              <OpenMenu onNewListing={this.onNewListing} />
            </Grid>
          </Grid>
        </AppBar>
        <List

        >
          {currentListings.subListings.map((name, index) => {
            return (
              <ListItem
                key={index}
                button
                onClick={() => this.handleListingClicked(name)}
              >
                <ListItemIcon>
                  {currentListings[name].type == "folder" ? (<FolderIcon />) : (<Assignment />)}
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
