const Apartment = require('../models/aprtment');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all apartments
// @route   GET /api/apartments
// @access  Public
const getApartments = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, rooms, available } = req.query;
  
  let query = {};
  
  if (category) {
    query.category = category;
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  
  if (rooms) {
    query.rooms = Number(rooms);
  }
  
  if (available) {
    query.available = available === 'true';
  }
  
  const apartments = await Apartment.find(query);
  res.json(apartments);
});

// @desc    Get single apartment
// @route   GET /api/apartments/:id
// @access  Public
const getApartment = asyncHandler(async (req, res) => {
  const apartment = await Apartment.findById(req.params.id);
  
  if (apartment) {
    res.json(apartment);
  } else {
    res.status(404);
    throw new Error('Apartment not found');
  }
});

// @desc    Create new apartment
// @route   POST /api/apartments
// @access  Private/Admin
const createApartment = asyncHandler(async (req, res) => {
  const apartment = new Apartment({
    title: 'Sample title',
    description: 'Sample description',
    location: 'Sample location',
    price: 0,
    consumption: 0,
    category: 'medium',
    ...req.body
  });

  const createdApartment = await apartment.save();
  res.status(201).json(createdApartment);
});

// @desc    Update apartment
// @route   PUT /api/apartments/:id
// @access  Private/Admin
const updateApartment = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    deposit,
    consumption,
    rooms,
    category,
    features,
    images,
    transportation,
    insurance,
    contact,
    available,
    internet
  } = req.body;

  const apartment = await Apartment.findById(req.params.id);

  if (apartment) {
    apartment.title = title || apartment.title;
    apartment.description = description || apartment.description;
    apartment.location = location || apartment.location;
    apartment.price = price || apartment.price;
    apartment.deposit = deposit !== undefined ? deposit : apartment.deposit;
    apartment.consumption = consumption || apartment.consumption;
    apartment.rooms = rooms || apartment.rooms;
    apartment.category = category || apartment.category;
    apartment.features = features || apartment.features;
    apartment.images = images || apartment.images;
    apartment.transportation = transportation || apartment.transportation;
    apartment.insurance = insurance !== undefined ? insurance : apartment.insurance;
    apartment.contact = contact || apartment.contact;
    apartment.available = available !== undefined ? available : apartment.available;
    apartment.internet = internet !== undefined ? internet : apartment.internet;

    const updatedApartment = await apartment.save();
    res.json(updatedApartment);
  } else {
    res.status(404);
    throw new Error('Apartment not found');
  }
});

// @desc    Delete apartment
// @route   DELETE /api/apartments/:id
// @access  Private/Admin
const deleteApartment = asyncHandler(async (req, res) => {
  const apartment = await Apartment.findById(req.params.id);

  if (apartment) {
    await apartment.remove();
    res.json({ message: 'Apartment removed' });
  } else {
    res.status(404);
    throw new Error('Apartment not found');
  }
});

module.exports = {
  getApartments,
  getApartment,
  createApartment,
  updateApartment,
  deleteApartment
};
