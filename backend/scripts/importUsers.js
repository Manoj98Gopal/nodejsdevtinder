// backend/scripts/importUsers.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Local MongoDB connection string
const LOCAL_URI = "mongodb://admin:password123@localhost:27017/devTinder?authSource=admin";

async function importUsers() {
    try {
        // Connect to local MongoDB
        console.log('Connecting to local MongoDB...');
        await mongoose.connect(LOCAL_URI);
        console.log('✅ Connected to local MongoDB');

        const db = mongoose.connection.db;
        
        // Read the JSON file
        const jsonFilePath = path.join(__dirname, '../staticData/user.json');
        console.log(`📖 Reading file: ${jsonFilePath}`);
        
        if (!fs.existsSync(jsonFilePath)) {
            throw new Error(`File not found: ${jsonFilePath}`);
        }

        const usersData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        console.log(`📊 Found ${usersData.length} users to import`);

        // Since _id is removed from JSON, MongoDB will auto-generate new ObjectIds
        // No need to process the users data - just use it directly
        console.log('ℹ️  Using auto-generated MongoDB ObjectIds for new users');

        // Check existing users count
        const existingUsersCount = await db.collection('users').countDocuments();
        console.log(`📊 Existing users in database: ${existingUsersCount}`);

        // Check for duplicate emails to avoid conflicts
        const existingEmails = await db.collection('users').distinct('email');
        const newEmails = usersData.map(user => user.email);
        const duplicates = newEmails.filter(email => existingEmails.includes(email));
        
        let usersToImport = usersData;
        
        if (duplicates.length > 0) {
            console.log(`⚠️  Found ${duplicates.length} duplicate emails:`, duplicates);
            console.log('ℹ️  These users will be skipped to avoid duplicates');
            
            // Filter out duplicates
            usersToImport = usersData.filter(user => !existingEmails.includes(user.email));
            
            console.log(`📥 Will import ${usersToImport.length} new users (skipped ${duplicates.length} duplicates)`);
        }

        // Insert users data (only if there are users to import)
        if (usersToImport.length > 0) {
            console.log('📥 Importing users...');
            const result = await db.collection('users').insertMany(usersToImport);
            
            console.log('✅ Import completed successfully!');
            console.log(`📈 Imported ${result.insertedCount} new users`);
            console.log('🆔 MongoDB automatically generated unique ObjectIds for all users');
        } else {
            console.log('ℹ️  No new users to import (all users already exist)');
        }
        
        // Show final statistics
        const finalUsersCount = await db.collection('users').countDocuments();
        console.log(`📊 Total users in database: ${finalUsersCount}`);
        console.log(`📈 Users added in this import: ${finalUsersCount - existingUsersCount}`);

        // Show example of newly imported user (if any were imported)
        if (finalUsersCount > existingUsersCount) {
            const newestUser = await db.collection('users').findOne({}, { sort: { createdAt: -1 } });
            console.log('👤 Example of imported user:');
            console.log(`   Name: ${newestUser.firstName} ${newestUser.lastName}`);
            console.log(`   Email: ${newestUser.email}`);
        }

    } catch (error) {
        console.error('❌ Import failed:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the import
importUsers();