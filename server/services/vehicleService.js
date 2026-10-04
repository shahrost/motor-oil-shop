const Vehicle = require("../models/Vehicle");

async function getVehicles() {
  return Vehicle.find().sort({ sku: 1 });
}

module.exports = { getVehicles };
