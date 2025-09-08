import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, organizations, organizationMembers } from '@/lib/db/schema';
import { eq, desc, count, and, or, like } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';

export async function GET(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [];
    if (search) {
      whereConditions.push(
        or(
          like(users.firstName, `%${search}%`),
          like(users.lastName, `%${search}%`),
          like(users.email, `%${search}%`)
        )
      );
    }
    if (role) {
      whereConditions.push(eq(users.role, role));
    }
    if (status) {
      whereConditions.push(eq(users.isActive, status === 'active'));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get users with pagination
    const usersData = await db
      .select({
        id: users.id,
        clerkId: users.clerkId,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        imageUrl: users.imageUrl,
        role: users.role,
        isActive: users.isActive,
        lastLoginAt: users.lastLoginAt,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(whereClause)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalCount = await db
      .select({ count: count() })
      .from(users)
      .where(whereClause);

    return NextResponse.json({
      users: usersData,
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        pages: Math.ceil(totalCount[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, firstName, lastName, role = 'user', organizationId } = body;

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        clerkId: `temp_${Date.now()}`, // This would be replaced with actual Clerk ID
        email,
        firstName,
        lastName,
        role,
        isActive: true,
      })
      .returning();

    // Add to organization if provided
    if (organizationId) {
      await db.insert(organizationMembers).values({
        organizationId,
        userId: newUser[0].id,
        role: 'member',
      });
    }

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
