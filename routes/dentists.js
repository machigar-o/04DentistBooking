/**
* @swagger
* components:
*   schemas:
*     Dentist:
*       type: object
*       required:
*         - name
*         - hospital
*         - address
*         - expertist
*         - picture
*       properties:
*         name:
*           type: string
*           description: Name of the dentist
*         hospital:
*           type: string
*           description: Hospital Description
*         address:
*           type: string
*           description: House No., Street, Road
*         expertist:
*           type: string
*           description: expertist 
*         tel:
*           type: string
*           description: telephone number
*         picture:
*           type: string
*           description: picture
*/

const express = require("express");
const {
  getDentists,
  getDentist,
  createDentist,
  updateDentist,
  deleteDentist,
} = require("../controllers/dentists");

/**
* @swagger
* tags:
*   name: Dentists
*   description: The dentists managing API
*/

// Include other resource routers
const bookingRouter = require("./bookings");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers

/**
* @swagger
* /dentists:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Create a new dentist
*     tags: [Dentists]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Dentist'
*     responses:
*       201:
*         description: The dentist was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Dentist'
*       500:
*         description: Some server error
*/

/**
* @swagger
* /dentists:
*   get:
*     summary: Returns the list of all the dentists
*     tags: [Dentists]
*     responses:
*       200:
*         description: The list of the dentists
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*               $ref: '#/components/schemas/Dentist'
*/
router.use("/:dentistId/bookings", bookingRouter);
router
  .route("/")
  .get(getDentists)
  .post(protect, authorize("admin"), createDentist);

/**
* @swagger
* /dentists/{id}:
*   get:
*     summary: Get the dentist by id
*     tags: [Dentists]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The dentist id
*     responses:
*       200:
*         description: The dentist description by id
*         contents:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Dentist'
*       404:
*         description: The dentist was not found
*/

/**
* @swagger
* /dentists/{id}:
*   put:
*     security:
*       - bearerAuth: []
*     summary: Update the dentist by id
*     tags: [Dentists]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The dentist id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Dentist'
*     responses:
*       200:
*         description: The dentist was successfully updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Dentist'
*       500:
*         description: Some server error
*/

/**
* @swagger
* /dentists/{id}:
*   delete:
*     security:
*       - bearerAuth: []
*     summary: Delete the dentist by id
*     tags: [Dentists]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The dentist id
*     responses:
*       200:
*         description: The dentist was successfully deleted
*         contents:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Dentist'
*       404:
*         description: The dentist was not found
*/
router
  .route("/:id")
  .get(getDentist)
  .put(protect, authorize("admin"), updateDentist)
  .delete(protect, authorize("admin"), deleteDentist);

module.exports = router;
