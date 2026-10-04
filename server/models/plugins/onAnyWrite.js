// پلاگین mongoose: بعد از هر نوع نوشتن روی کالکشن (save، update، delete، bulkWrite و ...)
// تابع داده‌شده صدا زده می‌شه. برای باطل‌کردن کش‌ها استفاده می‌شه.
const QUERY_WRITES = [
  "updateOne",
  "updateMany",
  "findOneAndUpdate",
  "replaceOne",
  "deleteOne",
  "deleteMany",
  "findOneAndDelete",
  "findOneAndReplace",
];

function onAnyWrite(schema, { handler }) {
  const run = () => handler();

  schema.post("save", run);
  schema.post("insertMany", run);
  schema.post("bulkWrite", run);
  schema.post(QUERY_WRITES, { document: false, query: true }, run);
  schema.post("deleteOne", { document: true, query: false }, run);
}

module.exports = onAnyWrite;
