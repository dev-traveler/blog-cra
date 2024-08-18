import { createContext, PropsWithChildren, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'light',
  );

  const toggleTheme = () => {
    setTheme((prev) => {
      let nextTheme;

      if (prev === 'light') nextTheme = 'dark';
      else nextTheme = 'light';

      window.localStorage.setItem('theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
