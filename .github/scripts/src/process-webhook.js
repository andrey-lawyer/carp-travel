const payload = JSON.parse(process.argv[2] || '{}');
console.log('Received webhook payload:');
console.log(JSON.stringify(payload, null, 2));

// Process the Jira webhook payload here
