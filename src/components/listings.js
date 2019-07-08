import React, { Component } from 'react'
import { ListItem, List, ListItemIcon, Toolbar, AppBar, ListItemText, Typography, IconButton, Avatar, ListItemSecondaryAction, Grid } from '@material-ui/core';
import { Folder as FolderIcon, Menu as MenuIcon, CreateNewFolder, Edit, Delete, Assignment } from '@material-ui/icons';

import { connect } from 'react-redux'


class Listings extends React.Component {

  handleListingClicked = (event, index) => {
    console.log('folder or file opened')
  }
  handleDelete = (index) => {
    console.log('deleted file')
  }
  handleEdit = (index) => {
    console.log('edit file')
  }
  render() {
    const { currentListings } = this.props
    console.log(currentListings)
    return (
      <div>
        <AppBar position="static" >
          <Grid container direction='row'>
            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {currentListings.folderName}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={(name) => this.handleEdit(name)}>
                <CreateNewFolder />
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>

        <List

        >
          {currentListings.names.map((name, index) => {
            return (
              <ListItem
                key={index}
                role={undefined} button
                onClick={event => this.handleListingClicked()}
              >
                <ListItemIcon>
                  {currentListings[name].type == "folder" ? (<FolderIcon />) : (<Assignment />)}


                </ListItemIcon>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <IconButton onClick={(name) => this.handleDelete(name)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={(name) => this.handleEdit(name)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>

              </ListItem>
            )
          })}
        </List>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currentListings: state.currentListings
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
