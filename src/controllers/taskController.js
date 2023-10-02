
const {
    createTaskService,
    getTaskService,
    updateTaskService, deleteTaskService
} = require("../services/taskService");


module.exports = {
    postCreateTask: async (req, res) => {
        let result = await createTaskService(req.body)

        return res.status(200).json({
            EC: 0,
            data: result
        })

    },
    getAllTask: async (req, res) => {
        let result = await getTaskService(req.query);

        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    putUpdateTask: async (req, res) => {
        let Task = await updateTaskService(req.body);
        if (Task) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: Task
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: Task
                }
            )
        }
    },
    deleteTask: async (req, res) => {
        let Task = await deleteTaskService(req.body.id)
        if (Task) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: Task
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: Task
                }
            )
        }
    }
}