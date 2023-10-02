const {
    uploadSingleFile
} = require("../services/fileService");


const {
    createCustomerService, createArrayCustomerService,
    getAllCustomerService,
    updateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerService
} = require("../services/customerService");

const Joi = require('joi');





module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;


        const schema = Joi.object({
            name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

            address: Joi.string(),
            phone: Joi.string.pattern(new RegExp('^[0-9]{8,11}$')),
            email: Joi.string().email(),
            description: Joi.string()
        })

         const {error} = schema.validate(req.body, {abortEarly: false});

         if(error) {

         } else {
            
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {

        } else {
            let result = await uploadSingleFile(req.files.image)
            imageUrl = result.path;
        }

        let customerData = {
            name,
            address,
            phone,
            email,
            description,
            image: imageUrl
        }

        let customer = await createCustomerService(customerData)

        return res.status(200).json({
            EC: 0,
            data: customer
        }
        )
    }

    },

    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers);

        if (customers) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: customers
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: customers
                }
            )
        }

    },

    getAllCustomers: async (req, res) => {


        let allCustomer = null;

        let limit = req.query.limit;
        let page = req.query.page;

        if (limit && page) {
            allCustomer = await getAllCustomerService(limit, page, name, req.query);
        } else {
            allCustomer = await getAllCustomerService();
        }


        if (allCustomer) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: allCustomer
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: allCustomer
                }
            )
        }

    },

    putUpdateCustomer: async (req, res) => {
        let { id, name, address, phone, email, description } = req.body;
        let customerData = {
            id,
            name,
            address,
            phone,
            email,
            description,
        }

        let customer = await updateCustomerService(customerData)
        if (customer) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: customer
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: customer
                }
            )
        }

    },
    deleteACustomer: async (req, res) => {
        let id = req.body.id;
        let result = await deleteACustomerService(id);

        if (result) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: result
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: result
                }
            )
        }

    },

    deleteArrayCustomer: async (req, res) => {
        let ids = req.body.customersid;
        let result = await deleteACustomerService(ids);

        if (result) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: result
                }
            )
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: result
                }
            )
        }

    }
}