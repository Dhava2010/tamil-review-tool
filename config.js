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
  { id: "q2", label: "Does this test case accurately test the features it was meant to test (listed at the top of the page)?", type: "yesno" },
  { id: "q3", label: "Is there anything wrong with this test case other than the errors intended to be there?", type: "text" },
  { id: "q4", label: "Is the correct answer provided a valid reference answer to the test case?", type: "yesno" },
  { id: "q5", label: "Could any other answer also be considered correct?", type: "yesno" }
];

const PHASE2_QUESTIONS = [
  { id: "q1", label: "Is the AI's response a correct answer to the prompt?", type: "yesno" },
  { id: "q2", label: "Did the AI respond in a way that is correct but not similar to the reference answer?", type: "yesno" }
];

const CATEGORY_NAMES = {
  "morphology": "Morphology",
  "sandhi": "Sandhi",
  "case-postpositions": "Case & Postpositions",
  "verb-system": "Verb System",
  "negation": "Negation",
  "syntax": "Syntax",
  "spelling": "Spelling",
  "lexical-semantics": "Lexical Semantics",
  "coherence": "Coherence",
  "comprehension": "Comprehension",
  "generation": "Generation"
};

const FEATURES = {
  "Suffix chains": "Stacking suffixes onto roots (வீட்டிலிருந்துகொண்டிருந்தேன்). Depth of stacking is where quantized models break first — they produce plausible but wrong chains.",
  "Number (நடை)": "Plurals including mixed strategies (மரம்→மரங்கள், ஆடு→ஆடுகள்). Number marking interacts with verb agreement and spelling; errors corrupt whole sentences.",
  "Compounds (தொகை)": "Forming compound types (இடம்+கூளம்→இடக்கூளம்). Productive word-formation rule with spelling changes inside — tests rule application, not memorized words.",
  "Derivational forms": "Word formation from roots (கல்→கல்வி, அழகு→அழகான). Third morphological process alongside inflection and compounding.",
  "உயிர் ஒட்டு": "Vowel junction and change (படம்+ஆ→படமா). Most frequent sandhi; wrong vowel harmony is immediately conspicuous.",
  "மெய் ஒட்டு": "Consonant joining (மெய்+இல்→மெயில்). Changes spelling shape entirely; tests whether model knows the junction, not just the joined word.",
  "அரை ஒட்டு": "Half-sandhi (ஆறு+ஐ→ஆற்றை). Least transparent rule, low-frequency pattern — classic early-degradation probe under quantization.",
  "Case suffix selection": "The 8 cases, right marker for role (படத்தை vs படத்திற்கு). Case errors invert or blur meaning; core grammatical competence.",
  "Postpositions": "Free markers (போல, நடுவே, நோக்கி). Less regular than suffixes; tests relational vocabulary beyond the case paradigm.",
  "Suffix vs. postposition choice": "Where both can mark similar relations. Tests functional/semantic judgment, not just form recall.",
  "Tense/aspect": "இறந்த/நிகழ்/எதிர் + aspectual contrasts (படித்தேன்/படிக்கிறேன்/படிப்பேன்). Verb morphology is densest here; tense errors are high-visibility.",
  "Mood & evidentiality": "Commands, conditionals, hearsay vs. experience markers (கேள்வி/அனுபவம்). Tamil-specific evidential system; weak spot even for strong models.",
  "Agreement": "Person/number/gender concord with subject (அவள் வந்தாள்). Agreement must be tracked across the sentence; quantization often breaks long-distance concord.",
  "Participles & verbal nouns": "படித்தவன், படிக்கும், படித்து... Tamil clauses are built from these; getting them wrong breaks clause construction itself.",
  "Honorific forms": "மரியாதை வடிவம் (நீங்கள் கொடுக்கிறீர்கள்). Obligatory social marking in standard Tamil; forgetting it is a native-level error, not a stylistic one.",
  "Negative verb forms": "இல்லை, வரவில்லை, ஆகாது, வேண்டாம். Multiple negative strategies with distinct usage; wrong choice changes speech act (refusal vs. statement).",
  "Double negatives & polarity": "எதுவும் இல்லை (positive meaning!). Models often over-negate or misread polarity — a logic-plus-grammar failure.",
  "Negation scope": "யாரும் வரவில்லை vs யாரோ வரவில்லை. Scope errors silently flip meaning; tests compositional semantics.",
  "Word order": "SOV base + marked/scrambled orders. Tamil permits variation; knowing what's legal vs. broken tests structural knowledge.",
  "Clause structure": "Relative/conditional clauses, clause-final verbs (நான் நேற்று வந்த வீடு...). Long, nested clause frames are high-load contexts where quantized models lose track.",
  "Questions": "Wh-, tag (அல்லவா?), embedded. Question formation uses distinct morphology; errors are frequent and obvious.",
  "Near-homophone choice": "முன்பு vs முன் — similar-sounding correct spellings. Spelling choice encodes meaning distinctions; classic weak point for models trained on noisy text.",
  "Letter accuracy": "Missing/extra/doubled letters, plus correct Grantha (ஜ ஷ ஸ ஹ) and ஆய்தம் (ஃ) usage — rare per-token in training data, expected to degrade early.",
  "Polysemy": "கண் = eye/measure/edge. Sense selection is contextual reasoning; failure produces fluent nonsense.",
  "Collocations": "Which verbs go with which nouns (கண் திறக்க vs மூட). Collocation knowledge is statistically learned — directly sensitive to weight degradation.",
  "Synonym selection": "The right near-synonym for context. Fine-grained meaning distinctions blur first when precision drops.",
  "Idioms & proverbs": "Fixed expressions (பழமொழிகள்) used correctly. Non-compositional meaning — tests stored knowledge; standard current Tamil, not archaic.",
  "Connectives": "ஆனால், எனவே, இருப்பினும் for correct logical relations. Wrong connective inverts contrast/causal flow — meaning-level error from a single word.",
  "connectives": "ஆனால், எனவே, இருப்பினும் for correct logical relations. Wrong connective inverts contrast/causal flow — meaning-level error from a single word.",
  "reference-tracking": "இது/அது/அவர் resolving across sentences. Requires holding discourse state; a memory-like load that quantization tends to hurt.",
  "sentence-ordering": "Judging/building a coherent sequence of sentences. Tests global discourse structure without relying on explicit markers.",
  "Literal": "Detail/fact retrieval from a passage. Baseline — if this fails, everything else is suspect.",
  "Inferential": "Cause-effect, implied meaning, indirect answers. Depends on integrating whole passage; degrades earlier than literal recall.",
  "Global": "Main idea, summary judgment. Measures whether model grasps text as a whole, not word-by-word.",
  "transformations": "Change tense, add/negate, rewrite. Isolates one grammatical operation in production; answer space narrow enough to grade reliably.",
  "composition": "Write a paragraph/summary in Tamil. Full-stack test: morphology + syntax + spelling + coherence simultaneously.",
  "continuation": "Finish a passage coherently. Requires maintaining register, referents, and flow — the most realistic usage scenario."
};
