const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const validator = require('validator')
const alert = require('alert')
const path = require('path')
const https = require('https')
const { response } = require('express')
const { request } = require('http')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const mailchimp = require('@mailchimp/mailchimp_marketing');
const md5 = require('md5')
const { OAuth2Client } = require('google-auth-library');

mailchimp.setConfig({
    apiKey: '11b1becf548b4bf29439bf1f6fb9690e-us17',
    server: 'us17',
});

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


mongoose.connect("mongodb+srv://admin:admin@cluster0.mjbl3.mongodb.net/iCrowdTask?retryWrites=true&w=majority", { useNewUrlParser: true })

app.get('/', (req, res) => {
    res.redirect('/login.html')

})


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "public/registration.html"));
})

const userSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        validator (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please choose your country!')
            }
        }
    },
    salt: {
        type: String
    },
    firstName: {
        type: String,
        required: true,
        validate (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input your first name!')
            }
        }
    },
    lastName: {
        type: String,
        required: true,
        validate (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input your last name!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validator (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input your email address!')
            }
            if (!validator.isEmail(value)) {
                throw new Error("Your email address is not valid!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input your password!')
            }
            if (!validator.isLength(value, { min: 8 })) {
                throw new Error('Your password must be at least 8 characters!')
                alert(Error)
            }
        }
    },
    confirmPassword: {
        type: String,
        required: true,
        validate (value) {
            if (!validator.equals(value, this.password)) {
                throw new Error('Your password should be the same as Confirm password!')
            }
        }
    },
    address1: {
        type: String,
        required: true,
        validate (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input address!')
            }
        }
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true,
        validate (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input city!')
            }
        }
    },
    state: {
        type: String,
        required: true,
        validate (value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please input state!')
            }
        }
    },
    zip: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
        validate (value) {
            if ((!validator.isEmpty(value)) && (!validator.isMobilePhone(value, ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY', 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'de-CH', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK', 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG', 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'en-ZW', 'es-CL', 'es-CO', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID', 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-TW']))) {
                throw new Error('Your phone number is not valid!')
            }
        }
    }
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email }, function(err, doc) {
        if (doc) {
            const result = bcrypt.compareSync(password, doc.password)
            if (result) {
                return res.json({ loggedin: true })
            }
            else {
                return res.json({ loggedin: false, msg: "Wrong password!" })
                // alert("Wrong password!")
            }
        }
        else {
            return res.json({ loggedin: false, msg: "Invalid email address!" })
            // alert("Invalid email address!")
        }
    })

})

const User = mongoose.model('User', userSchema)

app.post('/resetpass', (req, res) => {
    const email = req.body.email;
    // console.log(req.body)
    User.findOne({ email: email }, function(err, doc) {
        if (!doc) {
            alert("Email dost not exist!")
            return res.end();
        } else {
            alert("a reset password email has been sent");
            const options = {
                name: "reset_pass",
                properties: {
                    'link': `${req.protocol}://${req.get('host')}/reset.html?code=${Buffer.from(email, "utf8").toString('base64')}`
                }
            }
            // console.log(md5(email.toLowerCase()))
            const ListId = '5b9f475927';
            mailchimp.lists.createListMemberEvent(
                ListId,
                md5(email.toLowerCase()),
                options
            ).catch(err => {
                console.log(err);
            })

            res.redirect("/")
        }
    })
})

app.post('/reset', (req, res) => {
    let { email, password, password2 } = req.body;
    console.log(req.body)
    if (password.length < 8) {
        alert("Your password must be at least 8 characters!");
        return res.json({ reset: false, msg: "Your password must be at least 8 characters!" });

        //return res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl);
    }
    if (password !== password2) {
        alert("Password dose not match");
        // return;
        return res.json({ reset: false, msg: "Password dose not match" });
    }

    let salt = bcrypt.genSaltSync(saltRounds)
    password = bcrypt.hashSync(password, salt)
    User.updateOne({ email }, { password }, function(err) {
        if (err) {

            return res.json({ reset: false, msg: err });
        } else {
            return res.json({ reset: true });
        }
    });
})

app.post('/googlelogin', (req, res) => {
    const token = req.body.token;
    const CLIENT_ID = '355413680466-27ohov0vs83pddqqi7emlm475hiflnq0.apps.googleusercontent.com'
    const client = new OAuth2Client(CLIENT_ID);
    console.log(req.body)
    async function verify () {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        // console.log(payload)
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    verify().then(() => {
        res.status(200).json({ loggedin: true })
    }).catch(console.error);

})

app.post('/register', (req, res) => {

    const body = req.body;
    const userInfo = { country, firstName, lastName, email, password, confirmPassword, address1, address2, city, state, zip, phoneNumber } = body;

    body.salt = bcrypt.genSaltSync(saltRounds)
    body.password = bcrypt.hashSync(body.password, body.salt)
    body.confirmPassword = body.password

    const user = new User(userInfo)


    User.findOne({ email: email }, function(err, doc) {
        if (doc) {
            alert("This email address has already been registered! Please change another email address!")
        }
        else {
            user.save(function(error) {
                if (error) {
                    console.log("Error!")
                }
                else {
                    res.redirect("/success")
                }
            })
        }
    })

    console.log(firstName, lastName, email)
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }


    jsonData = JSON.stringify(data)

    const apiKey = "11b1becf548b4bf29439bf1f6fb9690e-us17"
    // const list_id = "83e632a9bb"

    const url = "https://us17.api.mailchimp.com/3.0/lists/83e632a9bb"
    const options = {
        method: "POST",
        auth: "azi:11b1becf548b4bf29439bf1f6fb9690e-us17"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()

    console.log(firstName, lastName, email)

    user.save(function(error) {
        if (error) {
            console.log("Error!")
        }
        else {
            res.redirect("/success")
        }
    })

})

app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public/final.html"));
});

app.get("/reqtask", (req, res) => {
    res.sendFile(path.join(__dirname, "public/reqtask.html"));
})
const PORT = process.env.PORT || '5000';
app.listen(PORT, function(request, response) {
    console.log(`Server is running on port ${PORT}`)
})