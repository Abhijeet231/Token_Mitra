import app from "./app.js";
import connectDB from "./db/index.js";
import "./corn/cleanAvailableSlots.js"; 

connectDB()
.then(
 () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`)
    });
 }
)
.catch((err) => {
    console.log('MONGODB Connection Failed!', err)
    process.exit(1);
});
