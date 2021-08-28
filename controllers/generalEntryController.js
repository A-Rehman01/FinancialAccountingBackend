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

// @desc    delete Entery from Company
// @route   DELETE /api/company/entery/:id
// @access  Public

const deleteEntery = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (company) {
    let { enteryid } = req.body;
    let filtersEntery = company.enteries.filter((obj) => obj._id != enteryid);
    company.enteries = filtersEntery;
    const updatedCompany = await company.save();
    res.status(200).json({
      success: true,
      message: 'Delete Entery SuccessFully',
      data: updatedCompany,
    });
  } else {
    console.log(error);
    res.status(400).json({
      success: false,
      error: 'Company Not Found',
    });
  }
});

// @desc    update Entery from Company
// @route   PUT /api/company/entery/:id
// @access  Public

const updateEntery = asyncHandler(async (req, res) => {
  const { amount, debit, credit, enteryid } = req.body;
  const company = await Company.findById(req.params.id);
  if (company) {
    // if (amount || debit || credit || enteryid) {
    //   let entry = { amount, debit, credit };
    let enteryIndex = company.enteries.findIndex((obj) => obj._id == enteryid);

    if (amount) {
      company.enteries[enteryIndex].amount = amount;
    }
    if (debit) {
      company.enteries[enteryIndex].debit = debit;
    }
    if (credit) {
      company.enteries[enteryIndex].credit = credit;
    }

    console.log(company.enteries[enteryIndex]);
    const updatedCompany = await company.save();
    res.status(200).json({
      success: true,
      message: 'Update Entery SuccessFully',
      data: updatedCompany,
    });
    // } else {
    //   res.status(400);
    //   throw new Error('Invalid credientials');
    // }
  } else {
    console.log(error);
    res.status(400);
    throw new Error('Company Not Found');
  }
});

export {
  createCompany,
  createGeneralEntry,
  getCompany,
  getCompanyEnteries,
  deleteEntery,
  updateEntery,
};
