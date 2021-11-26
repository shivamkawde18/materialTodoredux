import logo from "./logo.svg";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import "./Style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  insertData,
  showData,
  removeData,
  completeTask,
  editTask,
} from "./redux/Action";

//import CommentIcon from '@material-ui/icons/Comment';

import { makeStyles } from "@material-ui/core/styles";
function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1100,
    },
    media: {
      height: 300,
    },
    rot: {
      width: "100%",
      maxWidth: 1000,
      // backgroundColor: theme.palette.background.paper,
    },
    margin: {
      margin: theme.spacing(-2),
    },
  }));

  const flagStyle = {
    width: "0",
    height: "0",
    borderTop: " 25px solid transparent",
    borderLeft: "57px solid green",
    borderBottom: "36px solid transparent",
  };

  const classes = useStyles();

  let [arrow, setArrow] = useState(false);
  let [detail, setDetail] = useState(false);
  let [snoFlag, setSnoFlag] = useState();
  let [removeDetail, setRemoveDetail] = useState();
  // let[againDetail,setAgainDeta]
  let arr = [];
  arr = useSelector((state) => state.instData);
  let dispatch = useDispatch();
  let a = (no) => {
    setSnoFlag(no);
  };

  return (
    <div className="App" className="cardDiv">
     
      <div>
        {arrow ? (
          <p
            className="arrowRight"
            onClick={() => {
              setArrow(false);
            }}
          >
            {" "}
            <i class="arrow down"></i>
          </p>
        ) : (
          <p
            onClick={() => {
              setArrow(true);
              dispatch(showData());
            }}
            className="arrowRight"
          >
            {" "}
            <i class="arrow right"></i> <span>See your All Task</span>
          </p>
        )}
      </div>

      {arrow ? (
        <>
          {arr.map((e) => {
            console.log("hiii");
            return (
              <>
                <Card style={{width:"18rem",height:"10rem"}}
                  className={`${classes.roo} ${
                    e.sno == snoFlag ? "" : "card"
                  } ${e.sno == removeDetail ? "card" : ""}`}
                >
                  <List className={classes.rot}>
                    <ListItem role={undefined} dense button>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={e.check}
                          tabIndex={-1}
                          disableRipple
                          onChange={() => {
                            console.log(e.sno);
                            dispatch(completeTask(e.sno));
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={e.content}
                        contentEditable={true}
                        onKeyUp={(ele) => {
                          console.log(ele.currentTarget.innerText);
                          dispatch(
                            editTask(e.sno, ele.currentTarget.innerText)
                          );
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => {
                            console.log(e);
                            localStorage.removeItem("");
                            dispatch(removeData(e.sno));
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {snoFlag == e.sno ? (
                      ""
                    ) : (
                      <Button
                        variant="contained"
                        onClick={(ele) => {
                          console.log(e);
                          console.log(snoFlag);
                          a(e.sno);
                          if (detail && snoFlag == e.sno) setDetail(false);
                          if (snoFlag == e.sno) setDetail(true);

                          
                        }}
                      >
                        Details
                      </Button>
                    )}
                  </List>
                  <div
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: " 25px solid transparent",
                      borderLeft: `32px solid ${e.color}`,
                      borderBottom: "36px solid transparent",
                    }}
                  ></div>
                  <div className="bottomDiv">
                    <p>{e.time}</p>
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setRemoveDetail(e.sno);
                     
                    }}
                  >
                    X
                  </Button>
                  
                  </div>
                 
                </Card>
              </>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
