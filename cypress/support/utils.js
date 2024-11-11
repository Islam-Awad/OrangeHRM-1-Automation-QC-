export const generateRandomName = () =>{
   const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
   const firstNameLength = Math.floor(Math.random() * 2) + 5;
   // Generate random username
   let firstName = '';
   for (let i = 0; i < firstNameLength; i++) {
       firstName += chars[Math.floor(Math.random() * chars.length)];
   }
   return firstName;
}