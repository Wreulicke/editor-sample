var path=path||require('path')
module.exports = function (root, app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(root,"index.html"));
    });
    app.get('/*/*', function (req, res) {
        res.sendFile(path.join(root, req.originalUrl));
    });
}