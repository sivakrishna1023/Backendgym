import express from 'express';
const app= express();
const port=3000;
import admins from "./routes/adminroute";
import {connect_to_db} from "./config/database";
import userss from "./routes/userroutes";

connect_to_db();

app.use(express.json());
app.use("/api/v1",admins);
app.use("/api/v2",userss);

app.listen(port,()=>{
    console.log(`Listing in the port ${port}`);
})



