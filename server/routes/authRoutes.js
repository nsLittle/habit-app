const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    console.log("Login route is here!", req.body);
    const { email, password } = req.body;
    res.status(200).json({ token: "mock-jwt-token" });
});

router.post("/signup", (req, res) => {
    console.log("Signup route is here!", req.body);
    const { full_name, email, password } = req.body;
    res.status(200).json({ message: "User created successfully", username: email });
});

module.exports = router;