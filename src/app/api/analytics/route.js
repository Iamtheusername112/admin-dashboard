import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { analyticsEvents, performanceMetrics, users, organizations } from '@/lib/db/schema';
import { eq, desc, count, and, gte, lte, sql } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';

export async function GET(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    const organizationId = searchParams.get('organizationId');

    // Calculate date range
    const now = new Date();
    let startDate;
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Build where conditions
    let whereConditions = [gte(analyticsEvents.timestamp, startDate)];
    if (organizationId) {
      whereConditions.push(eq(analyticsEvents.organizationId, organizationId));
    }

    // Get event counts by type
    const eventCounts = await db
      .select({
        eventType: analyticsEvents.eventType,
        count: count(),
      })
      .from(analyticsEvents)
      .where(and(...whereConditions))
      .groupBy(analyticsEvents.eventType);

    // Get daily event trends
    const dailyTrends = await db
      .select({
        date: sql`DATE(${analyticsEvents.timestamp})`,
        count: count(),
      })
      .from(analyticsEvents)
      .where(and(...whereConditions))
      .groupBy(sql`DATE(${analyticsEvents.timestamp})`)
      .orderBy(sql`DATE(${analyticsEvents.timestamp})`);

    // Get top events
    const topEvents = await db
      .select({
        eventName: analyticsEvents.eventName,
        count: count(),
      })
      .from(analyticsEvents)
      .where(and(...whereConditions))
      .groupBy(analyticsEvents.eventName)
      .orderBy(desc(count()))
      .limit(10);

    // Get performance metrics
    const performanceData = await db
      .select({
        metricName: performanceMetrics.metricName,
        avgValue: sql`AVG(${performanceMetrics.metricValue})`,
        maxValue: sql`MAX(${performanceMetrics.metricValue})`,
        minValue: sql`MIN(${performanceMetrics.metricValue})`,
      })
      .from(performanceMetrics)
      .where(
        and(
          gte(performanceMetrics.timestamp, startDate),
          organizationId ? eq(performanceMetrics.organizationId, organizationId) : undefined
        )
      )
      .groupBy(performanceMetrics.metricName);

    // Get user activity
    const userActivity = await db
      .select({
        userId: analyticsEvents.userId,
        eventCount: count(),
        lastActivity: sql`MAX(${analyticsEvents.timestamp})`,
      })
      .from(analyticsEvents)
      .where(and(...whereConditions))
      .groupBy(analyticsEvents.userId)
      .orderBy(desc(count()))
      .limit(10);

    return NextResponse.json({
      period,
      startDate,
      endDate: now,
      eventCounts,
      dailyTrends,
      topEvents,
      performanceData,
      userActivity,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
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
    const { eventType, eventName, properties, organizationId } = body;

    const newEvent = await db
      .insert(analyticsEvents)
      .values({
        userId,
        organizationId,
        eventType,
        eventName,
        properties,
        timestamp: new Date(),
      })
      .returning();

    return NextResponse.json(newEvent[0], { status: 201 });
  } catch (error) {
    console.error('Error creating analytics event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
