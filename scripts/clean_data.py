#!/usr/bin/env python3
import csv
import os

def clean_dcece_data():
    print("🧹 Starting CSV cleaning process...")
    
    input_file = "../DC_PM25_SOCFF (2).csv"
    output_file = "../data/nursing_cutoffs_2025_cleaned.csv"
    
    clean_rows = []
    
    # Create data directory if it doesn't exist
    os.makedirs("../data", exist_ok=True)
    
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as file:
        reader = csv.reader(file)
        
        # Skip header rows and find data start
        for i, row in enumerate(reader):
            if len(row) < 3:
                continue
                
            # Skip header and empty rows
            if (i < 5 or 
                not row[0] or 
                'INSTITUTE' in str(row[0]) or 
                'COMBINED' in str(row[0]) or 
                'Page No' in str(row)):
                continue
            
            institute = row[0].strip().replace('"', '').replace('\n', ' ')
            
            # Skip if not a valid institute name
            if (len(institute) < 10 or 
                'INSTITUTE' in institute or
                institute.startswith(',')):
                continue
            
            # Extract data from row
            try:
                branch = row[2].strip() if len(row) > 2 and row[2] else "A.N.M."
                category = row[3].strip() if len(row) > 3 and row[3] else "UR"
                
                # Get ranks
                ur_opening = row[4] if len(row) > 4 else ""
                ur_closing = row[5] if len(row) > 5 else ""
                cat_closing = row[8] if len(row) > 8 else ""
                
                # Validate category
                valid_categories = ['UR', 'SC', 'ST', 'OBC', 'EWS', 'EBC', 'RCG', 'DQ', 'BC']
                if category not in valid_categories:
                    continue
                
                # Determine closing rank
                closing_rank = None
                if ur_closing and ur_closing.isdigit():
                    closing_rank = int(ur_closing)
                elif cat_closing and cat_closing.isdigit():
                    closing_rank = int(cat_closing)
                
                if not closing_rank or closing_rank <= 0:
                    continue
                
                # Opening rank (optional)
                opening_rank = None
                if ur_opening and ur_opening.isdigit():
                    opening_rank = int(ur_opening)
                    # Validate opening rank
                    if opening_rank > closing_rank:
                        opening_rank = None
                
                clean_record = {
                    'year': 2025,
                    'institute': institute,
                    'branch': branch,
                    'category': category,
                    'opening_rank': opening_rank or '',
                    'closing_rank': closing_rank
                }
                
                clean_rows.append(clean_record)
                
                # Show first few samples
                if len(clean_rows) <= 5:
                    print(f"Sample {len(clean_rows)}: {institute[:50]}... | {branch} | {category} | {closing_rank}")
                    
            except (ValueError, IndexError) as e:
                continue
    
    print(f"✅ Processed {len(clean_rows)} valid records")
    
    # Remove duplicates
    unique_rows = []
    seen = set()
    for row in clean_rows:
        key = (row['institute'], row['branch'], row['category'])
        if key not in seen:
            seen.add(key)
            unique_rows.append(row)
    
    print(f"🔄 Removed {len(clean_rows) - len(unique_rows)} duplicates")
    print(f"📊 Final dataset: {len(unique_rows)} records")
    
    # Write cleaned CSV
    with open(output_file, 'w', newline='', encoding='utf-8') as file:
        fieldnames = ['year', 'institute', 'branch', 'category', 'opening_rank', 'closing_rank']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        writer.writeheader()
        writer.writerows(unique_rows)
    
    print(f"✅ Cleaned CSV written to: {output_file}")
    
    # Print summary stats
    stats = {
        'total': len(unique_rows),
        'by_branch': {},
        'by_category': {},
        'rank_range': {
            'min': min(row['closing_rank'] for row in unique_rows),
            'max': max(row['closing_rank'] for row in unique_rows)
        }
    }
    
    for row in unique_rows:
        branch = row['branch']
        category = row['category']
        stats['by_branch'][branch] = stats['by_branch'].get(branch, 0) + 1
        stats['by_category'][category] = stats['by_category'].get(category, 0) + 1
    
    print('\n📈 Dataset Summary:')
    print(f"Total records: {stats['total']}")
    print(f"Branches: {stats['by_branch']}")
    print(f"Categories: {stats['by_category']}")
    print(f"Rank range: {stats['rank_range']['min']} - {stats['rank_range']['max']}")
    
    return unique_rows

if __name__ == "__main__":
    try:
        clean_dcece_data()
        print('\n🎉 Data cleaning completed successfully!')
        print('\n📋 Next steps:')
        print('1. Upload the cleaned CSV to Supabase')
        print('2. Create the nursing_cutoffs table')
        print('3. Update your .env with Supabase credentials')
    except Exception as e:
        print(f"❌ Error: {e}")
