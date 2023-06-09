import Navbars from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Card";
import { Button, Container } from "react-bootstrap";


export default function IncomeTrip() {
  document.title = "IncomeTrip | DeweTour";
  return (
    <>
      <Navbars />
      <Container>
        <div className="d-flex my-5 justify-content-between">
          <h1 className="fw-bold">Income Trip</h1>
          <div>
            <Button
              href="/AddTrip"
              style={{
                backgroundColor: "#FFAF00",
                border: "none",
                padding: "10px 50px",
              }}
            >
              Add Trip
            </Button>
          </div>
        </div>
        <div className="mx-3">
          <Cards />
        </div>
      </Container>
      <Footer />
    </>
  );
}