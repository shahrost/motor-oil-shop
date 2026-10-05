const vehicleRepository = require("../repositories/vehicleRepository");

async function getVehicles() {
  return vehicleRepository.getAllVehicles();
}

module.exports = { getVehicles };
