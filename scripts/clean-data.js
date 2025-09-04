const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Install required packages: npm install csv-parser csv-writer

async function cleanDCECEData() {
	const cleanRows = [];
	const inputFile = "../DC_PM25_SOCFF (2).csv";
	const outputFile = "../data/nursing_cutoffs_2025_cleaned.csv";

	console.log("🧹 Starting CSV cleaning process...");

	return new Promise((resolve, reject) => {
		fs.createReadStream(inputFile)
			.pipe(
				csv({
					skipLinesWithError: true,
					mapHeaders: ({ header }) => header.trim(),
				})
			)
			.on("data", (row) => {
				// Skip header rows and page indicators
				if (
					!row.INSTITUTE ||
					row.INSTITUTE.includes("COMBINED FIRST") ||
					row.INSTITUTE.includes("Page No") ||
					row.INSTITUTE.trim() === "" ||
					row.INSTITUTE.includes("INSTITUTE")
				) {
					return;
				}

				// Clean and validate institute name
				const institute = row.INSTITUTE.trim().replace(/"/g, "");
				if (!institute || institute.length < 10) {
					return;
				}

				// Extract branch (default to A.N.M. if not found)
				let branch = row.BRANCH || "A.N.M.";
				branch = branch.trim();
				if (!branch || branch === "") {
					branch = "A.N.M.";
				}

				// Extract category
				let category = row.CATEGORY || "UR";
				category = category.trim();

				// Validate category
				const validCategories = [
					"UR",
					"SC",
					"ST",
					"OBC",
					"EWS",
					"EBC",
					"RCG",
					"DQ",
					"BC",
				];
				if (!validCategories.includes(category)) {
					return;
				}

				// Extract ranks
				let openingRank = null;
				let closingRank = null;

				// Try different rank columns
				if (
					row["UR OPENING RANK"] &&
					!isNaN(parseInt(row["UR OPENING RANK"]))
				) {
					openingRank = parseInt(row["UR OPENING RANK"]);
				}

				if (
					row["UR CLOSING RANK"] &&
					!isNaN(parseInt(row["UR CLOSING RANK"]))
				) {
					closingRank = parseInt(row["UR CLOSING RANK"]);
				} else if (
					row["CAT CLOSING RANK"] &&
					!isNaN(parseInt(row["CAT CLOSING RANK"]))
				) {
					closingRank = parseInt(row["CAT CLOSING RANK"]);
				}

				// Must have closing rank
				if (!closingRank || closingRank <= 0) {
					return;
				}

				// Validate ranks
				if (openingRank && openingRank > closingRank) {
					openingRank = null; // Invalid data
				}

				cleanRows.push({
					year: 2025,
					institute: institute,
					branch: branch,
					category: category,
					opening_rank: openingRank,
					closing_rank: closingRank,
				});
			})
			.on("end", () => {
				console.log(`✅ Processed ${cleanRows.length} valid records`);

				// Remove duplicates
				const uniqueRows = cleanRows.filter(
					(row, index, self) =>
						index ===
						self.findIndex(
							(r) =>
								r.institute === row.institute &&
								r.branch === row.branch &&
								r.category === row.category
						)
				);

				console.log(
					`🔄 Removed ${cleanRows.length - uniqueRows.length} duplicates`
				);
				console.log(`📊 Final dataset: ${uniqueRows.length} records`);

				// Create output directory
				const outputDir = "../data";
				if (!fs.existsSync(outputDir)) {
					fs.mkdirSync(outputDir, { recursive: true });
				}

				// Write cleaned CSV
				const csvWriter = createCsvWriter({
					path: outputFile,
					header: [
						{ id: "year", title: "year" },
						{ id: "institute", title: "institute" },
						{ id: "branch", title: "branch" },
						{ id: "category", title: "category" },
						{ id: "opening_rank", title: "opening_rank" },
						{ id: "closing_rank", title: "closing_rank" },
					],
				});

				csvWriter
					.writeRecords(uniqueRows)
					.then(() => {
						console.log("✅ Cleaned CSV written to:", outputFile);

						// Print summary stats
						const stats = {
							total: uniqueRows.length,
							byBranch: {},
							byCategory: {},
							rankRange: {
								min: Math.min(...uniqueRows.map((r) => r.closing_rank)),
								max: Math.max(...uniqueRows.map((r) => r.closing_rank)),
							},
						};

						uniqueRows.forEach((row) => {
							stats.byBranch[row.branch] =
								(stats.byBranch[row.branch] || 0) + 1;
							stats.byCategory[row.category] =
								(stats.byCategory[row.category] || 0) + 1;
						});

						console.log("\n📈 Dataset Summary:");
						console.log("Total records:", stats.total);
						console.log("Branches:", JSON.stringify(stats.byBranch, null, 2));
						console.log(
							"Categories:",
							JSON.stringify(stats.byCategory, null, 2)
						);
						console.log(
							"Rank range:",
							`${stats.rankRange.min} - ${stats.rankRange.max}`
						);

						resolve(uniqueRows);
					})
					.catch(reject);
			})
			.on("error", reject);
	});
}

// Run if called directly
if (require.main === module) {
	cleanDCECEData()
		.then(() => {
			console.log("\n🎉 Data cleaning completed successfully!");
			console.log("\n📋 Next steps:");
			console.log("1. Upload the cleaned CSV to Supabase");
			console.log("2. Create the nursing_cutoffs table");
			console.log("3. Update your .env with Supabase credentials");
		})
		.catch(console.error);
}

module.exports = { cleanDCECEData };
