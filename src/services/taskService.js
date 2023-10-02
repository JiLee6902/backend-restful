const Task = require("../models/task");
const aqp = require('api-query-params');

const createTaskService = async (data) => {
    if (data.type === "EMPTY-TASK") {
        let result = await Task.create(data);
        return result;
    }

    if (data.type === "ADD-USERS") {
        let myTask = await Task.findById(data.TaskId).exec();

        for (let i = 0; i < data.usersArr.length; i++) {
            myTask.usersInfor.push(data.usersArr[i]);
        }

        let newResult = await myTask.save();

        return newResult;
    }

    if (data.type === "REMOVE-USERS") {
        let myTask = await Task.findById(data.TaskId).exec();

        for (let i = 0; i < data.usersArr.length; i++) {
            myTask.usersInfor.pull(data.usersArr[i]);
        }

        let newResult = await myTask.save();

        return newResult;
    }
}

const getTaskService = async (data) => {
    const page = data.page;
    const { filter, limit } = aqp(data);
    delete filter.page;
    let offset = (page - 1) * limit;
    result = await Task.find(filter).skip(offset).limit(limit).exec();
    return result;
}

const updateTaskService = async (data) => {
    try {
        let result = await Task.updateOne({ _id: data.id }, { ...data });
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}


const deleteTaskService = async (id) => {
    try {
        let result = await Task.deleteById(id);
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}
module.exports = {
    createTaskService,
    getTaskService,
    updateTaskService,
    deleteTaskService
}