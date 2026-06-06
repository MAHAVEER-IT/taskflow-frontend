/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        secondary: {
          500: '#3B82F6',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        bg: {
          light: '#FAFAFA',
          lighter: '#F8F9FC',
        },
        text: {
          primary: '#111827',
          secondary: '#374151',
          tertiary: '#6B7280',
        },
      },
      borderRadius: {
        lg: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        gutter: '1.5rem',
      },
    },
  },
  plugins: [],
};
