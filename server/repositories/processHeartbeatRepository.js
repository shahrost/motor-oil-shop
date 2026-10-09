const ProcessHeartbeat = require("../models/ProcessHeartbeat");

async function saveHeartbeat(id, fields) {
  return ProcessHeartbeat.updateOne({ _id: id }, { $set: fields }, { upsert: true });
}

// آخرین نسخه‌ی دیگر پروسه (قبل از نسخه‌ی فعلی)
async function findPreviousHeartbeat(currentId) {
  return ProcessHeartbeat.findOne({ _id: { $ne: currentId } })
    .sort({ lastSeenAt: -1 })
    .lean();
}

module.exports = { saveHeartbeat, findPreviousHeartbeat };
