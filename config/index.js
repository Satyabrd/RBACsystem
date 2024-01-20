require("dotenv").config();

const _getEnvOrElse = (
    key,
    getDefault,
  ) => {
    if (process.env[key] == null) {
      return getDefault.callback ? getDefault.callback() : getDefault.value;
    }
    return process.env[key];
};

const getEnvOrDefault = (key, defaultValue) =>
  _getEnvOrElse(key, { value: defaultValue });

const PORT = parseInt(getEnvOrDefault("PORT")) || 3000;
const MONGO_URL = getEnvOrDefault(
    "MONGO_URL",
    "mongodb://localhost:27017/test"
  )