export type BookingFormProps = {
    name: string,
    email: string,
    preferredDate: string,
    timeSlot: string,
    additionalNotes: string,
}

export type FormProps = {
    name?: string;
    email: string;
    role?: string;
    password: string;
}
// ✅ Type for message state
export type MessageState = {
  type: 'success' | 'error';
  text: string;
} | null;