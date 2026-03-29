#!/bin/bash
set -euo pipefail

if ! command -v npm &> /dev/null; then
    echo "Error: NPM is not installed."
    exit 1
fi

if [ -f package.json ]; then
    echo "Error: package.json already exists. Exiting..."
    exit 1
fi

# Initialize the npm project
npm init -y && \
npm install -D @playwright/test jest @biomejs/biome && \
npm pkg set scripts.test="jest && playwright test" \
            scripts.backpressure="sh .github/scripts/backpressure.sh" \
            scripts.ralph="sh .github/scripts/ralph.sh" \
            scripts.lint="biome lint --write ." \
            scripts.format="biome format --write ." \
            engines.node=">=24.14.1" \
            engines.npm=">=11.11.0"

# Install the playwright dependencies
npx playwright install chromium

# Move the init PRD to the root
mv .prds/init.md PRD.md

# Self destruct
rm -- "${BASH_SOURCE[0]:-$0}"

# Instruct to run the first ralph loop, which should be the starting point for the project
echo "🚀 Done! Run 'npm run ralph' to start the initial loop."