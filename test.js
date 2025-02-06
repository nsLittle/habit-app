const bcrypt = require("bcryptjs");

const hashedPassword = "$2b$10$.0PrmU3PFkDjP0EbAwKbmO9c8np9434nMCfcdGAUvm3ZvuHIOfxrS"; // Your stored hash
const enteredPassword = "BSmith123!"; // The correct password

bcrypt.compare(enteredPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Passwords Match:", result);
    }
});
