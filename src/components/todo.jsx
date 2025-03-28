import { Delete, Done, Edit } from "@mui/icons-material";
import { Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

export default function Todo({  todo,handleCheckedTask ,setTodos , todos}) {
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editInput, setEditInput] = React.useState("");


    // dialog handlers
    const handleClickOpen = () => {
      setOpen(true);
    };

    function handleDissagree()  {
        setOpen(false);
    };
  
    const handleClose = (id) => {
        let deleletedTodo = todos.filter((t) => {
            if(t.id == id) {
                return false;
            }else{
                return true;
            }
        });
        setTodos(deleletedTodo);
        setOpen(false);
    };

    const handleEditClickOpen = () => {
        setEditOpen(true);
    }

    const handleEditClose = (id) => {
        if(editInput === "") {
            return alert("Please enter a task");
        }
        
        let editedTodo = todos.map((t) => {
            if(t.id == id) {
                return {...t, title: editInput, time: new Date().toLocaleString()};
            }else{
                return t;
            }
        });
        setTodos(editedTodo); 
        setEditInput("");
        setEditOpen(false);
    }

    function handleCancel() {
        setEditOpen(false);
    }
  return (
    <div>
    <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>
            {"are sure delete this task?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This will delete the task permanently
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDissagree}>cancel</Button>
          <Button onClick={() => {
            handleClose(todo.id);
          }
          }  autoFocus>
            confirm
          </Button>
        </DialogActions>
    </Dialog>


    <Dialog
        open={editOpen}
        onClose={handleEditClose}
      >

        <DialogTitle>edit task</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            required
            margin="dense"
            label="edit task"
            type="text"
            fullWidth
            variant="standard"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={() => {
            handleEditClose(todo.id);
          }
          }>confirm</Button>
        </DialogActions>
      </Dialog>
    <Card
        sx={{
          minWidth: 275,
          marginTop: 2,
          backgroundColor: "#f7f7f7",
          transition: ".3s",
          opacity: todo.iscompleted ? ".5" : "1",
        }}
        className="card"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" component="p" className="title" >
                {todo.title}
              </Typography>
              <Typography variant="body1" color="initial">{todo.time}</Typography>
            </Grid>
            <Grid
              size={4}
              display={"flex"}
              justifyContent={"space-around"}
              gap={2}
              alignItems={"center"}
              flexDirection={{xs:"column", sm: "row"}}
            >
              <IconButton
              className="done"
                sx={{ background:todo.iscompleted ? "green" : "#f7f7f7", color: todo.iscompleted? "white" : "green", border: "1px solid green" }}
                onClick={() => {
                  handleCheckedTask(todo.id);
                }
                }
              >
                <Done />
              </IconButton>
              <IconButton sx={{ color: "red", border: "1px solid red" }} onClick={handleClickOpen}>
                <Delete />
              </IconButton>
              <IconButton sx={{ color: "blue", border: "1px solid blue" , pointerEvents:todo.iscompleted ? "none" : "auto" }} onClick={handleEditClickOpen}>
                <Edit />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
    </Card>
    </div>
  );
}
