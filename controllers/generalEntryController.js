import Company from '../modals/generalEntryModal.js';
import asyncHandler from 'express-async-handler';

// @desc    Create Company
// @route   POST /api/company/create
// @access  Public

const createCompany = asyncHandler(async (req, res) => {
  try {
    const { companyname } = req.body;
    const company = new Company({
      companyname,
    });
    const createdCompany = await company.save();
    res.status(201).json({
      success: true,
      message: 'Company Created SuccessFully',
      data: createdCompany,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: 'Failed',
    });
  }
});

// @desc    Add Company Enteries
// @route   POST /api/company/entery/:id
// @access  Public

const createGeneralEntry = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (company) {
    try {
      const { amount, debit, credit } = req.body;
      let entry = { amount, debit, credit };
      company.enteries.push(entry);
      const companywithEntry = await company.save();
      res.status(201).json({
        success: true,
        message: 'Entry Added SuccessFully',
        data: companywithEntry,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: 'Failed',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: 'Company Not Found',
    });
  }
});

// @desc    Get all Company
// @route   GET /api/company/
// @access  Public

const getCompany = asyncHandler(async (req, res) => {
  try {
    const companies = await Company.find({});

    res.status(201).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: 'Failed',
    });
  }
});

// @desc    Get all  Company Enteries
// @route   GET /api/company/entery/:id
// @access  Public

const getCompanyEnteries = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (company) {
    try {
      res.status(201).json({
        success: true,
        data: company,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: 'Failed',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: 'Company Not Found',
    });
  }
});

export { createCompany, createGeneralEntry, getCompany, getCompanyEnteries };
