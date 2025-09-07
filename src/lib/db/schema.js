import { pgTable, text, timestamp, uuid, integer, boolean, json, varchar, decimal } from 'drizzle-orm/pg-core';

// Users table (extends Clerk user data)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  role: text('role', { enum: ['admin', 'manager', 'user'] }).default('user'),
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Organizations table
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  logo: text('logo'),
  website: text('website'),
  isActive: boolean('is_active').default(true),
  settings: json('settings'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Organization members
export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: text('role', { enum: ['owner', 'admin', 'member'] }).default('member'),
  joinedAt: timestamp('joined_at').defaultNow(),
});

// Analytics events
export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  userId: uuid('user_id').references(() => users.id),
  eventType: text('event_type').notNull(),
  eventName: text('event_name').notNull(),
  properties: json('properties'),
  sessionId: text('session_id'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').defaultNow(),
});

// System logs
export const systemLogs = pgTable('system_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  level: text('level', { enum: ['debug', 'info', 'warn', 'error', 'fatal'] }).notNull(),
  message: text('message').notNull(),
  context: json('context'),
  userId: uuid('user_id').references(() => users.id),
  organizationId: uuid('organization_id').references(() => organizations.id),
  timestamp: timestamp('timestamp').defaultNow(),
});

// Performance metrics
export const performanceMetrics = pgTable('performance_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  metricName: text('metric_name').notNull(),
  metricValue: decimal('metric_value', { precision: 10, scale: 2 }).notNull(),
  unit: text('unit'),
  tags: json('tags'),
  timestamp: timestamp('timestamp').defaultNow(),
});

// API keys for external integrations
export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  keyHash: text('key_hash').notNull(),
  permissions: json('permissions'),
  isActive: boolean('is_active').default(true),
  lastUsedAt: timestamp('last_used_at'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type', { enum: ['info', 'success', 'warning', 'error'] }).default('info'),
  isRead: boolean('is_read').default(false),
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Settings
export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  key: text('key').notNull(),
  value: json('value').notNull(),
  description: text('description'),
  isPublic: boolean('is_public').default(false),
  updatedAt: timestamp('updated_at').defaultNow(),
});
