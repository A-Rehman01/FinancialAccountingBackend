import express from 'express';
import {
  createCompany,
  createGeneralEntry,
  getCompany,
  getCompanyEnteries,
  deleteEntery,
  updateEntery,
} from '../controllers/generalEntryController.js';
const router = express.Router();

// @desc    Create Company
// @route   POST /api/company/create
// @access  Public

router.route('/create').post(createCompany);

// @desc    Add Company Enteries
// @route   POST /api/company/entery/:id
// @access  Public

// @desc    Get all  Company Enteries
// @route   GET /api/company/entery/:id
// @access  Public

router.route('/entery/:id').post(createGeneralEntry).get(getCompanyEnteries);

// @desc    delete Entery from Company
// @route   DELETE /api/company/entery/:id
// @access  Public

// @desc    update Entery from Company
// @route   PUT /api/company/entery/:id
// @access  Public

router.route('/entery/:id').delete(deleteEntery).put(updateEntery);

// @desc    Get all Company
// @route   GET /api/company/
// @access  Public
router.route('/').get(getCompany);

export default router;
