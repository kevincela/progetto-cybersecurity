const User = require("./server/models/User");
const bcrypt = require("bcrypt");
const config = require("./server/config");
const Web3 = require("web3");
const mongoose = require("mongoose");
const { exitOnError } = require("winston");
const args = process.argv.slice(2);

function check() {
  if ((!args[0] || !args[1])) {
    console.log("Check the args!")
    process.exit()}

}

function createUser() {
    const username = args[0];
    const password = args[1];
    const saltRounds = 10;

    mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    let web3 = new Web3("http://localhost:22000");
    web3.eth.getAccounts().then(accounts => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if(!err) {
            bcrypt.hash(password, salt, (err, hash) => {
                if(!err) {
                  const user = new User({
                    username: username,
                    password: hash,
                    account: accounts[0]
                  });
                  user.save((err, user) => {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log("Utente creato:");
                      console.log(user);
                      process.exit();
                    }
                  });
                }
              });
        } else {
            console.log(err);
            process.exit();
        }
      });
    })
    .catch(err => {
      console.log(err);
      process.exit();
    });
}

check();
createUser();
