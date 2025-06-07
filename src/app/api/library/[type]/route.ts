import { NextResponse } from "next/server";
import { loadLibraryFiles } from '@/utils/library-loader';

export async function GET(
  request: Request,
  context: any
) {
  try {
    // Map the URL parameter to the correct type
    const typeMap: Record<string, 'character' | 'background' | 'property' | 'artstyle'> = {
      'characters': 'character',
      'backgrounds': 'background',
      'properties': 'property',
      'artstyles': 'artstyle'
    };

    // Get the type parameter from the URL (await context.params)
    const { type: typeParam } = await context.params;
    const type = typeMap[typeParam];
    
    if (!type) {
      return NextResponse.json(
        { error: "Invalid library type" },
        { status: 400 }
      );
    }

    const items = await loadLibraryFiles(type);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error loading library items:", error);
    return NextResponse.json(
      { error: "Failed to load library items" },
      { status: 500 }
    );
  }
} 