import React from 'react'
import { TextField, Dialog, DialogActions, Button, DialogTitle, DialogContent } from '@material-ui/core';

export default function RenameDialog(props) {

    const [name, setName] = React.useState(props.wichOne)
    const [open, setOpen] = React.useState(props.openRenameDialog);


    React.useEffect(() => {
        setName(props.wichOne);
    }, [props.wichOne])
    // update state on prop change, make use of useEffect hook
    React.useEffect(() => {
        setOpen(props.openRenameDialog);
    }, [props.openRenameDialog])

    const handleNameChange = event => {
        setName(event.target.value);
    };
    function handleDialogClose() {
        setOpen(false);
    }
    function onRename() {
        if (name == "") {
            alert('please enter a name')
        }
        setOpen(false);

        props.onRenamed(props.wichOne, name)
    }
    return (
        <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">rename</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    onChange={handleNameChange}
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
                <Button onClick={onRename} color="primary">
                    rename
            </Button>
            </DialogActions>
        </Dialog>
    )
}
