
const router = require('express').Router();
const dataControl = require('./dataControl');

// security
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://theriake.us.auth0.com/.well-known/jwks.json`
    }),

    audience: 'https://covid.kevintheriault.tech',
    issuer: `https://theriake.us.auth0.com/`,
    algorithms: ['RS256']
  });

// Set default API response
router.get('/', (dataControl.index))

// ADMIN REQUIRES AUTHENTICATION
router.route('/admin')
    .get(checkJwt, dataControl.admin)
    .post(checkJwt, dataControl.new)

router.route('/admin/:date')
    .delete(checkJwt, dataControl.delete)
    .patch(checkJwt, dataControl.update)

    // Get specific location data
router.route('/:location')
    .get(dataControl.view)


// Export API routes
module.exports = router;