  import express from 'express';
  import cors from 'cors';
  import knex from 'knex';
  import multer from 'multer';

  const app = express();



  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Specify the folder where files should be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);  // Specify the file naming convention
    }
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5 MB
});



  // Middleware
  app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());

  // Knex configuration for PostgreSQL connection
  const db = knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'hannahbisheen',
      database: 'IHCBiometric',
      port: 5433
    },
  });

  app.post('/create-profile', upload.single('image'), async (req, res) => {

    const imagepath = req.file.path
    const {
      firstname,
      lastname,
      middlename,
      suffix,
      birthdate,
      nationality,
      religion,
      height,
      weight,
      eyecol,
      haircol,
      occupation,
      telnum,
      phonenum,
      email,
      education,
      gender,
      maritalStat,
      street,
      barangay,
      city,
      province,
      zip,
      motherFirstname,
      motherLastname,
      motherMiddlename,
      motherDob,
      motherContact,
      motherEmail,        
      motherOccupation,
      motherEmployer,
      motherEmployerAddr,
      motherTelFax,
      fatherFirstname,
      fatherLastname,
      fatherMiddlename,
      fatherDob,
      fatherContact,
      fatherEmail,
      fatherOccupation,
      fatherEmployer,
      fatherEmployerAddr,
      fatherTelFax,
      guardianFirstname,
      guardianLastname,
      guardianMiddlename,
      guardianRelationship ,
      guardianContact,
      guardianEmail,
      guardianHomeAddr,
    } = req.body;

    console.log('Request received at /create-profile:', req.body);

    const trx = await db.transaction(); // Start a transaction
    try {
      // Insert into user_info
      const userResult = await trx('user_profile')
        .insert({
          user_fname: firstname,
          user_middlename: middlename || null,
          user_lname: lastname,
          user_suffix: suffix || null,
          user_birthdate: birthdate,
          user_eye_color: eyecol,
          user_hair_color: haircol,
          user_occupation: occupation || null,
          user_educ_lvl: education,
        // user_pob: placeOfBirth,
          user_contact: parseInt(phonenum),
          user_tel_num: parseInt(telnum) || null,
          user_email: email,
          user_gender: gender,
          user_marital_stat: maritalStat,
          user_religion: religion || null,
          user_nationality: nationality,
          user_height: parseFloat(height),
          user_weight: parseFloat(weight),
          user_street: street,
          user_barangay: barangay,
          user_city: city,
          user_province: province,
          user_zipcode: parseInt(zip),
          user_image: imagepath
        })
        .returning('user_id'); // Ensure user_id is returned

      console.log('User Info Inserted:', userResult);

      const userId = userResult[0]?.user_id; // Access the returned user_id
      if (!userId) {
        throw new Error('Failed to retrieve user_id after insertion');
      }

      // Insert Mother's Information
      await trx('mother').insert({
        user_id: userId,
        mom_fname: motherFirstname,
        mom_lname: motherLastname,
        mom_middlename: motherMiddlename || null,
        mom_dob: motherDob,
        //parent_pob: MPOB,
        mom_occupation: motherOccupation || null,
        mom_contact: parseInt(motherContact),
        mom_email: motherEmail || null,
        mom_emp: motherEmployer || null,
        mom_emp_ad: motherEmployerAddr || null,
        mom_tel: motherTelFax || null
      });

      // Insert Father's Information
      await trx('father').insert({
        user_id: userId,
        fath_fname: fatherFirstname,
        fath_lname: fatherLastname,
        fath_middlename: fatherMiddlename || null,
        fath_dob: fatherDob,
        //parent_pob: FPOB,
        fath_occupation: fatherOccupation || null,
        fath_contact: parseInt(fatherContact),
        fath_email: fatherEmail || null,
        fath_emp: fatherEmployer || null,
        fath_emp_ad: fatherEmployerAddr || null,
        fath_tel: fatherTelFax || null
      });

      await trx('guardian').insert({
        user_id: userId,
        guar_fname: guardianFirstname,
        guar_lname: guardianLastname,
        guar_middlename: guardianMiddlename || null,
        guar_relation: guardianRelationship,
        guar_contact: guardianContact,
        guar_email: guardianEmail || null,
        guar_home_ad: guardianHomeAddr
      });
      // Commit the transaction
      await trx.commit();
      res.status(201).json({ message: 'Registration successful' })
    } catch (error) {
      // Rollback the transaction on error
      await trx.rollback();
      console.error('Transaction Error:', error.message);
      res.status(500).json({ error: 'Failed to register', details: error.message });
    }
  });
  // Start the server
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });