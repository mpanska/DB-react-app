const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require('../models/Product');
const { auth } = require("../middleware/auth");
const { Payment } = require('../models/Payment');
const async = require('async');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Collection } = require('mongoose');


router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 1 ? true : false,
        isProductOwner: req.user.role === 2 ? true : false,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});


router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "email nie znaleziono"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "niepoprawne hasło" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id, isAdmin: user.isAdmin});
            });
        });
    });
});


router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});



router.get('/addToCart', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;
        console.log(userInfo)
        userInfo.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })

        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.query.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {   $push: {
                        cart: {
                            id: req.query.productId,
                            quantity: 1,
                            date: new Date
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
            
        }
    })
});


router.get('/removeFromCart', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })
            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
})


router.get('/userCartInfo', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })
            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true, cartDetail, cart })
                })
        }
    )
})





router.post('/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: new Date,
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }

    transactionData.data = req.body.paymentData;
    transactionData.product = history

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            })
        }
    )
})


router.get('/getHistory', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, doc) => {
            let history = doc.history;
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, history })
        }
    )
})



router.delete("/:id", (req, res) =>{
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
            alert('Nie udało się usunąć użytkownika o podanym id')
          res.status(404).send({
            message: `Nie udało się odnaleźć i usunąć użytkownika o id ${id}`
          });
        } else {
          res.send({
            message: `Usunięto użytkownika o ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({ 
          message: "Nie udało się usunąć użytkownika o id" + id
        });
      });   
});


router.post('/updateUser/:id', async (req, res) => {

    const password = req.body.password
    if(password){
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) console.log(err)
            bcrypt.hash(password, salt, async (next, hash) =>{
                if(password === undefined) console.log('-----password undefined-----')
                if(err) throw(err)
                req.body.password = await bcrypt.hash(req.body.password, salt)

            User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
                if (err) {
                    res.status(404).send({
                        message: 'Nie można zaktualizować danych użytkownika'
                    });  
                } else {
                    console.log('edycja danych: sukces');
                    res.send(user);
                }
           
            });
        })
    })
    }else{
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
            if (err) {
                res.status(404).send({
                    message: 'Nie można zaktualizować danych użytkownika'
                });  
            } else {
                console.log('edycja danych: sukces');
                res.send(user);
            }
        });
    }
});




router.post("/getUsers", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let findArgs = {};
    let term = req.body.searchTerm;

    if (term) {
        User.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .limit(limit)
            .exec((err, users) => {
                console.log(err)
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, users})
            })
    } else {
        User.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .limit(limit)
            .exec((err, users) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, users})
            })
    }
});



module.exports = router;
