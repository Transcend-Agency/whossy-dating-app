export const getYearFromFirebaseDate = (firebaseDate: {nanoseconds: number, seconds: number} | undefined) => {
    if (!firebaseDate || typeof firebaseDate.seconds !== 'number') {
        //   throw new Error('Invalid Firebase date object');
        return ''
    }
  
    // Convert seconds to milliseconds
    const milliseconds = firebaseDate.seconds * 1000;
  
    // Create a Date object
    const date = new Date(milliseconds);
  
    // Get the year
    return date.getFullYear();
  };