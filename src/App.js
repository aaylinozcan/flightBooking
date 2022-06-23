import { Route, Switch } from "react-router-dom";
import FlightList from "./components/flightDetails";
import Home from "./components/home";
import SignIn from "./components/signIn";
import BookingDetails from "./components/bookingDetails";
import "./styles.css";
import Payments from "./components/payment";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" exact component={Home} />
        <Route path="/flightdetails" component={FlightList} />
        <Route path="/book" component={BookingDetails} />
        <Route path="/payment" component={Payments} />
      </Switch>
    </div>
  );
}

export default App;