import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Validate session
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }

    // Fetch user profile
    const userProfile = await db.select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (userProfile.length === 0) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(userProfile[0], { status: 200 });

  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Validate session
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Extract and validate updatable fields
    const updates: Record<string, any> = {};
    
    if (body.name !== undefined) {
      const trimmedName = body.name.trim();
      if (trimmedName === '') {
        return NextResponse.json(
          { 
            error: 'Name cannot be empty',
            code: 'INVALID_NAME' 
          },
          { status: 400 }
        );
      }
      updates.name = trimmedName;
    }

    if (body.role !== undefined) {
      updates.role = body.role.trim() || null;
    }

    if (body.location !== undefined) {
      updates.location = body.location.trim() || null;
    }

    if (body.website !== undefined) {
      const trimmedWebsite = body.website.trim();
      if (trimmedWebsite) {
        // Basic URL validation
        try {
          new URL(trimmedWebsite);
          updates.website = trimmedWebsite;
        } catch {
          return NextResponse.json(
            { 
              error: 'Invalid website URL format',
              code: 'INVALID_URL' 
            },
            { status: 400 }
          );
        }
      } else {
        updates.website = null;
      }
    }

    if (body.bio !== undefined) {
      updates.bio = body.bio.trim() || null;
    }

    // Validate at least one field is provided
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { 
          error: 'No fields provided to update',
          code: 'NO_FIELDS_PROVIDED' 
        },
        { status: 400 }
      );
    }

    // Always update updatedAt timestamp
    updates.updatedAt = new Date();

    // Update user profile
    const updatedUser = await db.update(user)
      .set(updates)
      .where(eq(user.id, session.user.id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser[0], { status: 200 });

  } catch (error) {
    console.error('PATCH /api/profile error:', error);
    
    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}