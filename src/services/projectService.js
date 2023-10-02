const Project = require("../models/project");
const aqp = require('api-query-params');

const createProjectService = async (data) => {
    if (data.type === "EMPTY-PROJECT") {
        let result = await Project.create(data);
        return result;
    }

    if (data.type === "ADD-USERS") {
        let myProject = await Project.findById(data.projectId).exec();

        for (let i = 0; i < data.usersArr.length; i++) {
            myProject.usersInfor.push(data.usersArr[i]);
        }

        let newResult = await myProject.save();

        return newResult;
    }

    if (data.type === "REMOVE-USERS") {
        let myProject = await Project.findById(data.projectId).exec();

        for (let i = 0; i < data.usersArr.length; i++) {
            myProject.tasks.pull(data.taskArr[i]);
        }

        let newResult = await myProject.save();

        return newResult;
    }

    if (data.type === "ADD-TASKS") {
        let myProject = await Project.findById(data.projectId).exec();

        for (let i = 0; i < data.taskArr.length; i++) {
            myProject.tasks.push(data.taskArr[i]);
        }

        let newResult = await myProject.save();

        return newResult;
    }

    if (data.type === "REMOVE-TASKS") {
        let myProject = await Project.findById(data.projectId).exec();

        for (let i = 0; i < data.taskArr.length; i++) {
            myProject.tasks.pull(data.taskArr[i]);
        }

        let newResult = await myProject.save();

        return newResult;
    }


    return null;
}

const getProjectService = async (data) => {
    const page = data.page;
    const { filter, limit, population } = aqp(data);
    delete filter.page;

    const offset = page > 0 ? (page - 1) * limit : 0;
    result = await Project.find(filter).populate(population).skip(offset).limit(limit).exec();
    return result;

}

const updateProjectService = async (data) => {
    try {
        let result = await Project.updateOne({ _id: data.id }, { name: data.name, endDate: data.endDate, description: data.description });
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}


const deleteProjectService = async (id) => {
    try {
        let result = await Project.deleteById(id);
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}
module.exports = {
    createProjectService,
    getProjectService,
    updateProjectService,
    deleteProjectService
}