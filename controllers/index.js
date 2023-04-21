// Displays name when home route is requested
const displayName = (req, res, next) =>{
    res.send('Dylan Solorio');
};

module.exports = { displayName };