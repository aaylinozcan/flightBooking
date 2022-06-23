import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Flights } from "../data/FlightList";

function SelectSeat(props) {
  const [modal, setModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(-1);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button onClick={toggle} className="btn-book">
        Koltuk Seçimi
      </Button>
      
      <Modal isOpen={modal} toggle={toggle}  >
        <ModalHeader  toggle={toggle} >Koltuk Seçimi</ModalHeader>
        <ModalBody>
          <ul>
            {props.seats
              .filter((seat) => seat.Status !== "Blocked")
              .map((seat) => (
                <li
                  style={
                    seat.SeatId === selectedSeat
                      ? { background: "aliceblue" }
                      : null
                  }
                  key={seat.SeatId}
                  onClick={() => setSelectedSeat(seat.SeatId)}
                >
                  Seat {seat.SeatId}
                </li>
              ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.seatSelectHandler(props.passengerNumber, selectedSeat);
              toggle();
            }}
          >
            Ok
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function PassengerCard(props) {
  return (
    <div className="row">
      <div className="adult-book" >
        <p>Adult {props.passengerNumber + 1} </p>
      </div>
      <div className="text-book">
        <Label for="firstname">İsim:</Label>
        <Input type="text" id="firstname" />
      </div>
      <div className="text-book">
        <Label for="lastname">Soyisim:</Label>
        <Input type="text" id="lastname" />
      </div>
      <div className="text-book">
        <Label for="tcno">E-mail:</Label>
        <Input type="text" id="lastname" />
      </div>

      <div className="col-sm-2 align-center">
        <SelectSeat
          seats={props.onwardSeats}
          seatSelectHandler={props.onwardSeatHandler}
          passengerNumber={props.passengerNumber}
          type=""
        />
        <p>{props.passengerOnSeats[props.passengerNumber]}</p>
      </div>
      {props.triptype === "roundtrip" ? (
        <div className="col-sm-2 align-center">
          <SelectSeat
            seats={props.returnSeats}
            seatSelectHandler={props.returnSeatHandler}
            passengerNumber={props.passengerNumber}
            type="Return"
          />
          <p>{props.passengerRetSeats[props.passengerNumber]}</p>
        </div>
      ) : null}
    </div>
  );
}

function BookingDetails(props) {
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  let locState = props.location.state;
  let searchParams = locState ? props.location.state.search : undefined;
  let passengers = [];
  //store flights in Redux store??

  let onwardFlight = Flights.filter(
    (flight) => flight.FlightId === locState.onwardFlightId
  )[0];
  let returnFlight = Flights.filter(
    (flight) => flight.FlightId === locState.returnFlightId
  )[0];

  const [onwardSeats, setOnwardSeats] = useState(
    onwardFlight ? onwardFlight.Seats : []
  );
  const [returnSeats, setReturnSeats] = useState(
    returnFlight ? returnFlight.Seats : []
  );
  const [pos, setPOS] = useState([]);
  const [prs, setPRS] = useState([]);

  let blockOnwardSeat = (passengerId, seatId) => {
    let newSeats = [...onwardSeats];
    //reset already blocked seat by passenger
    if (passengeroOnwardSeats[passengerId] !== -1) {
      let blockedSeatId = onwardSeats.findIndex(
        (seat) => seat.SeatId === passengeroOnwardSeats[passengerId]
      );
      newSeats[blockedSeatId] = {
        ...newSeats[blockedSeatId],
        Status: "Available",
      };
    }

    passengeroOnwardSeats[passengerId] = seatId;
    setPOS(passengeroOnwardSeats);
    let seatIndex = onwardSeats.findIndex((seat) => seat.SeatId === seatId);
    if (seatIndex !== -1) {
      newSeats[seatIndex] = { ...newSeats[seatIndex], Status: "Blocked" };
      setOnwardSeats(newSeats);
    }
  };

  let blockReturnSeat = (passengerId, seatId) => {
    let newSeats = [...returnSeats];
    //reset already blocked seat by passenger
    if (passengerReturnSeats[passengerId] !== -1) {
      let blockedSeatId = returnSeats.findIndex(
        (seat) => seat.SeatId === passengerReturnSeats[passengerId]
      );
      newSeats[blockedSeatId] = {
        ...newSeats[blockedSeatId],
        Status: "Available",
      };
    }

    passengerReturnSeats[passengerId] = seatId;
    setPRS(passengerReturnSeats);
    let seatIndex = returnSeats.findIndex((seat) => seat.SeatId === seatId);
    if (seatIndex !== -1) {
      newSeats[seatIndex] = { ...newSeats[seatIndex], Status: "Blocked" };
      setReturnSeats(newSeats);
    }
  };

  let passengeroOnwardSeats = [...pos];
  let passengerReturnSeats = [...prs];
  if (passengeroOnwardSeats.length === 0) {
    for (let i = 0; i < searchParams.travellercount; i++) {
      passengeroOnwardSeats.push(-1); //reset selected seats for all passengers
    }
  }
  if (passengerReturnSeats.length === 0) {
    passengerReturnSeats.push(-1);
  }

  for (let i = 0; i < searchParams.travellercount; i++) {
    passengers.push(
      <PassengerCard
        key={i}
        passengerNumber={i}
        onwardSeats={onwardSeats}
        onwardSeatHandler={blockOnwardSeat}
        returnSeats={returnSeats}
        returnSeatHandler={blockReturnSeat}
        passengerOnSeats={pos}
        passengerRetSeats={prs}
        triptype={searchParams.triptype}
      />
    );
  }

  const paymentBtnClick = (e) => {
    e.preventDefault();
    alert("Proceeding to payment");
    props.history.push({
      pathname: "/payment",
      state: {},
    });
  };
  return (
    <>
      <Modal isOpen={modal2}>
        <ModalHeader toggle={toggle2}></ModalHeader>
        <ModalBody>Biletiniz Alınmıştır. İyi Uçuşlar.</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              toggle2, (window.location.href = "http://localhost:3000/home");
            }}
          >
            Go To Home
          </Button>
        </ModalFooter>
      </Modal>
      <div className="container">
        <h3 className="book-header">Traveller Information</h3>
        {passengers}
        <button className="payment-book" onClick={toggle2}>
          Proceed to Payment
        </button>
      </div>
    </>
  );
}

export default BookingDetails;