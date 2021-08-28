import express from 'express';
import {
  createCompany,
  createGeneralEntry,
  getCompany,
  getCompanyEnteries,
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

// @desc    Get all Company
// @route   GET /api/company/
// @access  Public
router.route('/').get(getCompany);

export default router;
