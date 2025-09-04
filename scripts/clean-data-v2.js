const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function cleanDCECEData() {
	const cleanRows = [];
	const inputFile = "../DC_PM25_SOCFF (2).csv";
	const outputFile = "../data/nursing_cutoffs_2025_cleaned.csv";

	console.log("🧹 Starting CSV cleaning process...");

	return new Promise((resolve, reject) => {
		fs.createReadStream(inputFile)
			.pipe(
				csv({
					skipEmptyLines: true,
					skipLinesWithError: true,
				})
			)
			.on("data", (row) => {
				// Debug: show first few rows
				if (cleanRows.length < 3) {
					console.log("Debug row:", row);
				}

				// Get all column values to find the actual data
				const columns = Object.keys(row);

				// Find the institute column (first non-empty meaningful value)
				let institute = "";
				let branch = "";
				let category = "";
				let urOpeningRank = "";
				let urClosingRank = "";
				let catClosingRank = "";

				// Try to extract from the structured data
				if (
					row.INSTITUTE &&
					row.INSTITUTE.trim() &&
					!row.INSTITUTE.includes("COMBINED FIRST") &&
					!row.INSTITUTE.includes("Page No") &&
					!row.INSTITUTE.includes("INSTITUTE") &&
					row.INSTITUTE.length > 10
				) {
					institute = row.INSTITUTE.trim()
						.replace(/"/g, "")
						.replace(/\n/g, " ");
					branch = (row.BRANCH || "A.N.M.").trim();
					category = (row.CATEGORY || "UR").trim();
					urOpeningRank = row["UR OPENING RANK"] || "";
					urClosingRank = row["UR CLOSING RANK"] || "";
					catClosingRank = row["CAT CLOSING RANK"] || "";

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

					// Determine closing rank
					let closingRank = null;
					if (urClosingRank && !isNaN(parseInt(urClosingRank))) {
						closingRank = parseInt(urClosingRank);
					} else if (catClosingRank && !isNaN(parseInt(catClosingRank))) {
						closingRank = parseInt(catClosingRank);
					}

					// Must have closing rank
					if (!closingRank || closingRank <= 0) {
						return;
					}

					// Opening rank (optional)
					let openingRank = null;
					if (urOpeningRank && !isNaN(parseInt(urOpeningRank))) {
						openingRank = parseInt(urOpeningRank);
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

					if (cleanRows.length <= 5) {
						console.log(`Sample ${cleanRows.length}:`, {
							institute: institute.substring(0, 50) + "...",
							branch,
							category,
							closing_rank: closingRank,
						});
					}
				}
			})
			.on("end", () => {
				console.log(`✅ Processed ${cleanRows.length} valid records`);

				if (cleanRows.length === 0) {
					console.log("❌ No valid records found. Check the CSV structure.");
					reject(new Error("No valid records found"));
					return;
				}

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
