  

  export function Sanitize(){
  // Sanitize inputs to prevent dangerous characters (basic SQL injection prevention)
  const sanitizeInput = (input: string) => {
    return input.replace(/['"\\;-]/g, ""); // Remove dangerous characters
  };

  return{
    sanitizeInput,
  }
}