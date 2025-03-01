
export function PhoneSanitize(){
    // Sanitize phone numbers to prevent common phone number formats
    const sanitizePhone = (phone: string): string | null => {

        phone = phone.replace(/\D/g, "");

        if(phone.length === 10){
            return phone;
        } else {
            return null; // Invalid phone number
        };
    };
    return{
        sanitizePhone,
    }
}