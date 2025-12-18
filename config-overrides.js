// Webpack config override to suppress source map warnings from third-party dependencies
module.exports = function override(config, env) {
  // Modify webpack to ignore source map warnings from node_modules
  if (config.module && config.module.rules) {
    config.module.rules.forEach(rule => {
      if (rule.enforce === 'pre' && rule.use) {
        const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
        uses.forEach(use => {
          if (use && use.loader && use.loader.includes('source-map-loader')) {
            // Configure source-map-loader to ignore missing source maps
            use.options = use.options || {};
            // Ignore source maps for node_modules
            use.options.filterSourceMappingUrl = (url, resourcePath) => {
              // Skip source map processing for node_modules (especially @mediapipe)
              if (resourcePath && resourcePath.includes('node_modules')) {
                return false;
              }
              return true;
            };
          }
        });
      }
    });
  }
  
  // Also suppress webpack warnings about missing source maps
  if (config.ignoreWarnings) {
    config.ignoreWarnings = [
      ...config.ignoreWarnings,
      /Failed to parse source map/,
      /source-map-loader/
    ];
  } else {
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /source-map-loader/
    ];
  }
  
  return config;
};

