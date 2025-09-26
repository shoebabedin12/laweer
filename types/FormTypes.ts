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
    confirm_password?: string;
}
// ✅ Type for message state
export type MessageState = {
  type: 'success' | 'error';
  text: string;
} | null;

export type FormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined