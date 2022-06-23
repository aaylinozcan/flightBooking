import React from "react";
import { Form, Input, Label, Button } from "reactstrap";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sifre: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/home",
      state: this.state,
    });
  }

  handleChange(e) {
    //console.log("Handling change for : ", e.target.name, e.target.value);
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="app">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Label className="label-signIn">Giriş Yapınız.</Label>
          <Label className="m-1" for="from"></Label>
          <Input
            type="signInText"
            email=""
            value={this.state.from}
            onChange={this.handleChange}
            placeholder="E-mail"
            required
          />
          <Input
            className="signIn-password"
            type="password"
            sifre=""
            value={this.state.from}
            onChange={this.handleChange}
            placeholder="Şifre"
            required
          />
          <Button className="btnSignIn">Giriş Yap</Button>
        </Form>
      </div>
    );
  }
}
export default SignIn;