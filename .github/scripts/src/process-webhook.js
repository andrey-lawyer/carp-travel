try {
    console.log("process.argv[2]", process.argv[2]);

    const raw = process.argv[2] || '{}';
    const payload = JSON.parse(raw);
    console.log('✅ Received webhook payload:');
    console.log(JSON.stringify(payload, null, 2));
} catch (e) {
    console.error('❌ Failed to parse payload:', e.message);
    console.error('Raw input:', process.argv[2]);
    process.exit(1);
}

// Process the Jira webhook payload here
