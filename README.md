# MIFOTRA - RTB Registration System

A React-based frontend application for the Rwanda Technical Board (RTB) registration system under the Ministry of Public Service and Labour (MIFOTRA).

## 🚀 Features

- **🔍 ID Lookup**: Search for user information using National ID
- **📝 Multi-step Registration Form**: Complete 5-step registration process with validation
- **🔄 Redux State Management**: Centralized state management for form data
- **🎨 Material-UI Components**: Modern and responsive UI design
- **✅ Form Validation**: Comprehensive validation for all form fields
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **🌐 Multi-language Support**: Kinyarwanda and English labels

## 🛠️ Technology Stack

- **React 18**: Frontend framework
- **Redux Toolkit**: State management
- **Material-UI (MUI)**: UI component library
- **React Router**: Navigation
- **Day.js**: Date handling
- **CSS3**: Responsive styling

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git

## ⚡ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/rtb-registration-system.git
   cd rtb-registration-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── index.js                 # App entry point with providers
├── index.css               # Global responsive styles
├── app/
│   ├── App.jsx             # Main app component with routing
│   ├── components/         # Reusable components
│   │   ├── Header.jsx      # Navigation header with MIFOTRA-RTB branding
│   │   └── Footer.jsx      # Footer with contact information
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Home page with ID lookup functionality
│   │   └── Registration.jsx # Multi-step registration form
│   └── utils/
│       └── validation.js   # Form validation utilities
└── store/                  # Redux store configuration
    ├── store.js           # Store setup with reducers
    ├── common/            # Common state management
    │   ├── action-types.js # User data action types
    │   ├── actions.js     # User lookup actions
    │   ├── reducers.js    # User data reducers
    │   └── state.js       # Initial common state
    └── tvet/              # Registration-specific state
        ├── action-types.js # Registration action types
        ├── actions.js     # Registration form actions
        ├── reducers.js    # Form state reducers
        └── state.js       # Initial registration state
```

## 📱 Usage Guide

### 🔍 ID Lookup Feature
1. Navigate to the home page
2. Enter a 16-digit National ID in the search field
3. Click "Search" to retrieve user information
4. **Demo IDs for testing:**
   - `1234567890123456` (Jean Uwimana)
   - `9876543210987654` (Marie Mukamana)

### 📝 Registration Process
1. **Step 1**: Choose registration type
   - KWIGA IMYUGA (Learn Skills/Vocations)
   - GUSHAKIRWA AKAZI (Job Seeking)

2. **Step 2**: Personal Information
   - National ID (auto-filled if searched)
   - Full name, sex, date of birth
   - Phone number and email

3. **Step 3**: Location Details
   - Province → District → Sector → Cell → Village
   - Cascading dropdown selection

4. **Step 4**: Education & Skills
   - Education level selection
   - Primary skill (required)
   - Secondary and tertiary skills (optional)
   - Other technical skills (free text)

5. **Step 5**: Review & Submit
   - Complete form review
   - Final submission

### ✅ Form Validation Rules
- **National ID**: Exactly 16 digits
- **Age**: Must be between 16-30 years
- **Phone**: Valid Rwandan format (+250XXXXXXXXX)
- **Email**: Valid email format
- **Skills**: No duplicate selections allowed
- **Location**: All fields required in hierarchical order

## 🧪 Demo Data

### Test Users
| National ID | Name | DOB | Sex | Phone | Email |
|-------------|------|-----|-----|-------|-------|
| 1234567890123456 | Jean Uwimana | 1995-03-15 | Gabo | +250788123456 | jean.uwimana@example.com |
| 9876543210987654 | Marie Mukamana | 1998-07-22 | Gore | +250789654321 | marie.mukamana@example.com |

### Available Skills Categories
- **ICT**: Computer repair, CCTV installation, Game development
- **Construction**: Building construction, Carpentry, Plumbing
- **Agriculture**: Crop cultivation, Livestock farming, Beekeeping
- **Hospitality**: Culinary arts, Hotel services, Tourism
- **Automotive**: Vehicle repair, Motorcycle maintenance, Driving
- **Arts & Crafts**: Tailoring, Drawing, Music, Jewelry making
- **And many more...**

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm build` | Build for production |
| `npm test` | Run test suite |
| `npm eject` | Eject from Create React App |

## 🔧 Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test thoroughly
3. Update documentation if needed
4. Submit pull request

### API Integration
Replace mock functions in `src/store/common/actions.js` and `src/store/tvet/actions.js` with actual API endpoints.

## 📱 Mobile Responsiveness

- **Breakpoints**: xs (0-599px), sm (600-959px), md (960px+)
- **Touch-friendly**: 48px minimum button height
- **Adaptive layout**: Vertical stepper on mobile, horizontal on desktop
- **Optimized spacing**: Reduced margins and padding on small screens

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

**Ministry of Public Service and Labour (MIFOTRA)**
- **Address**: KG17 Ave, Kigali, Rwanda
- **Phone**: (+250)783558414
- **Email**: info@rtb.gov.rw

**Useful Links:**
- [Rwanda Polytechnic](https://rp.ac.rw/)
- [MINEDUC](https://mineduc.gov.rw/)
- [University of Rwanda](https://ur.ac.rw/)
- [E-Learning Platform](https://elearning.rtb.gov.rw/)
- [TVET Management Portal](https://portal.rtb.gov.rw/)

---

**© 2025 MIFOTRA - Rwanda Technical Board (RTB)**
