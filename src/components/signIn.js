import React from "react";
import { render } from "react-dom";
import { Input, Label, Button } from "reactstrap";

class SignIn extends React.Component {
  render() {
    return (
      <div className="container">
        <Label className="m-1" for="from">
          Kalkış:
        </Label>
        <Input
          type="text"
          id=""
          name=""
          value={this.state.from}
          onChange={this.handleChange}
          required
        />
        <Button className="m-1" type="submit">
          Giriş Yap
        </Button>
      </div>
    );
  }
}
export default SignIn;
