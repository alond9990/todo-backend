/**
 * Created by alond9990 on 12/09/2018.
 */

const MySQLConnect = require('./mysql_connection');

function User() {

    this.db = new MySQLConnect();

    // get specific user by credentials
    this.getUserByCredentials = async function (username, password) {
        let users = await this.db.query("SELECT * FROM user WHERE username = '" + username + "' AND password = '" + password + "'");
        let user = users[0];
        delete  user['password'];
        return user;
    };

}

module.exports = new User();