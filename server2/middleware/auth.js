const jwt = require('jsonwebtoken');
const policyFor = require('./casl');

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: 'unauthorized' });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'unauthorized' });
  }
}

// policies
function police_check(action, subject) {
  return function (req, res, next) {
    const policy = policyFor(req.user);
    if (!policy.can(action, subject)) {
      return res.status(403).json({ message: 'not allowed' });
    } else {
      next();
    }
  };
}

module.exports = { auth, police_check };
