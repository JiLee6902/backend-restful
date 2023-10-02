const Customer = require("../models/customer");
const aqp = require('api-query-params');



const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })
        return result;
    } catch (err) {
        console.log(err)
        return null;
    }
}

const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr)
        return result;
    } catch (err) {
        console.log("err")
        return null;
    }
}

const getAllCustomerService = async (limit, page, name, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter, skip } = aqp(queryString);
            delete filter.page;
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}

const updateCustomerService = async (customerData) => {
    try {
        let result = await Customer.updateOne({ _id: customerData.id }, { name: customerData.name, address: customerData.address, phone: customerData.phone, email: customerData.email, description: customerData.description });
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}


const deleteACustomerService = async (id) => {
    try {
        let result = await Customer.deleteById(id);
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}

const deleteArrayCustomerService = async (arrIds) => {
    try {
        let result = await Customer.delete({ _id: { $in: arrIds } });
        return result;
    } catch (err) {
        console.log("err: ", err)
        return null;
    }
}


module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService,
    updateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerService
};