const User = require("./server/models/User");
const bcrypt = require("bcrypt");
const config = require("./server/config");
const Web3 = require("web3");
const mongoose = require("mongoose");

async function createUser() {
    const myArgs = process.argv.slice(2);

    mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    let web3 = new Web3("http://localhost:22000");
    let accounts = await web3.eth.getAccounts();

    const username = myArgs[0];
    const password = myArgs[1];
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(!err) {
            bcrypt.hash(password, salt, (err, hash) => {
                if(!err) {
                  const user = new User({
                    username: username,
                    password: hash,
                    salt: salt,
                    account: accounts[0]
                  });
                  user.save((err, user) => {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log("Utente creato:");
                      console.log(user);
                    }
                  });
                }
              });
        } else {
            console.log(err);
        }
    });
}

createUser();