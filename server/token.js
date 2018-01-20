const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const CSRF_TOKEN = process.env.CSRF_TOKEN || 'default-token';

module.exports = {
  GOOGLE_TRANSLATE_API_KEY,
  CSRF_TOKEN,
};
