const express = require("express");
const app = express();
module.exports = app; //export to server.js

// const mongoose = require("mongoose");
app.use(express.json());



//import all crud operations from controller//
const usersController = require("./controller/user.controller");
const batchesController = require("./controller/batch.controller");
const evaluationsController = require("./controller/evaluatio.controller");
const studentsController = require("./controller/student.controller");
const submissionsController = require("./controller/submission.controller");

//middlewares
app.use("/users",usersController);
app.use("/batches",batchesController);
app.use("/students",studentsController);
app.use("/evaluations",evaluationsController);
app.use("/submissions",submissionsController);



//op - 1:  fetch all students who gave a particular evaluation

app.get("/:id/students", async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).lean().exec();
        const students = await Student.find({evaluation_id: evaluation._id}).populate({path: "user_id", select: ["first_name", "last_name"]}).lean().exec();

        return res.status(201).send(students);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

//op - 2: fetch the student with his personal details who scored the highest marks in the evaluation
app.get("/topper", async (req, res) => {
    try {
        const student = await Submission.find()
          .sort({marks: -1})
          .limit(1)
          .populate({path:"student_id",select:[],
             populate:{path:"user_id", select:["first_name","last_name"]}
           })
          .lean()
          .exec();

        return res.status(201).send(student);

    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
})