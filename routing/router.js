var path = path || require('path')
module.exports = function (root, app) {
  console.log(root)
  app.get('/', function (req, res) {
    res.sendFile(path.join(root, "target/index.html"));
  });
  app.get('/bower_components/*', function (req, res) {
    res.sendFile(path.join(root, req.originalUrl));
  });
  app.get('/*', function (req, res) {
    console.log(req.originalUrl);
    res.sendFile(path.join(root, "target", req.originalUrl));
  });
}
