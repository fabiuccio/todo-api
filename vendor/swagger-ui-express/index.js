const noopMiddleware = (_req, _res, next) => next();

function buildHtml(spec) {
  const encodedSpec = JSON.stringify(spec ?? {}).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Swagger UI</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.min.css"
    />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.min.js"></script>
    <script>
      window.onload = function () {
        SwaggerUIBundle({
          spec: ${encodedSpec},
          dom_id: '#swagger-ui'
        });
      };
    </script>
  </body>
</html>`;
}

function setup(swaggerDoc) {
  const html = buildHtml(swaggerDoc);

  return (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}

const swaggerUi = {
  serve: [noopMiddleware],
  setup
};

module.exports = swaggerUi;
module.exports.serve = swaggerUi.serve;
module.exports.setup = swaggerUi.setup;
