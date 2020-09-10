import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Jumbotron,
  Spinner,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import firebase from "../Firebase";

function Login() {
  const history = useHistory();
  const [creds, setCreds] = useState({ nickname: "" });
  const [showLoading, setShowloading] = useState(false);
  const ref = firebase.database().ref("users/");
  const onChange = (e) => {
    e.persist();
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    setShowloading(true);
    ref
      .orderByChild("nickname")
      .equalTo(creds.nickname)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem("nickname", creds.nickname);
          history.push("/roomlist");
          setShowloading(false);
        } else {
          const newUser = firebase.database().ref("users/").push();
          newUser.set(creds);
          localStorage.setItem("nickname", creds.nickname);
          history.push("/roomlist");
          setShowloading(false);
        }
      });
  };
  return (
    <div>
      {showLoading && <Spinner color="primary" />}
      <Jumbotron>
        <Form onSubmit={login}>
          <FormGroup>
            <Label>Nickname</Label>
            <Input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="Enter your Nickname"
              values={creds.nickname}
              onChange={onChange}
            />
          </FormGroup>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default Login;
