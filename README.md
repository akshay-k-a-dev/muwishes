# Muswishes App

Muswishes is a sleek, modern application built with Svelte and TypeScript. It leverages the Gemini API for functionality and uses Firebase for storing and sharing messages. The app aims to deliver a seamless experience for users to send and receive heartfelt wishes in a beautifully designed interface.

## Features

- **Svelte Framework**: A lightweight and fast framework ensures a responsive UI.
- **TypeScript**: Ensures type safety and better developer experience.
- **Gemini API**: Powers the core functionality of message handling.
- **Firebase Integration**: Efficiently stores and shares messages.
- **Real-Time Updates**: Messages are updated and shared in real time using Firebase's powerful database capabilities.

## Technology Stack

- **Frontend**: Svelte, TypeScript
- **Backend**: Gemini API
- **Database & Hosting**: Firebase

## Live Demo

Check out the live version of Muswishes: [https://muwishes-clone.vercel.app/](https://muwishes-clone.vercel.app/)

## Installation

Follow these steps to set up the Muswishes app locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/muswishes.git
   cd muswishes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the app in action.

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. Enable Firestore Database for storing messages.
4. Add a web app to your Firebase project and copy the Firebase configuration.
5. Replace the placeholders in the `.env` file with your Firebase configuration.

## Gemini API Integration

1. Obtain an API key from the [Gemini API website](https://geminiapi.com/).
2. Add the API key to the `.env` file under `VITE_GEMINI_API_KEY`.

## Deployment

To deploy Muswishes:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

   Ensure you have the Firebase CLI installed and configured before deploying.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Svelte](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Gemini API](https://geminiapi.com/)

