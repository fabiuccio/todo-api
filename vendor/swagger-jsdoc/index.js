function swaggerJsdoc(options) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('swagger-jsdoc options must be an object');
  }

  const { definition } = options;

  if (!definition || typeof definition !== 'object') {
    throw new TypeError('swagger-jsdoc requires a definition object');
  }

  return { ...definition };
}

module.exports = swaggerJsdoc;
module.exports.default = swaggerJsdoc;
