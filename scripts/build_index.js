const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = path.join(__dirname, '..', 'scripts');
const OUTPUT_FILE = path.join(__dirname, '..', 'index.json');
const BASE_RAW_URL = 'https://raw.githubusercontent.com/chngysmine/script-automator-community-gallery/main';

function buildIndex() {
  const index = [];

  // Allowed categories
  const categories = fs.readdirSync(SCRIPTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(SCRIPTS_DIR, category);
    const scripts = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const scriptFolder of scripts) {
      const metadataPath = path.join(categoryPath, scriptFolder, 'metadata.json');
      const scriptFilePath = path.join(categoryPath, scriptFolder, `${scriptFolder}.js`);

      if (fs.existsSync(metadataPath) && fs.existsSync(scriptFilePath)) {
        try {
          const rawMetadata = fs.readFileSync(metadataPath, 'utf8');
          const metadata = JSON.parse(rawMetadata);
          
          // Generate scriptUrl instead of embedding content
          // The app will lazy-load the actual code when user clicks preview/install
          metadata.scriptUrl = `${BASE_RAW_URL}/scripts/${category}/${scriptFolder}/${scriptFolder}.js`;
          
          index.push(metadata);
          console.log(`✅ Indexed: ${metadata.id} (${category})`);
        } catch (e) {
          console.error(`❌ Failed to parse metadata manually: ${metadataPath}`, e);
        }
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`\n🎉 Successfully built index.json with ${index.length} scripts.`);
}

buildIndex();
