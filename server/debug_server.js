const fs = require('fs');

process.on('uncaughtException', (err) => {
    console.error('🔥 CRITIAL CRASH (Uncaught Exception):', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('🔥 CRITIAL CRASH (Unhandled Rejection):', reason);
    process.exit(1);
});

console.log("Starting server.js...");
try {
    require('./server.js');
} catch (error) {
    console.error("🔥 CRITICAL CRASH (Synchronous):", error);
}
