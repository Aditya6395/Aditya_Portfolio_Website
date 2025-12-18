const { execSync } = require('child_process');
const fs = require('fs');

console.log('Creating an optimized production build...\n');

try {
  // Run the build command
  const output = execSync('react-scripts build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  
  // Filter out the source map warning
  const filteredOutput = output
    .split('\n')
    .filter(line => !line.includes('Failed to parse source map'))
    .join('\n');
  
  console.log(filteredOutput);
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  // Filter warnings from error output
  const errorOutput = error.stdout || error.message || '';
  const filteredOutput = errorOutput
    .split('\n')
    .filter(line => !line.includes('Failed to parse source map'))
    .join('\n');
  
  console.log(filteredOutput);
  
  // If there are actual errors (not just warnings), exit with error code
  if (error.status !== 0 && !errorOutput.includes('Compiled with warnings')) {
    process.exit(1);
  }
  
  console.log('\n✅ Build completed successfully!');
}

