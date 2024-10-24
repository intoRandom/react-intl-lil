<h1 align="center" style="font-size:24px; color:red">
  <br>
  <a href="https://github.com/intoRandom/react-intl-lil.git">
    react-intl-lil
  </a>
  <br>
  <br>
</h1>

The Easiest Static Internationalization for React and Next.js

## Features

Common internationalizations package have a problem, they are built with dynamic websites in mind.

- **Multi-Language Support 🎯**  
  Supports both single and multiple languages with easy configuration for updates.
- **Local Storage for User Preferences 🗳️**  
  Stores the user’s language preference in `localStorage` for persistence across sessions.
- **No Extra Server Configuration 🙅🏻**  
  Ideal for SPAs with zero need for additional server setup or configurations.
- **Easy Setup & Fast Deployment 🚀**  
  Quick to install and configure, ready to use in minutes.
- **Built with TypeScript 🔓**  
  Fully typed with TypeScript for enhanced development experience and type safety.

## What does it look like?

```jsx
// page.tsx
import { useLanguage, LangProvider } from 'react-intl-lil';
import { langConfig } from '@/config';

export default function Home() {
  const { gt, ga } = useLanguage();
  const ver = '1.1.0';

  return (
  <>
    <LangProvider langConfig={langConfig}>
      <h1>{gt('home.title')}</h1>
      <p>{gt('home.version', { version: ver })}</p>
      <ul>
        {ga('home.features').map((item) => (
          <li key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.data}</p>
          </li>
        ))}
      </ul>
    </LangProvider>
  );
}
```

```js
// en.ts
const data = {
  home: {
    title: 'Welcome to react-intl-lil',
    version: 'Current version: {{version}}',
    features:[
      {title:"Multi language", data:"Single and multi language support"}
      {title:"Local Storage", data:"For persistence across sessions"}
    ]
  },
};
```

## Docs and demos

Just remember the guides themselves are the demos, source code available.

- **[Next js](https://intorandom.github.io/react-intl-lil-next/)**
- **[React](https://github.com/intoRandom/react-intl-lil.git)**

## Donations

This package takes time and effort to maintain, and frequent blackouts in my country make it harder. Your support would help keep development going.

- **[Buy me a coffee](https://buymeacoffee.com/intorandom)**

Every contribution helps bring light to the project!
