const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB6J1WP4tIoNGa-_l5nTv36d05qChP4pDQ",
  authDomain: "tamil-review.firebaseapp.com",
  databaseURL: "https://tamil-review-default-rtdb.firebaseio.com",
  projectId: "tamil-review",
  storageBucket: "tamil-review.firebasestorage.app",
  messagingSenderId: "467545635900",
  appId: "1:467545635900:web:4393b3f16d7db2df10d739"
};

const PHASE1_QUESTIONS = [
  { id: "q1", label: "Is this test case grammatically correct?", type: "yesno" },
  { id: "q2", label: "Does this test case accurately test the features it was meant to test?", type: "yesno" },
  { id: "q3", label: "Is there anything wrong with this test case?", type: "text" },
  { id: "q4", label: "Is the correct answer provided actually correct?", type: "yesno" },
  { id: "q5", label: "Could any other answer also be considered correct?", type: "yesno" }
];

const PHASE2_QUESTIONS = [
  { id: "q1", label: "Is the AI's response a correct answer to the prompt?", type: "yesno" },
  { id: "q2", label: "Did the AI respond in a way that is correct but not similar to the reference answer?", type: "yesno" }
];
