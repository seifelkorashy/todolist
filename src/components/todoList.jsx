import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Divider, ToggleButton, ToggleButtonGroup, TextField, Stack, Button } from "@mui/material";
import Todo from "./todo";
import { useEffect } from "react";


export default function TodoList() {
    const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);
    const[titleInput, setTitleInput] = React.useState("");
    const [alignment, setAlignment] = React.useState('all');
    // console.log(alignment)




    const handleAlignment = (event) => {
        setAlignment(event.target.value);
      };

        let allTodos = todos;

        if (alignment === "completed") {
            allTodos = todos.filter((t) => t.iscompleted === true);
        }else if (alignment === "noncompleted") {
            allTodos = todos.filter((t) => t.iscompleted === false);
        }else{
            allTodos = todos;
        }

    // event handlers
    function handleAddTask() {
        if (titleInput === "") {
            return alert("Please enter a task");
        }
        setTodos([
            ...todos,
            {
                id: Date.now(),
                title: titleInput,
                time: new Date().toLocaleString(),
                iscompleted: false,
            }
    
        ]);
        localStorage.setItem("todos", JSON.stringify(todos));
        setTitleInput("");
    }

    function handleCheckedTask(todoid) {
        let checkedTodo = todos.map((t) => {
            if (t.id == todoid) {
                if (t.iscompleted === false) {
                    return {...t, iscompleted: true, category: "completed"}
                } else {
                    return {...t, iscompleted: false , Category:"noncompleted"}
                }
            }
            return t;
            
        }
        )
        setTodos(checkedTodo);
    }

    const todosJsx = allTodos.map((t) => {
        return (
            <Todo key={t.id} todo={t} handleCheckedTask={handleCheckedTask} setTodos={setTodos} todos={todos}/>
        );
    });

    
        // ✅ حفظ المهام في LocalStorage عند كل تحديث
        useEffect(() => {
            localStorage.setItem("todos", JSON.stringify(todos));
        }, [todos]);

  return (
    <Container
    maxWidth="sm"
    style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        maxHeight: "550px",
        overflow: "auto",
      }}
    >

    <Typography variant="h2" color="initial" textAlign={"center"}>
        todo list
    </Typography>

    <Divider />

    <ToggleButtonGroup
        value={alignment}
        exclusive
        sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            flexDirection:{xs: "column", sm: "row"},
        }}
      onChange={handleAlignment}
    >
        <ToggleButton  value="all">
            all
        </ToggleButton>
        <ToggleButton value="completed">
            completed
        </ToggleButton>
        <ToggleButton value="noncompleted">
            noncompleted
        </ToggleButton>
    </ToggleButtonGroup>

    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" style={{marginTop: "20px"}}>
        <TextField
          id=""
          label="add new task"
          variant="standard" 
          sx={{width: "70%", padding: "5px"}}   
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        />
        <Button variant="contained" color="primary" sx={{width: "20%", padding: "5px"}} onClick={() => {handleAddTask()}}>
            Add
        </Button>
    </Stack>
        {todosJsx}
    </Container>
  );
}
