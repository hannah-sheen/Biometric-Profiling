import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
const port = 5000;  

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }));


//db connection
const mongoURI = 'mongodb://127.0.0.1:27017/IHCBiometric';
mongoose.connect(mongoURI)
    .then(() => {
    console.log('connected to db')
    })
    .catch((e) => {
        console.log(e)
    }) 

  
const schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    middlename: String,
    suffix: String,
    birthdate: String,
    nationality: String,
    religion: String,
    height: String,
    weight: String,
    eye: String,
    hair: String,
    occupation: String,
    pob: String,
    telnum: String,
    phonenum: String,
    email: String,
    education: String,
    gender: String,
    maritalstat: String,
    street: String,
    barangay: String,
    city: String,
    province: String,
    zip: String,
    mFName: String,
    mLName: String,
    mMiddlename: String,
    mBdate: String,
    mphonenum: String,
    mEmail: String,
    mOccupation: String,
    mpob: String,
    fFName: String,
    fLName: String,
    fMiddlename: String,
    fBdate: String,
    fphonenum: String,
    fEmail: String,
    fpob: String,
    gFName: String,
    gLName: String,
    gMiddlename: String,
    gRelationship: String,
    gphonenum: String,
    gEmail: String,
    gHomeAdd: String,
    image: String,
})

const dataModel = mongoose.model('users', schema, 'users');


app.post('/temp-profile', async (req, res) => { 
    console.log('Image: ', req.body.url)
    console.log('Profile Data: ', req.body.users)
    if(req.body.url && req.body.users){
        try {
          // Store the data and the image in MongoDB
          const data = new dataModel({
            firstname: req.body.users.firstname,
            lastname: req.body.users.lastname,
            middlename: req.body.users.middlename,
            suffix: req.body.users.suffix,
            birthdate: req.body.users.birthdate,
            nationality: req.body.users.nationality,
            religion: req.body.users.religion, 
            height: req.body.users.height,
            weight: req.body.users.weight,
            eye: req.body.users.eye,
            hair: req.body.users.hair,
            occupation: req.body.users.occupation,
            pob: req.body.users.pob,
            telnum: req.body.users.telnum,
            phonenum: req.body.users.phonenum,
            email: req.body.users.email,
            education: req.body.users.education,
            gender: req.body.users.gender,
            maritalstat: req.body.users.maritalstat,
            street: req.body.users.street,
            barangay: req.body.users.barangay,
            city: req.body.users.city,
            province: req.body.users.province,
            zip: req.body.users.zip,
            mFName: req.body.users.mFName,
            mLName: req.body.users.mLName,
            mMiddlename: req.body.users.mMiddlename,
            mBdate: req.body.users.mBdate,
            mphonenum: req.body.users.mphonenumber,
            mEmail: req.body.users.mEmail,
            mOccupation: req.body.users.mOccupation,
            mpob: req.body.users.mpob,
            fFName: req.body.users.fFName,
            fLName: req.body.users.fLName,
            fMiddlename: req.body.users.fMiddlename,
            fBdate: req.body.users.fBdate,
            fphonenum: req.body.users.fphonenum,
            fEmail: req.body.users.fEmail,
            fpob: req.body.users.fpob,
            gFName: req.body.users.gFName,
            gLName: req.body.users.gLName,
            gMiddlename: req.body.users.gMiddlename,
            gRelationship: req.body.users.gRelationship,
            gphonenum: req.body.users.gphonenum,
            gEmail: req.body.users.gEmail,
            gHomeAdd: req.body.users.gHomeAdd,
            image: req.body.url,
          });
      
          await data.save();
          res.status(200).json({
              message: 'Registration complete',
              users: data,
          });
    
      } catch (error) {
        console.error('Error processing profile data:', error);
        res.status(500).json({ error: 'Failed to save profile and associated data' });
      }
    }
    else{
      console.log('Image: ', req.body.url)
      console.log('Profile Data: ', req.body.users)
    }
    
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
