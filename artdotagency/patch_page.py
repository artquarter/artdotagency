import re

with open('app/portal/page.tsx', 'r') as f:
    content = f.read()

# Add import for generateStrategy
if 'import { generateStrategy } from "../actions"' not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { generateStrategy } from "../actions";')

# Add AI data state
state_code = """  const [aiData, setAiData] = useState(mockData);"""
if 'const [aiData, setAiData] = useState(mockData);' not in content:
    content = content.replace('const [hasResults, setHasResults] = useState(false);', 'const [hasResults, setHasResults] = useState(false);\n  const [aiData, setAiData] = useState(mockData);')

# Replace mockData.diagnostic with aiData.diagnostic, same for opportunities and plan
content = content.replace('mockData.diagnostic', 'aiData.diagnostic')
content = content.replace('mockData.opportunities', 'aiData.opportunities')
content = content.replace('mockData.plan', 'aiData.plan')

# Fix runDiagnostic logic
run_diagnostic_old = """  function runDiagnostic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    shouldFocus.current = true;
    if (Object.values(brief).some((value) => !value.trim())) {
      setEditing(true);
      return;
    }
    setEditing(false);
    setActiveTab("diagnostic");
    if (canReturn) {
      setView("dashboard");
      return;
    }
    setReviewedBrief({ ...brief });
    setHasResults(false);
    setLoadingStep(0);
    setView("processing");
  }"""

run_diagnostic_new = """  async function runDiagnostic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    shouldFocus.current = true;
    if (Object.values(brief).some((value) => !value.trim())) {
      setEditing(true);
      return;
    }
    setEditing(false);
    setActiveTab("diagnostic");
    if (canReturn) {
      setView("dashboard");
      return;
    }
    setReviewedBrief({ ...brief });
    setHasResults(false);
    setLoadingStep(0);
    setView("processing");
    
    try {
      const data = await generateStrategy(brief);
      setAiData((prev) => ({ ...prev, ...data }));
    } catch (e) {
      console.error(e);
      alert("Failed to connect to OpenAI.");
    }
  }"""

content = content.replace(run_diagnostic_old, run_diagnostic_new)

with open('app/portal/page.tsx', 'w') as f:
    f.write(content)

