
const {
    createProjectService,
    getProjectService,
    updateProjectService, deleteProjectService
} = require("../services/projectService");


module.exports = {
    postCreateProject: async (req, res) => {

        let result = await createProjectService(req.body)

        return res.status(200).json({
            EC: 0,
            data: result
        })

    },
    getAllProject: async (req, res) => {
        let result = await getProjectService(req.query);

        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    putUpdateProject: async (req, res) => {
        let project = await updateProjectService(req.body)
        if (project) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: project
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: project
                }
            )
        }
    },
    deleteProject: async (req, res) => {
        let project = await deleteProjectService(req.body.id)
        if (project) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: project
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: project
                }
            )
        }
    }
}