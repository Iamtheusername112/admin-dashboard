import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { 
  users, 
  organizations, 
  analyticsEvents, 
  posts, 
  notifications, 
  performanceMetrics,
  activities 
} from '@/lib/db/schema';
import { eq, desc, count, and, gte, sql } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';

export async function GET(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

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
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get total counts
    const [totalUsers, totalOrganizations, totalPosts, totalNotifications] = await Promise.all([
      db.select({ count: count() }).from(users).where(eq(users.isActive, true)),
      db.select({ count: count() }).from(organizations).where(eq(organizations.isActive, true)),
      db.select({ count: count() }).from(posts),
      db.select({ count: count() }).from(notifications).where(eq(notifications.isRead, false)),
    ]);

    // Get recent activity
    const recentActivities = await db
      .select({
        id: activities.id,
        action: activities.action,
        entityType: activities.entityType,
        description: activities.description,
        createdAt: activities.createdAt,
        user: {
          firstName: users.firstName,
          lastName: users.lastName,
          imageUrl: users.imageUrl,
        },
      })
      .from(activities)
      .leftJoin(users, eq(activities.userId, users.id))
      .orderBy(desc(activities.createdAt))
      .limit(10);

    // Get revenue data (mock data for now)
    const revenueData = [
      { month: 'Jan', revenue: 45000, users: 1200, growth: 12 },
      { month: 'Feb', revenue: 52000, users: 1350, growth: 15 },
      { month: 'Mar', revenue: 48000, users: 1280, growth: 8 },
      { month: 'Apr', revenue: 61000, users: 1520, growth: 18 },
      { month: 'May', revenue: 55000, users: 1400, growth: 10 },
      { month: 'Jun', revenue: 67000, users: 1680, growth: 22 },
      { month: 'Jul', revenue: 72000, users: 1800, growth: 25 },
      { month: 'Aug', revenue: 68000, users: 1720, growth: 20 },
    ];

    // Get user distribution
    const userDistribution = [
      { name: 'Enterprise', value: 45, color: '#3B82F6', users: 890 },
      { name: 'Professional', value: 30, color: '#10B981', users: 594 },
      { name: 'Starter', value: 20, color: '#F59E0B', users: 396 },
      { name: 'Free', value: 5, color: '#EF4444', users: 99 },
    ];

    // Get top customers (mock data)
    const topCustomers = [
      { name: "Acme Corp", revenue: 12500, growth: 15, status: "active" },
      { name: "TechStart Inc", revenue: 8900, growth: 8, status: "active" },
      { name: "Global Solutions", revenue: 15200, growth: 22, status: "active" },
      { name: "Innovate Labs", revenue: 6800, growth: -5, status: "warning" },
      { name: "Future Systems", revenue: 11200, growth: 18, status: "active" },
    ];

    // Get performance metrics
    const performanceData = await db
      .select({
        metricName: performanceMetrics.metricName,
        avgValue: sql`AVG(${performanceMetrics.metricValue})`,
        maxValue: sql`MAX(${performanceMetrics.metricValue})`,
        minValue: sql`MIN(${performanceMetrics.metricValue})`,
      })
      .from(performanceMetrics)
      .where(gte(performanceMetrics.timestamp, startDate))
      .groupBy(performanceMetrics.metricName);

    // Get system health
    const systemHealth = {
      uptime: 99.8,
      responseTime: 120,
      errorRate: 0.02,
      cpuUsage: 45,
      memoryUsage: 67,
      diskUsage: 23,
    };

    // Get recent posts
    const recentPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        status: posts.status,
        createdAt: posts.createdAt,
        author: {
          firstName: users.firstName,
          lastName: users.lastName,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt))
      .limit(5);

    return NextResponse.json({
      overview: {
        totalUsers: totalUsers[0].count,
        totalOrganizations: totalOrganizations[0].count,
        totalPosts: totalPosts[0].count,
        unreadNotifications: totalNotifications[0].count,
      },
      revenueData,
      userDistribution,
      topCustomers,
      performanceData,
      systemHealth,
      recentActivities,
      recentPosts,
      period,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
