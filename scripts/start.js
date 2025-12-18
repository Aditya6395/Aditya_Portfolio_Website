const { spawn } = require('child_process');

console.log('Starting the development server...\n');

// Prepare environment with suppressed deprecation warnings
const env = { ...process.env };
// Suppress Node.js deprecation warnings for webpack-dev-server
// These warnings are from react-scripts/webpack-dev-server and don't affect functionality
if (env.NODE_OPTIONS) {
  env.NODE_OPTIONS = env.NODE_OPTIONS + ' --no-deprecation';
} else {
  env.NODE_OPTIONS = '--no-deprecation';
}

// Disable source map warnings from third-party dependencies
env.GENERATE_SOURCEMAP = 'true';
env.WDS_SOCKET_HOST = 'localhost';
env.WDS_SOCKET_PATH = '/ws';
env.WDS_SOCKET_PORT = '0';

// Spawn react-app-rewired start (uses config-overrides.js) with filtered output
const child = spawn('react-app-rewired', ['start'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: env
});

// Buffer to handle multi-line warnings
let stdoutBuffer = '';
let stderrBuffer = '';

// Filter out source map warnings from stdout
child.stdout.on('data', (data) => {
  stdoutBuffer += data.toString();
  const lines = stdoutBuffer.split('\n');
  
  // Keep the last incomplete line in buffer
  stdoutBuffer = lines.pop() || '';
  
  const filtered = lines.filter(line => {
    const trimmed = line.trim();
    // Filter out source map warnings
    if (trimmed.includes('Failed to parse source map') || 
        trimmed.includes('vision_bundle_mjs.js.map') ||
        trimmed.includes('source-map-loader') ||
        trimmed.includes('Module Warning (from ./node_modules/source-map-loader') ||
        trimmed.includes('WARNING in ./node_modules/@mediapipe/tasks-vision')) {
      return false;
    }
    // Replace "Compiled with warnings" with "Compiled successfully" if only source map warnings
    if (trimmed.includes('Compiled with warnings')) {
      return true; // Keep it, but we'll check context
    }
    return true;
  });
  
  // Output filtered lines
  if (filtered.length > 0) {
    const output = filtered.join('\n') + (stdoutBuffer ? '\n' : '');
    process.stdout.write(output);
  }
});

// Filter out source map warnings from stderr
child.stderr.on('data', (data) => {
  stderrBuffer += data.toString();
  const lines = stderrBuffer.split('\n');
  
  // Keep the last incomplete line in buffer
  stderrBuffer = lines.pop() || '';
  
  const filtered = lines.filter(line => {
    const trimmed = line.trim();
    // Filter out source map warnings
    if (trimmed.includes('Failed to parse source map') || 
        trimmed.includes('vision_bundle_mjs.js.map') ||
        trimmed.includes('source-map-loader') ||
        trimmed.includes('Module Warning (from ./node_modules/source-map-loader') ||
        trimmed.includes('WARNING in ./node_modules/@mediapipe/tasks-vision')) {
      return false;
    }
    return true;
  });
  
  // Output filtered lines
  if (filtered.length > 0) {
    const output = filtered.join('\n') + (stderrBuffer ? '\n' : '');
    process.stderr.write(output);
  }
});

child.on('error', (error) => {
  console.error('Error starting development server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
  process.exit(0);
});

