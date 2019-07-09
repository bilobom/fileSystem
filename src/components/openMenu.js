import React from 'react';
import { Dialog, Menu, MenuItem, Button, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

export default function OpenMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [listingName, setListingName] = React.useState("")

    function handleMenuClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    function handleDialogClose() {
        setOpen(false);
    }
    function newFile() {
        setOpen(true);
        setTitle('new File')
    }
    function newFolder() {
        setOpen(true);
        setTitle('new Folder')
    }
    function onAddClicked() {
        if (listingName == "") {
            alert('please enter a name')
        }
        else {
            setOpen(false);
            props.onNewListing(listingName, title == "new Folder" ? "folder" : "file")
            handleMenuClose()
        }

    }
    function handleChange(event) {
        setListingName(event.target.value)
    }
    return (
        <div>
            <Button variant="contained" onClick={handleMenuClick}>
                New
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={newFolder}>new Folder</MenuItem>
                <MenuItem onClick={newFile}>new File</MenuItem>
            </Menu>
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>

                    <TextField
                        value={listingName}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onAddClicked} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}