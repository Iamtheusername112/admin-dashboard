# Admin Dashboard - B2B SaaS Platform

A powerful, modern admin dashboard built for B2B SaaS monitoring and management. This dashboard provides comprehensive analytics, user management, system monitoring, and configuration capabilities.

## 🚀 Features

### Core Functionality
- **Authentication & Authorization** - Secure login with Clerk
- **Real-time Analytics** - Comprehensive metrics and charts
- **User Management** - Complete CRUD operations for users and organizations
- **System Monitoring** - Real-time logs, performance metrics, and error tracking
- **Settings & Configuration** - Flexible platform configuration

### Technical Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Charts**: Recharts
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database
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

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Neon PostgreSQL Database
   DATABASE_URL=your_neon_database_url

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Generate database migrations
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Open Drizzle Studio (optional)
   npm run db:studio
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Dashboard Features

### Analytics Dashboard
- Revenue tracking and trends
- User activity metrics
- Page view analytics
- Real-time visitor monitoring
- Device and browser statistics

### User Management
- User listing with search and filters
- Role-based access control
- User profile management
- Organization management
- Invitation system

### System Monitoring
- Real-time system logs
- Performance metrics (CPU, Memory, Disk)
- Error tracking and alerting
- System health monitoring
- Log filtering and search

### Settings & Configuration
- General platform settings
- Security configuration
- Notification preferences
- API settings
- Database monitoring

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main tables:

- **users** - User accounts and profiles
- **organizations** - Organization/company data
- **organization_members** - User-organization relationships
- **analytics_events** - User activity tracking
- **system_logs** - Application and system logs
- **performance_metrics** - System performance data
- **api_keys** - API authentication keys
- **notifications** - User notifications
- **settings** - Platform configuration

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## 🎨 UI Components

The dashboard uses shadcn/ui components built on Radix UI primitives:

- **Layout**: Sidebar, Header, Cards
- **Forms**: Input, Select, Switch, Textarea
- **Data Display**: Tables, Charts, Badges
- **Navigation**: Dropdown menus, Tabs
- **Feedback**: Alerts, Notifications

## 🔐 Security Features

- **Authentication**: Secure login with Clerk
- **Authorization**: Role-based access control
- **Data Protection**: Encrypted sensitive data
- **API Security**: Rate limiting and CORS
- **Session Management**: Configurable timeouts

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Updates

Stay updated with the latest features and improvements by:
- Watching the repository
- Following release notes
- Checking the changelog

---

Built with ❤️ for modern B2B SaaS platforms