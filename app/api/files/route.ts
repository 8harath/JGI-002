import { NextRequest, NextResponse } from 'next/server';
import { scanSubjectDirectory, SubjectFiles } from '@/lib/file-scanner';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subjectSlug = searchParams.get('subject');
    const semester = searchParams.get('semester');

    if (!subjectSlug || !semester) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Map subject slugs to directory names
    let directoryPath = "";
    
    if (subjectSlug.startsWith('languages-')) {
      const language = subjectSlug.replace('languages-', '');
      const languageMap: { [key: string]: string } = {
        'hindi': 'Hindi',
        'kannada': 'Kannada',
        'sanskrit': 'Sanskrit'
      };
      const languageName = languageMap[language];
      if (languageName) {
        directoryPath = path.join(process.cwd(), 'public', 'Resources', semester, 'Languages', languageName);
      }
    } else {
      const subjectMap: { [key: string]: string } = {
        'fundamentals-of-computer-applications': 'Fundamentals of Computer Applications',
        'fundamentals-of-mathematics': 'Fundamentals of Mathematics',
        'general-english': 'General English',
        'mmhv': 'MMHV',
        'programming-in-c': 'Programming in C',
        'programming-in-c-lab': 'Programming in C Lab',
        'fundamentals-of-computer-application-lab': 'Fundamentals of Computer Application Lab'
      };
      
      const subjectName = subjectMap[subjectSlug];
      if (subjectName) {
        directoryPath = path.join(process.cwd(), 'public', 'Resources', semester, subjectName);
      }
    }

    if (!directoryPath) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    const subjectFiles = scanSubjectDirectory(directoryPath);
    
    return NextResponse.json(subjectFiles);
  } catch (error) {
    console.error('Error scanning files:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
