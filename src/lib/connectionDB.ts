import mongoose from 'mongoose';

const connectionString:string = "mongodb://root:example@localhost:27017";

export const db = mongoose.connect(connectionString, {dbName:"compunet3"}).then(()=>{
    console.log("Connected to MongoDB");
}
).catch((error)=>{
    console.log(error);
    process.exit(1);
}
);