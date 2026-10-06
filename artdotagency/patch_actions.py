import sys

file = 'app/actions.ts'
with open(file, 'r') as f:
    content = f.read()

# Add console logs to generateStrategy
if 'console.log("1. Fetching grants from Supabase...");' not in content:
    content = content.replace(
        '  // 1. Fetch real grants from our Supabase database (Phase 1 of RAG)',
        '  console.log("[AI] Starting strategy generation...");\n  // 1. Fetch real grants from our Supabase database (Phase 1 of RAG)\n  console.log("[AI] 1. Fetching grants from Supabase...");'
    )
    
    content = content.replace(
        '  // 2. Save the new client (Organisation) to Supabase so we have a permanent record',
        '  console.log("[AI] 2. Saving client profile to Supabase...");\n  // 2. Save the new client (Organisation) to Supabase so we have a permanent record'
    )
    
    content = content.replace(
        '  // 4. Generate the customized strategy using OpenAI',
        '  console.log("[AI] 3. Calling OpenAI with prompt...");\n  // 4. Generate the customized strategy using OpenAI'
    )
    
    content = content.replace(
        '    const generatedData = JSON.parse(content);',
        '    const generatedData = JSON.parse(content);\n    console.log("[AI] 4. Received successful response from OpenAI.");'
    )
    
    content = content.replace(
        '    // 5. Permanently save the AI\'s generated output into our Database',
        '    console.log("[AI] 5. Saving generated strategy to Supabase...");\n    // 5. Permanently save the AI\'s generated output into our Database'
    )
    
    content = content.replace(
        '    // 6. Return the data to the frontend so it immediately renders',
        '    console.log("[AI] Done! Returning data to frontend.");\n    // 6. Return the data to the frontend so it immediately renders'
    )

with open(file, 'w') as f:
    f.write(content)

print("Logs added to actions.ts")
