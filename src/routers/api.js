const express = require("express");

const rounterAPI = express.Router();
const {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileApi,
    postUploadMultipleFileApi,


} = require("../controllers/apiController");

const {
    postCreateCustomer,
    postCreateArrayCustomer,
    getAllCustomers,
    putUpdateCustomer,
    deleteACustomer,
    deleteArrayCustomer,

} = require("../controllers/customerController");

const {

    postCreateProject,
    getAllProject,
    putUpdateProject,
    deleteProject

} = require("../controllers/projectController");

const {
    postCreateTask,
    getAllTask,
    putUpdateTask,
    deleteTask
} = require("../controllers/taskController");

rounterAPI.get("/users", getUsersAPI);
rounterAPI.post("/users", postCreateUserAPI);
rounterAPI.put("/users", putUpdateUserAPI);
rounterAPI.delete("/users", deleteUserAPI);

rounterAPI.post("/customers", postCreateCustomer)
rounterAPI.post("/customers-many", postCreateArrayCustomer)
rounterAPI.get("/customers", getAllCustomers)
rounterAPI.put("/customers", putUpdateCustomer);
rounterAPI.delete("/customers", deleteACustomer);
rounterAPI.post("/customers-many", deleteArrayCustomer)

rounterAPI.get("/info", (req, res) => {

})

rounterAPI.post("/projects", postCreateProject);
rounterAPI.get("/projects", getAllProject)
rounterAPI.put("/projects", putUpdateProject);
rounterAPI.delete("/projects", deleteProject)

rounterAPI.post("/tasks", postCreateTask);
rounterAPI.get("/tasks", getAllTask)
rounterAPI.put("/tasks", putUpdateTask);
rounterAPI.delete("/tasks", deleteTask)



rounterAPI.post("/file", postUploadSingleFileApi);
rounterAPI.post("/files", postUploadMultipleFileApi);







module.exports = rounterAPI;
