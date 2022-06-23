import { useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { Flights } from "../data/FlightList";

function FlightCard({ flight, handleClick, selectedFlightId }) {
  return (
    <Card
      outline={flight.FlightId === selectedFlightId ? true : null}
      color={flight.FlightId === selectedFlightId ? "primary" : null}
      onClick={() => {
        handleClick(flight.FlightId);
      }}
    >
      <CardBody>
        <CardTitle>{flight.Operator}</CardTitle>
        <CardSubtitle className="text-muted">
          {flight.From} to {flight.To}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

function FlightDetails(props) {
  const onwardFlights = props.onwardFlights;
  const returnFlights = props.returnFlights;
  const search = props.search;

  const [onwardFlight, setOnwardFlight] = useState(0);
  const [returnFlight, setReturnFlight] = useState(0);
  return (
    <div className="container">
      <div className="row">
        <div
          className={
            search.triptype === "oneway" ? "col-md-10" : "col-sm-5 mr-1"
          }
        >
          {/* onward flight list */}
          <h3>Onward</h3>
          {onwardFlights.map((flight) => (
            <FlightCard
              key={flight.FlightId}
              flight={flight}
              selectedFlightId={onwardFlight}
              handleClick={setOnwardFlight}
            />
          ))}
        </div>
        {search.triptype === "roundtrip" ? (
          <div className="col-sm-5 ml-1">
            <h3>Return</h3>
            {/* return flight list */}
            {returnFlights.map((flight) => (
              <FlightCard
                key={flight.FlightId}
                flight={flight}
                selectedFlightId={returnFlight}
                handleClick={setReturnFlight}
              />
            ))}
          </div>
        ) : null}
      </div>
      <button
        className="btn btn-primary m-1"
        onClick={() =>
          props.history.push({
            pathname: "/book",
            state: {
              onwardFlightId: onwardFlight,
              returnFlightId: returnFlight,
              search: search
            }
          })
        }
      >
        Book
      </button>
    </div>
  );
}

export default function FlightList(props) {
  let searchParams = props.location.state;
  let flightList = Flights; //Fetch call to get list of flights based on search params

  console.log(searchParams);

  if (searchParams !== undefined) {
    let onwardFlights = flightList.filter((flight) => {
      if (
        flight.From === searchParams.from.toUpperCase() &&
        flight.To === searchParams.to.toUpperCase()
      )
        return true;
      else return false;
    });

    let returnFlights = flightList.filter((flight) => {
      if (
        flight.From === searchParams.to.toUpperCase() &&
        flight.To === searchParams.from.toUpperCase()
      )
        return true;
      else return false;
    });

    return (
      <FlightDetails
        onwardFlights={onwardFlights}
        returnFlights={returnFlights}
        search={searchParams}
        {...props}
      />
    );
  } else {
    return <div>Invalid Search Params</div>;
  }
}