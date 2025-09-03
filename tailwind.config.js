/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        card: '#ffffff',
        'card-foreground': '#0a0a0a',
        popover: '#ffffff',
        'popover-foreground': '#0a0a0a',
        primary: '#171717',
        'primary-foreground': '#fafafa',
        secondary: '#f5f5f5',
        'secondary-foreground': '#171717',
        muted: '#f5f5f5',
        'muted-foreground': '#737373',
        accent: '#f5f5f5',
        'accent-foreground': '#171717',
        destructive: '#ef4444',
        'destructive-foreground': '#fafafa',
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#0a0a0a',
        chart: {
          1: '#e67e22',
          2: '#2d8659',
          3: '#1e3a5f',
          4: '#f1c40f',
          5: '#e74c3c'
        },
        sidebar: {
          DEFAULT: '#f7f7f7',
          foreground: '#404040',
          primary: '#1a1a1a',
          'primary-foreground': '#fafafa',
          accent: '#f0f0f0',
          'accent-foreground': '#1a1a1a',
          border: '#d4d4d8',
          ring: '#3b82f6'
        },
        // Custom design system colors
        'primary-blue': {
          deep: '#1E3A8A',
          medium: '#3B82F6',
          light: '#93C5FD'
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280'
        },
        button: {
          blue: '#3B82F6'
        },
        'card-background': '#FFFFFF',
        'input-border': '#E5E7EB',
        placeholder: '#9CA3AF',
        'dropdown-border': '#D1D5DB'
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
        DEFAULT: '0.5rem'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'subheading': ['20px', { lineHeight: '1.5', fontWeight: '400' }],
        'card-title': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'button': ['14px', { lineHeight: '1.4', fontWeight: '500' }]
      },
      spacing: {
        'container': '640px',
        'card': '24px',
        'section': '48px',
        'input': '48px',
        'button': '40px'
      },
      maxWidth: {
        container: '640px'
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.1)',
        button: '0 2px 8px rgba(59, 130, 246, 0.3)',
        'input-box': '0 8px 32px rgba(0, 0, 0, 0.12)'
      },
      backdropBlur: {
        card: '10px'
      },
      backgroundColor: {
        'card-overlay': 'rgba(255, 255, 255, 0.95)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, #1E3A8A, #93C5FD)',
        'gradient-hero': 'linear-gradient(180deg, #1E3A8A 0%, #93C5FD 100%)'
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        DEFAULT: '200ms'
      }
    }
  },
  plugins: [
    require('nativewind/plugin'),
    // Add any additional plugins you need for React Native
    function({ addUtilities }) {
      addUtilities({
        '.container': {
          maxWidth: '640px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px'
        }
      })
    }
  ]
}