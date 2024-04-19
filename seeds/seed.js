const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../models');    
const userData = require('./user-seed.json');
const postData = require('./posts-seed.json');
const comment = require('./comments-seed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log("---------Users seeded---------");


        await Post.bulkCreate(postData);
        console.log("-------------Posts seeded------------");
        await Comment.bulkCreate(comment);
        console.log("----------Comments seeded---------");
    

    for (let user of users) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    console.log("---------Passwords hashed----------");

    process.exit(0);
}

seedDatabase();