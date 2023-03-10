const express = require("express");
const router = express.Router();
const Room = require("../models/room")
const Booking = require("../models/booking");
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("pk_test_51MjMdXSB50ekGdkVXZoXT6N3ajezCvH2N1r5BP5OduMERgjJb41lEPsDNSbRg0sXPY2Ktj2iGPudIo29sXnkFrxT00p5jkAWGc")

router.post("/bookroom", async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: "1234",
        });
        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: fromdate,
            todate: todate,
            userid: userid,
            status: booking.status,
        });

        await roomtemp.save()

        res.send("Room Booked Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.post("/getbookingsbyuserid", async(req, res) => {
    const userid = req.body.userid;
  
    try {
      const bookings = await Booking.find({ userid: userid });
      res.send(bookings);
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

//   cancel booking

  router.post("/cancelbooking" , async(req, res)=>{
    const {bookingid, roomid} =req.body;

    try {
        const bookingItem = await Booking.findOne({_id:bookingid})
        bookingItem.status = "cancelled"
        await bookingItem.save()
        // remove mongodb current bookings slat

        const room = await Room.findOne({_id : roomid})

        const bookings = room.currentbookings
        // filter this bookins array ...remove the bookings which is cancel
        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        room.currentbookings = temp
        
        await room.save()

        res.send("Your booking cancelled Successfully")


    } catch (error) {
        return res.status(400).json({ error });
    }

  });

  router.get("/getallbookings" , async(req,res)=>{

    try {
      const bookings = await Booking.find()
      res.send(bookings)
    } catch (error) {
      return res.send.status(400).json({ error })
    }

  });

module.exports = router;