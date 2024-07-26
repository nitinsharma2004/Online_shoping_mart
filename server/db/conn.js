const mongoose = require("mongoose");

const username = "ns";
const password = "nitins";
const DB = `mongodb+srv://${username}:${password}@cluster0.4uysckg.mongodb.net/mearn?retryWrites=true&w=majority`;
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database Connected")).catch((err) => {
    console.log(err);
});
