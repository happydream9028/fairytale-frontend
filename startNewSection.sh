#!/bin/bash

defaultPagesStartName="fairytale-"

echo "Starting up a new section...please answer all questions"

read -p "state the name of the section " sectionName

echo "Now lets create directories and files for "$sectionName" section"

mkdir /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/pages/$defaultPagesStartName$sectionName
cp /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/components/DefaultPagesIndex.tsx /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/pages/$defaultPagesStartName$sectionName/index.tsx
git add /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/pages/$defaultPagesStartName$sectionName
mkdir /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/components/$defaultPagesStartName$sectionName
cp /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/pages/pages/Blank.tsx /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/components/$defaultPagesStartName$sectionName/index.tsx
git add /Users/olaolu/Documents/GitHub/fairytale-dashboard/src/components/$defaultPagesStartName$sectionName
