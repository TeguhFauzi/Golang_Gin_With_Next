import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ModalForm from "../components/ModalForm";
import Navbars from "../components/Navbar";
import { API } from "../config/api";

const Detail = ({ setDataTrans }) => {
  document.title = "Detail | DeweTour";
  let navigate = useNavigate();
  let { id } = useParams();
  const [count, setCount] = useState(1);

  const [showForm, setShowForm] = useState(false);

  let { data: tour } = useQuery("tripCache", async () => {
    const response = await API.get(`/trip/${id}`, tour);
    console.log(response, "ini respon");
    return response.data.data;
  });
  console.log(tour, "title");

  const handleClose = () => {
    setShowForm(false);
  };

  const handleShowForm = () => {
    handleClose(true);
    setShowForm(true);
  };

  const Add = () => {
    if (count === 10) return;
    setCount(count + 1);
  };

  const Less = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    setDataTrans({
      qty: count,
      pay: tour?.price * count,
    });
  }, [count]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <Navbars />
      <div style={{ margin: "50px 130px" }}>
        <h1 className="fw-bold m-0">{tour?.title}</h1>
        <h4
          style={{
            color: "#A8A8A8",
            fontWeight: "bold",
            fontSize: "18px",
            fontStyle: "italic",
          }}
        >
          {tour?.country?.name}
        </h4>
        <div >
          <img src={tour?.image} alt="#"style={{width:"1100px"}} height="450px" className="shadow mb-3 mt-3" />
        </div>
        <h4 className="fw-bold my-3">Information Trip</h4>
        <div className="d-flex justify-content-between">
          <div>
            <p style={{ color: "#A8A8A8" }}>Accommodation</p>
            <div className="d-flex gap-3">
              <img src="/images/hotel.svg" alt="" width="25px" height="25px" />
              <h5 className="fw-bold">{tour?.accomodation}</h5>
            </div>
          </div>
          <div>
            <p style={{ color: "#A8A8A8" }}>Transportation</p>
            <div className="d-flex gap-3">
              <img src="/images/plane.svg" alt="" width="25px" height="25px" />
              <h5 className="fw-bold">{tour?.transportation}</h5>
            </div>
          </div>
          <div>
            <p style={{ color: "#A8A8A8" }}>Eat</p>
            <div className="d-flex gap-3">
              <img src="/images/meal.svg" alt="" width="25px" height="25px" />
              <h5 className="fw-bold">{tour?.eat}</h5>
            </div>
          </div>
          <div>
            <p style={{ color: "#A8A8A8" }}>Duration</p>
            <div className="d-flex gap-3">
              <img src="/images/time.svg" alt="" width="25px" height="25px" />
              <h5 className="fw-bold">
                {tour?.day} Day {tour?.day} Night
              </h5>
            </div>
          </div>
          <div>
            <p style={{ color: "#A8A8A8" }}>Date Trip</p>
            <div className="d-flex gap-3">
              <img
                src="/images/calendar.svg"
                alt=""
                width="25px"
                height="25px"
              />
              <h5 className="fw-bold">{tour?.date_trip}</h5>
            </div>
          </div>
        </div>
        <h4 className="fw-bold mt-5">Description</h4>
        <p style={{ color: "#A8A8A8" }}>{tour?.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop:"50px"}}>
          <div className="d-flex gap-2">
            <h2 style={{ color: "#FFAF00", fontWeight: "bold" }}>
              {rupiah(tour?.price)}
            </h2>
            <h2 className="fw-bold"> / Person</h2>
          </div>
          <div>
            <img
              src="/images/Minus.png"
              alt=""
              width="40px"
              onClick={() => {
                Less();
              }}
              style={{ cursor: "pointer" }}
            />
            <span className="mx-3 fw-bolder fs-5">{count}</span>
            <img
              src="/images/Plus.png"
              alt=""
              width="40px"
              onClick={() => {
                Add();
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between my-4 mb-5">
          <h2 className="fw-bold">Total :</h2>
          <h2 style={{ color: "#FFAF00", fontWeight: "bold" }}>
            {rupiah(count * tour?.price)}
          </h2>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleShowForm}
            style={{
              backgroundColor: "#FFAF00",
              fontWeight: "bolder",
              border: "none",
              padding: "10px 40px",
            }}
          >
            Forn Tiket
          </Button>
          <Link to={`/payment/${id}`}>
            <Button
              // onClick={handleShowForm}
              style={{
                backgroundColor: "#FFAF00",
                fontWeight: "bold",
                border: "none",
                padding: "10px 40px",
                marginLeft: "30px",
              }}
            >
              BOOK NOW
            </Button>
          </Link>
        </div>
      </div>
      <ModalForm show={showForm} onHide={handleClose} />
      <Footer />
    </>
  );
};

export default Detail;
