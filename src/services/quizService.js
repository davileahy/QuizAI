import api from "./api";

// Funções auxiliares para padronizar logs e erros, seguindo a convenção dos outros services.
const logAction = (action, details) => {
  console.log(`[QUIZ SERVICE] 🚀 ${action}`, details);
};

const throwValidationError = (message, details = null) => {
  console.error(`[QUIZ SERVICE] ❌ Validação Falhou: ${message}`, details);
  throw new Error(message);
};

const quizService = {
  /**
   * Gera um novo quiz usando o modelo de IA.
   * Corresponde ao endpoint POST /quiz no backend.
   * @param {object} quizData - Objeto contendo topic, numberOfQuestions, numberOfAnswers.
   * @returns {Promise<object>} Dados do Quiz criado (QuizResponseDTO).
   */
  generateQuiz: async (quizData) => {
    // Validação obrigatória baseada no QuizRequestDTO do backend
    if (
      !quizData?.topic ||
      !quizData?.numberOfQuestions ||
      !quizData?.numberOfAnswers
    ) {
      throwValidationError(
        "Dados incompletos. Tópico, número de questões e número de alternativas são obrigatórios."
      );
    }

    logAction("Iniciando geração de quiz", quizData);

    // O corpo da requisição é o QuizRequestDTO
    const requestBody = {
      topic: quizData.topic,
      numberOfQuestions: quizData.numberOfQuestions,
      numberOfAnswers: quizData.numberOfAnswers,
    };

    // O endpoint correto é /quiz
    const response = await api.post("/quiz", requestBody);

    logAction("Quiz gerado com sucesso", response.data);

    // Retorna o QuizResponseDTO (quiz com perguntas e respostas)
    return response.data;
  },

  // Os métodos 'deleteQuiz', 'getQuizById' e 'getQuizzesByUser' foram removidos
  // porque o QuizController do backend não expõe endpoints para estas operações.
};

export default quizService;
