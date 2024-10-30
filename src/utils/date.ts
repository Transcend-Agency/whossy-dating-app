export const getYearFromFirebaseDate = (
    firebaseDate: { nanoseconds: number; seconds: number } | undefined | null
): number => {
    const milliseconds = firebaseDate!.seconds * 1000;
    const date = new Date(milliseconds);
    return date.getFullYear();
};
