# Admin Dashboard

A comprehensive, full-stack admin dashboard built with Next.js 15, Clerk authentication, and PostgreSQL. This dashboard provides complete functionality for user management, analytics, content management, system monitoring, and more.

## 🚀 Features

### Core Functionality
- **User Management**: Complete CRUD operations for users with role-based access control
- **Analytics Dashboard**: Real-time metrics, charts, and performance data
- **Content Management**: Posts, pages, media, and comments management
- **System Monitoring**: Real-time system health, logs, and performance metrics
- **Notifications**: Real-time notification system with multiple channels
- **Settings**: Comprehensive settings management for all aspects of the system

### Technical Features
- **Authentication**: Secure authentication with Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time Data**: Live updates and real-time metrics
- **Responsive Design**: Mobile-first, responsive design
- **Dark Mode**: Full dark mode support
- **API Routes**: RESTful API with comprehensive endpoints
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **Charts**: Recharts
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── users/             # User management API
│   │   ├── posts/             # Content management API
│   │   ├── analytics/         # Analytics API
│   │   ├── notifications/     # Notifications API
│   │   └── dashboard/         # Dashboard data API
│   ├── dashboard/             # Dashboard pages
│   │   ├── users/            # User management page
│   │   ├── content/          # Content management page
│   │   ├── monitoring/       # System monitoring page
│   │   └── settings/         # Settings page
│   └── sign-in/              # Authentication pages
├── components/
│   ├── dashboard/            # Dashboard components
│   │   ├── header.jsx        # Top navigation
│   │   └── sidebar.jsx       # Side navigation
│   └── ui/                   # Reusable UI components
└── lib/
    ├── db/                   # Database configuration
    │   ├── index.js          # Database connection
    │   └── schema.js         # Database schema
    └── utils.js              # Utility functions
```

## 🗄️ Database Schema

The dashboard includes a comprehensive database schema with the following tables:

- **users**: User accounts and profiles
- **organizations**: Organization management
- **organizationMembers**: User-organization relationships
- **posts**: Blog posts and articles
- **pages**: Static pages
- **media**: File uploads and media management
- **comments**: Comments on posts and pages
- **analyticsEvents**: User activity tracking
- **systemLogs**: System event logging
- **performanceMetrics**: Performance monitoring data
- **notifications**: User notifications
- **subscriptions**: Billing and subscription management
- **invoices**: Billing invoices
- **activities**: Activity feed
- **settings**: System configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Dashboard Pages

### 1. Analytics Dashboard (`/dashboard`)
- Real-time metrics and KPIs
- Revenue analytics with interactive charts
- User distribution and growth metrics
- System health monitoring
- Recent activity feed

### 2. User Management (`/dashboard/users`)
- User listing with search and filters
- User creation, editing, and deletion
- Role management (Admin, Manager, User)
- User activity tracking
- Bulk operations

### 3. Content Management (`/dashboard/content`)
- Posts management (CRUD operations)
- Pages management
- Media library
- Comments moderation
- Content analytics

### 4. System Monitoring (`/dashboard/monitoring`)
- Real-time system health metrics
- Performance monitoring
- System logs and alerts
- Resource utilization
- Network status

### 5. Settings (`/dashboard/settings`)
- General application settings
- User profile management
- Security settings (2FA, API keys)
- Notification preferences
- Billing and subscription management

## 🔌 API Endpoints

### Users API
- `GET /api/users` - List users with pagination and filters
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Content API
- `GET /api/posts` - List posts with pagination
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get post details
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Analytics API
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Track analytics event

### Notifications API
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications` - Mark notifications as read

### Dashboard API
- `GET /api/dashboard` - Get dashboard overview data

## 🎨 Customization

### Themes
The dashboard supports light and dark themes with system preference detection.

### Styling
Built with Tailwind CSS for easy customization. All components use CSS variables for consistent theming.

### Components
Modular component architecture allows for easy customization and extension.

## 🔒 Security

- **Authentication**: Secure authentication with Clerk
- **Authorization**: Role-based access control
- **API Security**: Protected API routes with authentication
- **Data Validation**: Input validation and sanitization
- **SQL Injection**: Protected with Drizzle ORM

## 📈 Performance

- **Server-Side Rendering**: Fast initial page loads
- **Client-Side Navigation**: Smooth page transitions
- **Optimized Images**: Next.js image optimization
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: Strategic caching for improved performance

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The dashboard can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@example.com or join our Slack channel.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication
- [Drizzle](https://orm.drizzle.team/) for database management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons