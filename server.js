import express from 'express';
import multer from 'multer';
import cors from 'cors';
import pkg from 'pg';
const { Client } = pkg;

// Create Express app
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Adjust the size limit as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Set up multer for parsing form-data (for image upload)
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Database connection
const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: 'hannahbisheen',
  database: "IHCBiometric"
});

con.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Connection error", err.stack));

// Handle the POST request for profile
app.post('/temp-profile', upload.single('image'), async (req, res) => { 
  try {
    console.log("Received data:", req.body); // Logs other fields sent in the formData

    // Get the image (buffer from the form)
    const imageBuffer = req.file?.buffer; // Multer will store the file as a buffer in `req.file`


    // Extract other profile data
    const {
      firstname, lastname, middlename, suffix, birthdate, eyecol, haircol,
      occupation, education, phonenum, telnum, email, gender, maritalStat,
      religion, nationality, height, weight, street, barangay, city, province, zip,
      motherFirstname, motherLastname, motherMiddlename, motherDob, motherContact,
      motherEmail, motherOccupation, motherEmployer, motherEmployerAddr, motherTelFax,
      fatherFirstname, fatherLastname, fatherMiddlename, fatherDob, fatherContact,
      fatherEmail, fatherOccupation, fatherEmployer, fatherEmployerAddr, fatherTelFax,
      guardianFirstname, guardianLastname, guardianMiddlename, guardianRelationship,
      guardianContact, guardianEmail, guardianHomeAddr
    } = req.body;

    // Step 1: Insert profile data into user_profile table
    const userInsertQuery = `
      INSERT INTO user_profile (
        user_fname, user_middlename, user_lname, user_suffix, user_birthdate,
        user_eye_color, user_hair_color, user_occupation, user_educ_lvl, user_contact,
        user_tel_num, user_email, user_gender, user_marital_stat, user_religion,
        user_nationality, user_height, user_weight, user_street, user_barangay, user_city,
        user_province, user_zipcode, user_image
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24
      ) RETURNING user_id;
    `;

    const result = await con.query(userInsertQuery, [
      firstname, middlename || null, lastname, suffix || null, birthdate, eyecol, haircol, occupation || null,
      education, phonenum, telnum || null, email, gender, maritalStat, religion || null, nationality,
      parseFloat(height), parseFloat(weight), street, barangay, city, province, zip, imageBuffer
    ]);

    const userId = result.rows[0].user_id; // Get the generated user_id

    // Insert mother, father, and guardian data
    const motherInsertQuery = `
      INSERT INTO mother (
        user_id, mom_fname, mom_lname, mom_middlename, mom_dob, mom_occupation,
        mom_contact, mom_email, mom_emp, mom_emp_ad, mom_tel
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      );
    `;
    await con.query(motherInsertQuery, [
      userId, motherFirstname, motherLastname, motherMiddlename || null, motherDob,
      motherOccupation || null, motherContact, motherEmail || null, motherEmployer || null,
      motherEmployerAddr || null, motherTelFax || null
    ]);

    const fatherInsertQuery = `
      INSERT INTO father (
        user_id, fath_fname, fath_lname, fath_middlename, fath_dob, fath_occupation,
        fath_contact, fath_email, fath_emp, fath_emp_ad, fath_tel
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      );
    `;
    await con.query(fatherInsertQuery, [
      userId, fatherFirstname, fatherLastname, fatherMiddlename || null, fatherDob,
      fatherOccupation || null, fatherContact, fatherEmail || null, fatherEmployer || null,
      fatherEmployerAddr || null, fatherTelFax || null
    ]);

    const guardianInsertQuery = `
      INSERT INTO guardian (
        user_id, guar_fname, guar_lname, guar_middlename, guar_relation, guar_contact,
        guar_email, guar_home_ad
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      );
    `;
    await con.query(guardianInsertQuery, [
      userId, guardianFirstname, guardianLastname, guardianMiddlename || null, guardianRelationship,
      guardianContact, guardianEmail || null, guardianHomeAddr
    ]);

    res.status(200).json({ message: 'Profile and associated data saved successfully' });
  } catch (error) {
    console.error('Error processing profile data:', error);
    res.status(500).json({ error: 'Failed to save profile and associated data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
