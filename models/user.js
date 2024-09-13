const bcrypt = require('bcryptjs');

const users = []; // In-memory store

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async findOne(username) {
        return users.find(user => user.username === username);
    }

    static async save(user) {
        users.push(user);
        return user;
    }

    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

// Hash password before saving
User.create = async function(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User(username, hashedPassword);
    await User.save(user);
    return user;
};

module.exports = User;
