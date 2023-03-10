import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from '../components/Error';
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import swal from "sweetalert2"

function Bookingscreen() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();

    let { id, fromdate, todate } = useParams();

    const firstdate = moment(fromdate, "DD-MM-YYYY");
    const lastdate = moment(todate, "DD-MM-YYYY");
    const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
    const [totalamount, settotalamount] = useState();

    useEffect(() => {
        const fetchData = async () => {

            if(!localStorage.getItem('currentUser')){
                window.location.reload='/login'
            }

            try {
                setloading(true)
                const data = (await axios.post('/api/rooms/getroombyid', { roomid: id })).data

                settotalamount(data.rentperday * totaldays);

                setroom(data)
                setloading(false)
                console.log(data);
            } catch (error) {
                seterror(true)
                console.log(error);
                setloading(false)
                
            }
        };
        fetchData();
    }, []);

   async function onToken(token) {
        console.log(token);

        const bookingDetails = {

            room,
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            setloading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            setloading(false)
            swal.fire("Congratulations" , "Your Room Booked Successfully !" ,"success").then((result)=>{
                window.location.href='/profile'
            })
        } catch (error) {
            setloading(false)
            swal.fire("OOPS","something went wrong","error")
        }
        

    }

    return (
        <div className="m-5">
            {loading ? (<Loader />) : room ? (<div>


                <div className="row justify-content-center mt-5 bs">

                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>

                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                                <p>From Date :{fromdate}</p>
                                <p>To Date :  {todate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>

                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount : </h1>
                                <hr />
                                <p>Total days : {totaldays}</p>
                                <p>Rent Per day : {room.rentperday}</p>
                                <p>Total Amount : {totalamount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>


                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency="INR"
                                stripeKey="pk_test_51MjMdXSB50ekGdkVXZoXT6N3ajezCvH2N1r5BP5OduMERgjJb41lEPsDNSbRg0sXPY2Ktj2iGPudIo29sXnkFrxT00p5jkAWGc"
                            >
                            <button className="btn btn-primary">Pay Now</button>

                            </StripeCheckout>

                        </div>

                    </div>

                </div>


            </div>) : (<Error />)}
        </div>
    );
}

export default Bookingscreen;
