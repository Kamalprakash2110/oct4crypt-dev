# oct4crypt - Cybersecurity Portfolio & Platform

A modern, premium cybersecurity-themed full-stack website built with Next.js, featuring secure authentication, role-based access control, and a stunning cyberpunk UI design.

## 🚀 Features

### 🔐 Authentication & Security
- **Role-Based Access Control** with three user roles:
  - **OWNER** (Kamal): Full admin access
  - **TEAM MEMBER**: Can create/edit content
  - **GUEST**: Public access only
- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Rate limiting on login endpoints
- Audit logging for all admin actions
- Input sanitization and validation

### 🎨 Design & UI
- **Cyberpunk Theme**: Dark backgrounds with neon green/cyan accents
- **Glassmorphism Effects**: Frosted glass cards with blur
- **Animated Elements**: Micro-animations and hover effects
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Modern Typography**: Futuristic fonts with clean readability

### 📱 Pages & Sections
- **Home**: Hero section with animated backgrounds
- **Apps**: Cyber-styled security tool cards
- **Projects**: Filterable project showcase
- **Blog**: Markdown-based blog system
- **About**: Professional bio and skills
- **Contact**: Secure contact form
- **Admin Dashboard**: User management and audit logs
- **Login**: Cyber-themed authentication page

### ⚙️ Tech Stack

#### Frontend
- **Next.js 15** with TypeScript
- **Tailwind CSS** with custom cyber theme
- **Framer Motion** for animations
- **React Icons** for UI elements
- **React Hot Toast** for notifications

#### Backend
- **Node.js** with Next.js API routes
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Joi** for input validation
- **Helmet** for security headers

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)

### 1. Clone and Install
```bash
git clone <repository-url>
cd oct4crypt
npm install
```

### 2. Environment Variables
Copy the example environment file and configure:
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oct4crypt?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Seed Admin User
Create the initial admin account:
```bash
npx ts-node src/scripts/seed-admin.ts
```

**Default Admin Credentials:**
- Email: `kamal@oct4crypt.com`
- Password: `admin123`

⚠️ **Important**: Change the default password after first login!

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
oct4crypt/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── admin/         # Admin-only endpoints
│   │   ├── admin/             # Admin dashboard page
│   │   ├── login/             # Login page
│   │   └── ...
│   ├── components/            # React components
│   │   ├── layout/           # Navbar, Footer
│   │   └── ui/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── middleware/           # Next.js middleware
│   ├── models/               # MongoDB models
│   └── scripts/              # Database scripts
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── README.md
```

## 🔐 Security Features

### Authentication
- JWT tokens stored in HTTP-only cookies
- Secure password hashing with bcrypt
- Role-based access control middleware
- Automatic token expiration

### API Security
- Input validation with Joi schemas
- Rate limiting on sensitive endpoints
- CORS configuration
- Security headers with Helmet

### Audit & Monitoring
- Comprehensive audit logging
- User activity tracking
- IP address and user agent logging
- Admin action monitoring

## 🎯 User Roles & Permissions

### OWNER (Kamal)
- ✅ Full admin dashboard access
- ✅ Create, edit, delete all content
- ✅ Manage team members
- ✅ View audit logs
- ✅ Change system settings

### TEAM MEMBER
- ✅ Login access
- ✅ Create and edit blogs
- ✅ Edit projects and apps
- ❌ Delete critical data
- ❌ Manage users
- ❌ Access admin dashboard

### GUEST
- ✅ View public pages
- ✅ Browse projects and blog
- ❌ Access admin areas
- ❌ Edit or create content

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Deploy the same Next.js application
2. Configure MongoDB connection
3. Set production environment variables

### Database (MongoDB Atlas)
1. Create a free MongoDB Atlas cluster
2. Configure network access
3. Get connection string and add to environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- 📧 Email: kamal@oct4crypt.com
- 🐛 Issues: Create an issue on GitHub
- 💬 Discussions: Join GitHub Discussions

---

**Built with ❤️ and ⚡ for the cybersecurity community**

*Think Secure. Build Smart.*
