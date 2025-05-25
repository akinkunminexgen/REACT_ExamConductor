const options = [ 
    { value: "A", label: "A. Laravel" },
    { value: "B", label: "B. Flask" },
    { value: "C", label: "C. Django" },
    { value: "D", label: "D. React" },
    { value: "E", label: "E. Ruby on Rails" },
];


const questions = [
    {
        questionId: "Q1",
        text: "Which framework is based on PHP?",
        options: [...options],
        correctAnswer: "A",
        studentAnswer: "A",
        marks: 5
    },
    {
        questionId: "Q2",
        text: "Which one is a Python-based micro web framework?",
        options: [...options],
        correctAnswer: "B",
        studentAnswer: "A",
        marks: 5
    },
    {
        questionId: "Q3",
        text: "Which framework is a high-level Python web framework?",
        options: [...options],
        correctAnswer: "C",
        studentAnswer: "A",
        marks: 5
    },
    {
        questionId: 4,
        text: "In the context of modern web development, developers often utilize various tools, frameworks, and libraries to enhance the efficiency and scalability of building interactive user interfaces. Among the options listed below, identify the one that is specifically classified as a JavaScript library designed primarily for constructing and managing user interface components, often used in the development of single-page applications (SPAs). Which option best fits this description ? ",
        options: [...options],
        correctAnswer: "D",
        studentAnswer: "A",
        marks: 5
    },
    {
        questionId: 5,
        text: "Which of the following is a full-stack web framework written in Ruby?",
        options: [...options],
        correctAnswer: "E",
        studentAnswer: "A",
        marks: 5
    },
    {
        questionId: 6,
        text: "What Language are you familiar with?",
        options: [...options],
        correctAnswer: "E",
        studentAnswer: "A",
        marks: 5
    },
    {
        questionId: 7,
        text: "linked with a corresponding Power BI workspace?",
        options: [...options],
        correctAnswer: "E",
        studentAnswer: "A",
        marks: 5
    },
];

export const exam = {
    "examId": "EXAM-1345",
    "title": "Web Development Final",
    "courseCode": "WD401",
    "instructor": "Jane Doe",
    "totalMarks": 100,
    "durationMinutes": 150,
    "student": {
        "studentId": "S123456",
        "fullName": "John Smith",
        "email": "john@example.com"
    },
    "questions": [...questions],
}



