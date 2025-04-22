import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET(request: Request) {
  const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
  return NextResponse.json(users);
}
