# Weather Application

A test weather application built with Next.js and TypeScript that allows users to check current weather conditions and forecasts for any city worldwide.

## Features

- 🌍 Search weather for any city
- 🌡️ Temperature unit switching (Celsius/Fahrenheit)
- ⭐ Save favorite cities
- 📊 Detailed weather forecasts

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:**
  - [SCSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
  - [Bootstrap 5](https://getbootstrap.com/)
  - [Bootstrap Icons](https://icons.getbootstrap.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)
- **Fonts:** [Geist](https://vercel.com/font)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd [your-project-name]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```


3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── entities/            # Business logic entities
├── features/            # Feature-specific components
├── shared/              # Shared components and utilities
│   ├── api/            # API configuration and endpoints
│   ├── lib/            # Utility functions
│   ├── ui/             # Reusable UI components
│   └── types/          # TypeScript type definitions
```

## Key Features Implementation

### Weather Data Management

- Uses OpenWeatherMap API for real-time weather data
- Implements caching for better performance
- Handles API errors gracefully with toast notifications

### State Management

- Zustand store for managing:
  - Search results
  - Favorite cities
  - Temperature unit preferences
  - Current weather data

### UI/UX Features

- Responsive design using Bootstrap grid system
- Loading states and error handling
- Intuitive navigation
- Temperature unit switching

## Deployment

The application can be easily deployed on [Vercel](https://vercel.com/):

1. Push your code to a Git repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
