
const router = require('express').Router();
const dataControl = require('./dataControl');

// security using AUTH0
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

// ADMIN REQUIRES AUTHENTICATION (calls auth0 function checkJwt)
router.route('/admin')
    .get(dataControl.admin)

router.route('/admin/post')
    .post(checkJwt, dataControl.new)

// ADMIN REQUIRES AUTHENTICATION -- specific items by day
router.route('/admin/:date')
    .delete(checkJwt, dataControl.delete)
    .patch(checkJwt, dataControl.update)

    // Get specific location data
router.route('/:location')
    .get(dataControl.view)


// Export API routes
module.exports = router;
