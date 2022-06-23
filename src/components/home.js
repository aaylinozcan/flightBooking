import React from "react";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triptype: "oneway",
      from: "",
      to: "",
      onward: "",
      return: "",
      travellercount: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/flightdetails",
      state: this.state
    });
  }

  handleChange(e) {
    //console.log("Handling change for : ", e.target.name, e.target.value);
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-10">
          <h3>Seyahat Serüveni Başlasın</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="triptype"
                    value="oneway"
                    onChange={this.handleChange}
                    checked={this.state.triptype === "oneway"}
                  />{" "}
                  Tek Yön
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="triptype"
                    value="roundtrip"
                    onChange={this.handleChange}
                    checked={this.state.triptype === "roundtrip"}
                  />
                  Gidiş-Dönüş
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label className="m-1" for="from">
                Kalkış:
              </Label>
              <Input
                type="text"
                id="from"
                name="from"
                value={this.state.from}
                onChange={this.handleChange}
                required
                list="cities"
              />
              <datalist id="cities">
                <option value="SFO" />
                <option value="BLR" />
                <option value="IST" />
                <option value="DEL" />
                <option value="PNQ" />
                <option value="ESN" />
                <option value="SAW" />
              </datalist>
            </FormGroup>

            <FormGroup>
              <Label className="m-1" for="to">
                Varış:
              </Label>
              <Input
                type="text"
                id="to"
                name="to"
                value={this.state.to}
                onChange={this.handleChange}
                required
                list="cities"
              />
              <datalist id="cities">
                <option value="SFO" />
                <option value="BLR" />
              </datalist>
            </FormGroup>

            <FormGroup className="col-md-4 mr-1">
              <Label className="m-1" for="onward">
                Kalkış:
              </Label>
              <Input
                type="date"
                id="onward"
                name="onward"
                value={this.state.onward}
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup className="col-md-4 mr-1">
              <Label className="m-1" for="return">
                Dönüş:
              </Label>
              <Input
                type="date"
                id="return"
                name="return"
                value={this.state.return}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup className="col-md-4 mr-1">
              <Label className="m-1" for="travellercount">
                Yolcu Sayısı:
              </Label>
              <Input
                type="number"
                id="traverllercount"
                max={12}
                min={1}
                name="travellercount"
                value={this.state.travellercount}
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button className="m-1" type="submit">
              Uçuş Ara
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Home;
