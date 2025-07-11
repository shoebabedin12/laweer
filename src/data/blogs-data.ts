export const blogData = [
    {
      "question": "What is useState and how does it work in React?",
      "answer": "useState is a React Hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it. When the update function is called, the component re-renders with the new state.",
      "date": "2023-11-12"
    },
    {
      "question": "What is the purpose of useEffect in React?",
      "answer": "useEffect is a Hook used for side effects in functional components. It runs after the component renders and can be used for tasks like data fetching, setting up subscriptions, or manually changing the DOM.",
      "date": "2023-11-13"
    },
    {
      "question": "What is a custom hook in React and when should you use one?",
      "answer": "A custom hook is a JavaScript function that uses other React hooks to encapsulate and reuse logic across components. Use custom hooks when you want to extract and reuse logic involving state or effects.",
      "date": "2023-11-14"
    },
    {
      "question": "Difference between controlled and uncontrolled components. Which one is better?",
      "answer": "Controlled components rely on React state for their form data, while uncontrolled components use refs to access DOM elements directly. Controlled components are preferred in most cases because they give you better control over form behavior and validation.",
      "date": "2023-11-15"
    },
    {
      "question": "Tell us something about useFormStatus() in React.",
      "answer": "useFormStatus is a hook used in React Server Components to check the status of a form submission. It helps manage form UI behavior such as showing loading indicators, error messages, or disabling buttons while submitting.",
      "date": "2023-11-16"
    }
  ]
  