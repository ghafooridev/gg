import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";

import io from "socket.io-client";

import TextField from "../../../components/sharedComponents/TextField";
import Button from "../../../components/sharedComponents/Button";
import Card from "../../../components/sharedComponents/Card";
import InfoBox from "../../../components/sharedComponents/InfoBox";
import ChatBox from "../../../components/sharedComponents/ChatBox";
import Constant from "../../../utils/Constant";
import chatRepository from "../../../repositories/chat";
import { socketURL } from "../../../utils/helpers";
import { getUserNameFromLocalStorage } from "../../../utils/helpers";
import { styles } from "../Pictionary.Style";
import { useStateIfMounted } from "use-state-if-mounted";

const ENDPOINT = socketURL();
let socket;

const PictionaryLobby = function (props) {
  const history = useHistory();
  const { room } = props.match.params;
  const username = getUserNameFromLocalStorage(history);
  const classes = styles();

  const [messages, setMessages] = useStateIfMounted([]);
  const [fetchMessages, setFetchMessages] = useStateIfMounted([]);
  const [users, setUsers] = useStateIfMounted([]);
  const [timer, setTimer] = useStateIfMounted(10);

  const onPlayClick = function () {
    history.push({
      pathname: `/pictionary-game/125`,
    });
    socket.emit("enterGame.lobby", { username, room });
  };

  const onSendClick = function (message) {
    socket.emit("chat.lobby", { username, message }, () => {});
  };

  const onLeaveClick = function () {
    socket.emit("leave.lobby", { username, room });
    socket.off();
    history.push("/home");
  };

  const getHeight = function () {
    return window.innerHeight - 650;
  };

  const enterGame = function () {
    socket.on("enterGame.lobby", (message) => {
      setMessages(message);
      setTimeout(() => {
        history.push({
          pathname: `/pictionary-game/125`,
        });
      }, 2000);
    });
  };

  const addTimer = () => {
    let number = 10;
    const counter = setInterval(() => {
      number -= 1;
      setTimer(number);
      if (number === 0) {
        clearInterval(counter);
      }
    }, 1000);
  };

  useEffect(() => {
    socket = io();
    socket.emit("join.lobby", { username, room });

    chatRepository.getChatByGame(room).then((chats) => {
      setFetchMessages(chats);
    });
  }, [room, username]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages(message);
    });

    enterGame();
  }, [messages]);

  useEffect(() => {
    socket.on("users.lobby", (users) => {
      setUsers(users);
      if (users.length === Constant.GAMES_CONDITIONS.PICTIONARY_USER) {
        socket.emit("startGameTimer.lobby", { room });
        addTimer();
      }
    });

    socket.on("startGameTimerUp.lobby", (randomUser) => {
      if (randomUser === username) {
        onPlayClick();
      }
    });

    return () => {
      socket.off("users.lobby");
      socket.off("startGameTimer.lobby");
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.topPanel}>
        <Card className={classes.jumbotron}>
          <Typography variant="h3">
            {users.length < Constant.GAMES_CONDITIONS.PICTIONARY_USER
              ? "waiting for other players"
              : "Ready for playing"}
          </Typography>
          {users.length === Constant.GAMES_CONDITIONS.PICTIONARY_USER && (
            <Typography variant="body2">
              Starting game in {timer} second or click on play Button
            </Typography>
          )}
        </Card>
      </Grid>
      <Button
        label="play"
        className={classes.playButton}
        onClick={onPlayClick}
        disabled={users.length < Constant.GAMES_CONDITIONS.PICTIONARY_USER}
      />
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item xs={12} className={classes.leftCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              PICTIONARY RULES
            </Typography>
            <Typography variant="body1">
              Lorem ipsu dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittus, sapien dui mattis dui, non
              pulvinar lorem felis nec erat Lorem ipsu dolor sit amet,
              consectetur adipiscing elit. Nunc maximus, nulla ut commodo
              sagittus, sapien dui mattis dui, non pulvinar lorem felis nec erat
              Lorem ipsu dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittus, sapien dui mattis dui, non
              pulvinar lorem felis nec erat Lorem ipsu dolor sit amet,
              consectetur adipiscing elit. Nunc maximus, nulla ut commodo
              sagittus, sapien dui mattis dui, non pulvinar lorem felis nec
              erat.
            </Typography>
          </Card>
          <Card className={classes.itemCard}>
            <Typography>AD</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.middleCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              IN QUEUE ({users.length}/
              {Constant.GAMES_CONDITIONS.PICTIONARY_USER})
            </Typography>
            {users.map((item, index) => {
              return (
                <InfoBox
                  key={index}
                  title={item.username}
                  subTitle={item.university}
                  background={item.background}
                />
              );
            })}
            <Button label="leave queue" onClick={onLeaveClick} />
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.rightCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              TODAY’S ICEBREAKER
            </Typography>
            <TextField
              rows={2}
              label="What is your favorite cuisine?"
              style={{ marginBottom: 10 }}
            />
            <Button label="submit" />
          </Card>
          <ChatBox
            title="Chat"
            messages={messages}
            fetchMessages={fetchMessages}
            username={username}
            onSendClick={onSendClick}
            height={getHeight()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PictionaryLobby;
