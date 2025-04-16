// Function to set data in localStorage
export const setItem = <T>(key: string, value: T): void => {
  try {
    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    console.error(`❌ Error saving "${key}" to localStorage:`, error);
  }
};

// Function to get data from localStorage
export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);

    // ✅ Validate parsed value is an array or object
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as T;
    }

    console.warn(`⚠️ Retrieved data for "${key}" is not valid JSON.`);
    return null;
  } catch (error) {
    console.error(`❌ Error retrieving "${key}" from localStorage:`, error);
    return null;
  }
};
