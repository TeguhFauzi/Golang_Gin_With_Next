import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

const Payment = ({ dataTrans }) => {
  const { id } = useParams();
  // const params = useParams();
  // const ids = parseInt(params.ids);
  const forms = JSON.parse(localStorage.getItem("forms"));
  const form = forms[0];
  console.log(form, "iniii form");
  // const user = form[id];

  const { data: trip } = useQuery("tripCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });

  const [state, _] = useContext(UserContext);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleTransaction = useMutation(async (e) => {
    try {
      // e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Navigate("/Profile");

      let data = {
        counterqty: dataTrans?.qty,
        total: dataTrans?.pay,
        status: "success",
        tripid: trip?.id,
      };

      const response = await API.post("/transaction", data, config);
      alert("transaksi sukses");

      console.log(response, "resssspooonnn");
    } catch (err) {
      alert("transaksi gagal");
    }
  });

  // const handleNav = () => {
  //   // handleTransaction.mutate()
  //   Navigate("/Profile");
  // };

  const mySwal = withReactContent(Swal);
  const submit = () => {
    mySwal.fire({
      position: "Center",
      icon: "success",
      title: (
        <p>
          Your payment will be confirmed within 1 x 24 hours To see orders click
          <span
            onClick={() => Navigate("/Profile")}
            className="fw-bold"
            style={{ cursor: "pointer" }}
          >
            Here
          </span>
          thank you
        </p>
      ),
      showConfirmButton: false,
    });
  };
  return (
    <>
      <Navbar />
      <Container>
        <div
          style={{
            boxShadow: "2px 2px 20px grey",
            padding: "50px",
            borderRadius: "10px",
            marginTop: "50px",
          }}
        >
          <div className="d-flex justify-content-between mb-4">
            <img src="/images/icon.png" alt="" />
            <div className="text-end">
              <h1 className="fw-bold ">Booking</h1>
              <h4>{new Date().toDateString()}</h4>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-5">
              <div className="me-5">
                <h3 className="fw-bold">{trip?.title}</h3>
                <p
                  style={{
                    color: "#959595",
                    fontWeight: "bold",
                    marginBottom: "30px",
                  }}
                >
                  {trip?.country?.name}
                </p>
                <span
                  style={{
                    color: "#3CF71E",
                    backgroundColor: "#E9FDEB",
                    fontWeight: "bold",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  Approve
                </span>
              </div>
              <div className="d-flex">
                <div className="mx-5">
                  <div>
                    <h5 className="fw-bold">Date trip</h5>
                    <p style={{ color: "#959595", fontWeight: "bold" }}>
                      {trip?.date_trip}
                    </p>
                  </div>
                  <div>
                    <h5 className="fw-bold">Accomodation</h5>
                    <p style={{ color: "#959595", fontWeight: "bold" }}>
                      {trip?.accomodation}
                    </p>
                  </div>
                </div>
                <div className="mx-5">
                  <div>
                    <h5 className="fw-bold">Duration</h5>
                    <p style={{ color: "#959595", fontWeight: "bold" }}>
                      {trip?.day} Day {trip?.night} Night
                    </p>
                  </div>
                  <div>
                    <h5 className="fw-bold">Transportation</h5>
                    <p style={{ color: "#959595", fontWeight: "bold" }}>
                      {trip?.transportation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center me-5">
              <img src="/images/barcode.svg" alt="#" />
              <h4>TCK0101</h4>
            </div>
          </div>
          <div
            className="me-5"
            style={{
              display: "flex",
              textAlign: "justify",
              fontWeight: "bolder",
            }}
          >
            <tr>
              <th style={{ marginRight: "70px" }}>No</th>
              <th style={{ marginRight: "100px" }}>FullName</th>
              <th style={{ marginRight: "70px" }}>Gender</th>
              <th style={{ marginRight: "100px" }}>Phone</th>
            </tr>
          </div>
          <div style={{ marginTop: "0", marginBottom: "0" }}>
            <hr style={{ borderTop: "2px solid black" }} />
          </div>
          <div style={{ display: "flex" }}>
            <tr>
              <td>1</td>
              <td style={{ marginLeft: "90px", color: "#959595" }}>
                {form?.fullname}
              </td>
              <td style={{ marginLeft: "155px", color: "#959595" }}>
                {form?.gender}
              </td>
              <td style={{ marginLeft: "110px", color: "#959595" }}>
                {form?.phone}
              </td>
              <td style={{ marginLeft: "150px", fontWeight: "bold" }}>Qty</td>
              <td style={{ marginLeft: "70px", fontWeight: "bold" }}>:</td>
              <td style={{ marginLeft: "28px", fontWeight: "bold" }}>
                {dataTrans?.qty}
              </td>
            </tr>
          </div>
          <div style={{ marginTop: "0", marginBottom: "0" }}>
            <hr style={{ borderTop: "2px solid black" }} />
          </div>
          <div style={{ display: "flex", textAlign: "justify" }}>
            <h5 style={{ marginLeft: "670px", fontWeight: "bold" }}>TOTAL</h5>
            <h5 style={{ marginLeft: "43px", fontWeight: "bold" }}>:</h5>
            <h5
              style={{ marginLeft: "30px", fontWeight: "bold", color: "red" }}
            >
              {rupiah(dataTrans?.qty * trip?.price)}
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-end my-5">
          <Button
            style={{
              backgroundColor: "#FFAF00",
              padding: "10px 50px",
              border: "none",
            }}
            onClick={() => handleTransaction.mutate()}
            type="submit"
            // onClick={() => submit()}
          >
            PAY
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export { Payment };
