const ImportJob = require("../models/ImportJob");

async function createJob(jobId, label) {
  return ImportJob.create({ _id: jobId, label });
}

async function updateJob(jobId, fields) {
  return ImportJob.updateOne({ _id: jobId }, { $set: fields });
}

async function findJob(jobId) {
  return ImportJob.findById(jobId).lean();
}

module.exports = { createJob, updateJob, findJob };
