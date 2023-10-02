const connection = require("../config/database");
const User = require("../models/user");

const getAllUsers = async () => {
    let [results, fields] = await connection.query(
        `SELECT * FROM Users`
    );

    return results;
};

const getUserById = async (userId) => {
    let [results, fields] = await connection.query(
        `select * from Users where id = ?
    `,
        [userId]
    );

    let user = results && results.length > 0 ? results[0] : {};
    return user;
};

const updateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    let userId = req.body.userId;

    // let [results, fields] = await connection.query(
    //     `UPDATE Users SET email = ?, name = ?, city = ?
    //  WHERE id = ?
    // `,
    //     [email, name, city, userId]
    // );

    await User.updateOne({ _id: userId }, { name: name, email: email, city: city })
    return results;
};

const deleteUser = async (req, res) => {
    let id = req.body.userId;

    // let [results, fields] = await connection.query(
    //     `DELETE FROM Users WHERE id = ?
    // `,
    //     [userId]
    // );

    await User.deleteOne({ _id: id })

};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
