require('dotenv').config();

module.exports.TZ = process.env.TZ || 'Asia/Ho_Chi_Minh'
module.exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'khobao';
module.exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

module.exports.VNP_CODE = process.env.VNP_CODE || ''
module.exports.VNP_SECRET = process.env.VNP_SECRET || ''
module.exports.VNP_URL = process.env.VNP_URL || ''
module.exports.VNP_API = process.env.VNP_API || ''
module.exports.VNP_RETURN_URL = process.env.VNP_RETURN_URL || ''
module.exports.APP_VNP_URL_STATUS = process.env.APP_VNP_URL_STATUS || ''
module.exports.GOOGLE_SECRET_KEY = process.env.GOOGLE_SECRET_KEY || ''
module.exports.GOOGLE_KEYS_URL = process.env.GOOGLE_KEYS_URL || ''
module.exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''





