// Function to set data in localStorage
export const setItem = <T>(key: string, value: T): void => {
    try {
      const valueToStore = JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  };
  
  // Function to get data from localStorage
  export const getItem = <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      console.error('Error retrieving from localStorage', error);
      return null;
    }
  };
