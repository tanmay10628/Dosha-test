import { useState } from 'react';
import { doshaDescriptions } from '../data/products';

// Test questions
const questions = [
  {
    id: 1,
    text: "What best describes your body frame?",
    options: [
      { text: "Thin, light, slender", dosha: "vata" },
      { text: "Medium, muscular, well-proportioned", dosha: "pitta" },
      { text: "Large, heavy, solid", dosha: "kapha" },
      { text: "Irregular, either very thin or with some extra weight", dosha: "vata" }
    ]
  },
  {
    id: 2,
    text: "How is your skin typically?",
    options: [
      { text: "Dry, rough, thin, cool", dosha: "vata" },
      { text: "Oily, warm, prone to rashes", dosha: "pitta" },
      { text: "Thick, oily, cool, smooth", dosha: "kapha" },
      { text: "Combination of dry and normal", dosha: "vata" }
    ]
  },
  {
    id: 3,
    text: "What describes your hair best?",
    options: [
      { text: "Dry, curly, thin, breaks easily", dosha: "vata" },
      { text: "Fine, straight, oily, premature graying", dosha: "pitta" },
      { text: "Thick, wavy, oily, lustrous", dosha: "kapha" },
      { text: "Thin with split ends", dosha: "vata" }
    ]
  },
  {
    id: 4,
    text: "How is your appetite?",
    options: [
      { text: "Irregular, sometimes strong, sometimes weak", dosha: "vata" },
      { text: "Strong, can't skip meals", dosha: "pitta" },
      { text: "Steady, can skip meals easily", dosha: "kapha" },
      { text: "Very strong, get \"hangry\"", dosha: "pitta" }
    ]
  },
  {
    id: 5,
    text: "How do you handle stress?",
    options: [
      { text: "Worry, anxiety, nervousness", dosha: "vata" },
      { text: "Anger, irritability, frustration", dosha: "pitta" },
      { text: "Withdrawal, avoidance, lethargy", dosha: "kapha" },
      { text: "Overthinking and restlessness", dosha: "vata" }
    ]
  }
];

const DoshaTest = ({ addToCart, toggleWishlist, wishlist }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [doshaResult, setDoshaResult] = useState(null);
  
  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (selectedOptions[currentQuestion] === null) {
      alert("Please select an option to proceed");
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };
  
  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Calculate dosha results
  const calculateResults = () => {
    const doshaScores = {
      vata: 0,
      pitta: 0,
      kapha: 0
    };
    
    selectedOptions.forEach((optionIndex, questionIndex) => {
      if (optionIndex !== null) {
        const selectedDosha = questions[questionIndex].options[optionIndex].dosha;
        doshaScores[selectedDosha]++;
      }
    });
    
    // Find the dominant dosha
    let dominantDosha = "vata";
    let maxScore = doshaScores.vata;
    
    if (doshaScores.pitta > maxScore) {
      dominantDosha = "pitta";
      maxScore = doshaScores.pitta;
    }
    
    if (doshaScores.kapha > maxScore) {
      dominantDosha = "kapha";
    }
    
    setDoshaResult(dominantDosha);
    setShowResults(true);
  };
  
  // Reset the test
  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
    setShowResults(false);
    setDoshaResult(null);
  };
  
  return (
    <section id="dosha-test" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Discover Your Dosha</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take our simple test to determine your Ayurvedic body type (Vata, Pitta, or Kapha) 
            and get personalized product recommendations.
          </p>
        </div>
        
        {!showResults ? (
          <div className="bg-gray-50 rounded-lg p-8 shadow-md max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {currentQuestion + 1}. {questions[currentQuestion].text}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-md cursor-pointer transition-all ${
                      selectedOptions[currentQuestion] === index 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white hover:border-green-600 hover:bg-green-50'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                className={`px-6 py-2 rounded-md ${
                  currentQuestion === 0 
                    ? 'invisible' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              
              <button
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                onClick={nextQuestion}
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 shadow-md max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold mb-4 ${
                doshaResult === 'vata' ? 'text-blue-600' :
                doshaResult === 'pitta' ? 'text-red-600' :
                'text-green-600'
              }`}>
                Your Primary Dosha: {doshaDescriptions[doshaResult].name}
              </h3>
              <p className="text-gray-700 mb-6">{doshaDescriptions[doshaResult].description}</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Characteristics</h4>
              <ul className="space-y-3">
                {doshaDescriptions[doshaResult].characteristics.map((char, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium mr-2">{char.label}:</span>
                    <span className="text-gray-700">{char.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 text-center">
              <button
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                onClick={resetTest}
              >
                Take Test Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoshaTest; 