import fs from 'fs';
import path from 'path';

export type LibraryItem = {
  id: string;
  name: string;
  type: 'character' | 'background' | 'property' | 'artstyle';
  isPro: boolean;
  thumbnail: string;
  parameters: {
    description?: string;
    physical?: string;
    clothing?: string;
    category?: string;
    type?: string;
    createdAt?: string;
    [key: string]: string | string[] | boolean | number | undefined;
  };
};

export async function loadLibraryFiles(type: 'character' | 'background' | 'property' | 'artstyle'): Promise<LibraryItem[]> {
  try {
    // Map type to directory name
    const typeToDir: Record<string, string> = {
      'character': 'karakter',
      'background': 'background',
      'property': 'property',
      'artstyle': 'artstyle'
    };

    // Get the correct directory path
    const dirName = typeToDir[type];
    if (!dirName) {
      throw new Error(`Invalid library type: ${type}`);
    }

    // Construct the full path to the library directory
    const dirPath = path.join(process.cwd(), 'public', 'library', dirName);
    
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.warn(`Library directory not found: ${dirPath}`);
      return [];
    }

    // Read all JSON files in the directory
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));
    
    const items: LibraryItem[] = [];
    
    for (const file of files) {
      try {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const item = JSON.parse(content) as LibraryItem;
        
        // Validate required fields
        if (!item.id || !item.name || !item.type || !item.thumbnail) {
          console.warn(`Skipping invalid item in ${file}: missing required fields`);
          continue;
        }
        
        items.push(item);
      } catch (fileError) {
        console.error(`Error reading file ${file}:`, fileError);
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error loading library files for type ${type}:`, error);
    return [];
  }
} 