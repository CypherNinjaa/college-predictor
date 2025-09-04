const Database = require("better-sqlite3");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

async function createSQLiteDatabase() {
	console.log("🗃️ Creating SQLite database...");

	// Create database file
	const dbPath = path.join(__dirname, "../data/nursing_colleges.db");
	const db = new Database(dbPath);

	// Create table
	const createTableSQL = `
    CREATE TABLE IF NOT EXISTS nursing_cutoffs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      institute TEXT NOT NULL,
      branch TEXT NOT NULL,
      category TEXT NOT NULL,
      opening_rank INTEGER,
      closing_rank INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

	db.exec(createTableSQL);

	// Create indexes for better performance
	const indexes = [
		"CREATE INDEX IF NOT EXISTS idx_category ON nursing_cutoffs(category)",
		"CREATE INDEX IF NOT EXISTS idx_closing_rank ON nursing_cutoffs(closing_rank)",
		"CREATE INDEX IF NOT EXISTS idx_branch ON nursing_cutoffs(branch)",
		"CREATE INDEX IF NOT EXISTS idx_institute ON nursing_cutoffs(institute)",
	];

	indexes.forEach((indexSQL) => db.exec(indexSQL));

	console.log("✅ Database table and indexes created");

	// Prepare insert statement
	const insertStmt = db.prepare(`
    INSERT INTO nursing_cutoffs 
    (year, institute, branch, category, opening_rank, closing_rank)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

	// Read CSV and insert data
	const csvPath = path.join(
		__dirname,
		"../data/nursing_cutoffs_2025_cleaned.csv"
	);
	const records = [];

	return new Promise((resolve, reject) => {
		fs.createReadStream(csvPath)
			.pipe(csv())
			.on("data", (row) => {
				const openingRank =
					row.opening_rank && row.opening_rank !== ""
						? parseInt(row.opening_rank)
						: null;
				const closingRank = parseInt(row.closing_rank);

				if (closingRank && closingRank > 0) {
					records.push([
						parseInt(row.year),
						row.institute,
						row.branch,
						row.category,
						openingRank,
						closingRank,
					]);
				}
			})
			.on("end", () => {
				console.log(`📊 Inserting ${records.length} records...`);

				// Insert all records in a transaction for better performance
				const insertMany = db.transaction((records) => {
					for (const record of records) {
						insertStmt.run(...record);
					}
				});

				try {
					insertMany(records);

					// Get statistics
					const stats = {
						total: db
							.prepare("SELECT COUNT(*) as count FROM nursing_cutoffs")
							.get().count,
						byBranch: db
							.prepare(
								`
              SELECT branch, COUNT(*) as count 
              FROM nursing_cutoffs 
              GROUP BY branch 
              ORDER BY count DESC
            `
							)
							.all(),
						byCategory: db
							.prepare(
								`
              SELECT category, COUNT(*) as count 
              FROM nursing_cutoffs 
              GROUP BY category 
              ORDER BY count DESC
            `
							)
							.all(),
						rankRange: db
							.prepare(
								`
              SELECT MIN(closing_rank) as min_rank, MAX(closing_rank) as max_rank 
              FROM nursing_cutoffs
            `
							)
							.get(),
					};

					console.log("\n📈 Database Statistics:");
					console.log(`Total records: ${stats.total}`);
					console.log("\nBy Branch:");
					stats.byBranch.forEach((row) =>
						console.log(`  ${row.branch}: ${row.count}`)
					);
					console.log("\nBy Category:");
					stats.byCategory.forEach((row) =>
						console.log(`  ${row.category}: ${row.count}`)
					);
					console.log(
						`\nRank Range: ${stats.rankRange.min_rank} - ${stats.rankRange.max_rank}`
					);

					console.log(
						`\n✅ SQLite database created successfully at: ${dbPath}`
					);
					console.log(
						`📁 Database size: ${(fs.statSync(dbPath).size / 1024).toFixed(
							2
						)} KB`
					);

					db.close();
					resolve(stats);
				} catch (error) {
					db.close();
					reject(error);
				}
			})
			.on("error", reject);
	});
}

// Run if called directly
if (require.main === module) {
	createSQLiteDatabase()
		.then(() => {
			console.log("\n🎉 SQLite setup completed successfully!");
			console.log("\n📋 Next steps:");
			console.log("1. Update API to use SQLite instead of Supabase");
			console.log("2. Remove Supabase environment variables");
			console.log("3. Test the application");
		})
		.catch(console.error);
}

module.exports = { createSQLiteDatabase };
