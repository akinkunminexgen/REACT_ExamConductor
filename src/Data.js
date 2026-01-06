export const questions = [
    {
        questionId: "Q1",
        text: "Which framework is based on PHP?",
        options: [
            { value: "A", label: "A. Laravel" },
            { value: "B", label: "Symfony" },
            { value: "C", label: "CodeIgniter" },
            { value: "D", label: "Zend" },
        ],
        correctAnswer: "A",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q2",
        text: "Which one is a Python-based micro web framework?",
        options: [
            { value: "A", label: "Bottle" },
            { value: "B", label: "Flask" },
            { value: "C", label: "CherryPy" },
            { value: "D", label: "Falcon" },
            { value: "E", label: "Eagle" },
        ],
        correctAnswer: "B",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q3",
        text: "Which framework is a high-level Python web framework?",
        options: [
            { value: "A", label: "Pyramid" },
            { value: "B", label: "Flask" },
            { value: "C", label: "Django" },
            { value: "D", label: "Tornado" },
        ],
        correctAnswer: "C",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q4",
        text: "Which library is used for building dynamic single-page applications (SPAs) in JavaScript? This is a common cardThis is a common card layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttons appear aligned.This is a common card layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttons appear aligned.This is a common card layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttons appear aligned.This is a common card layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttons appear aligned.This is a common card layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttons appear aligned. layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttonsThis is a common card layout problem. The solution is to make all cards the same height (or make the button stick to the bottom) so buttons appear aligned. appear aligned.",
        options: [
            { value: "A", label: "Vue.js" },
            { value: "B", label: "Angular" },
            { value: "C", label: "Svelte" },
            { value: "D", label: "React" },
        ],
        correctAnswer: "D",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q5",
        text: "Which full-stack web framework is written in Ruby?",
        options: [
            { value: "A", label: "Sinatra" },
            { value: "B", label: "Rails" },
            { value: "C", label: "Hanami" },
            { value: "D", label: "Padrino" },
        ],
        correctAnswer: "B",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q6",
        text: "Which JavaScript frameworks/libraries use a virtual DOM? (Select all that apply)",
        options: [
            { value: "A", label: "React" },
            { value: "B", label: "Vue.js" },
            { value: "C", label: "Angular" },
            { value: "D", label: "Svelte" },
        ],
        correctAnswer: ["A", "B"],
        studentAnswer: [],
        marks: 10,
        isCheckbox: true
    },
    {
        questionId: "Q7",
        text: "Which Ruby frameworks emphasize 'convention over configuration'? (Select all that apply)",
        options: [
            { value: "A", label: "Rails" },
            { value: "B", label: "Sinatra" },
            { value: "C", label: "Hanami" },
            { value: "D", label: "Padrino" },
        ],
        correctAnswer: ["A", "C"],
        studentAnswer: [],
        marks: 10,
        isCheckbox: true
    },
    {
        questionId: "Q8",
        text: "Which Python framework is best known for rapid development and a clean design?",
        options: [
            { value: "A", label: "Django" },
            { value: "B", label: "Flask" },
            { value: "C", label: "FastAPI" },
            { value: "D", label: "Tornado" },
        ],
        correctAnswer: "A",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q9",
        text: "Which JavaScript library is often paired with Redux for state management?",
        options: [
            { value: "A", label: "React" },
            { value: "B", label: "Vue.js" },
            { value: "C", label: "Svelte" },
            { value: "D", label: "Angular" },
        ],
        correctAnswer: "A",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    },
    {
        questionId: "Q10",
        text: "Which lightweight Python framework is commonly used for building APIs quickly?",
        options: [
            { value: "A", label: "Bottle" },
            { value: "B", label: "Flask" },
            { value: "C", label: "Falcon" },
            { value: "D", label: "CherryPy" },
        ],
        correctAnswer: "B",
        studentAnswer: "",
        marks: 5,
        isCheckbox: false
    }
];


export const exams = [
    {
        "examId": "EXAM-1345",
        "title": "Web Development Final",
        "courseCode": "WD401",
        "instructor": "Jane Doe",
        "totalMarks": 100,
        "durationMinutes": 500,
        "questionPerPage": 3,
        "date": "2025-08-21T11:30:00",
        "student": {
            "studentId": "S123456",
            "fullName": "John Smith",
            "email": "john@example.com"
        },
        "questions": [...questions]
    },
    {
        "examId": "EXAM-9087",
        "title": "Fluid Mechanism Final",
        "courseCode": "FM401",
        "instructor": "Ashley Young",
        "totalMarks": 100,
        "durationMinutes": 500,
        "questionPerPage": 4,
        "date": "2025-10-06T15:45:00",
        "student": {
            "studentId": "S123456",
            "fullName": "John Smith",
            "email": "john@example.com"
        },
        "questions": [...questions]
    },

]


export const student = [
    {
        "Id": 1,
        "studentNumber": "S1001",
        "firstName": "Alice",
        "midlleName": "",
        "surname": "Johnson",
        "email": "alice.johnson@example.com",
        "grade": "grade 10",
        "section": "A",
        "dob": "2008-04-12T00:00:00",
        "gender": "Female",
        "isActive": true,
        "isEligibleForExam": true,
        "eligibilityReason": "",
        "assignedExams": [
            { "examId": 101, "subject": "Mathematics", "date": "2025-06-10T09:00:00", score: 88 },
            { "examId": 102, "subject": "English", "date": "2025-06-12T13:00:00", score: 60 },
            { "examId": 104, "subject": "History", "date": "2025-06-18T14:00:00", score: null },
            { "examId": 101, "subject": "Mathematics", "date": "2025-06-10T09:00:00", score: 88 },
            { "examId": 102, "subject": "English", "date": "2025-06-12T13:00:00", score: 60 },
            { "examId": 104, "subject": "History", "date": "2025-06-18T14:00:00", score: null },
            { "examId": 101, "subject": "Mathematics", "date": "2025-06-10T09:00:00", score: 88 },
            { "examId": 102, "subject": "English", "date": "2025-06-12T13:00:00", score: 60 },
            { "examId": 104, "subject": "History", "date": "2025-06-18T14:00:00", score: null },
            { "examId": 101, "subject": "Mathematics", "date": "2025-06-10T09:00:00", score: 88 },
            { "examId": 102, "subject": "English", "date": "2025-06-12T13:00:00", score: 60 },
            { "examId": 104, "subject": "History", "date": "2025-06-18T14:00:00", score: null },
            { "examId": 101, "subject": "Mathematics", "date": "2025-06-10T09:00:00", score: 88 },
            { "examId": 102, "subject": "English", "date": "2025-06-12T13:00:00", score: 60 },
            { "examId": 104, "subject": "History", "date": "2025-06-18T14:00:00", score: null }
        ],
        "parentPhone": "123-456-7890",
        "notes": "Allergic to peanuts.",
        "lastModified": "2025-05-30T15:45:00",
        "createdBy": "admin01",
        "createdAt": "2024-09-01T08:30:00"
    },
    {
        "Id": 2,
        "studentNumber": "S1002",
        "firstName": "Brian",
        "midlleName": "",
        "surname": "Smith",
        "email": "brian.smith@example.com",
        "grade": "Year 12",
        "section": "B",
        "dob": "2006-11-23T00:00:00",
        "gender": "Male",
        "isActive": true,
        "isEligibleForExam": false,
        "eligibilityReason": "Outstanding tuition fees",
        "assignedExams": [],
        "parentPhone": "321-654-0987",
        "notes": "Needs extra time for exams.",
        "lastModified": "2025-05-28T10:00:00",
        "createdBy": "admin02",
        "createdAt": "2024-09-01T08:45:00"
    },
    {
        "Id": 3,
        "studentNumber": "S1003",
        "firstName": "Catherine",
        "midlleName": "",
        "surname": "Lee",
        "email": "catherine.lee@example.com",
        "grade": "grade 11",
        "section": "C",
        "dob": "2007-02-01T00:00:00",
        "gender": "Female",
        "isActive": true,
        "isEligibleForExam": true,
        "eligibilityReason": "",
        "assignedExams": [
            { "examId": 103, "subject": "Science", "date": "2025-06-15T10:00:00", score: 45 },
            { "examId": 101, subject: "Mathematics", date: "2025-06-15T10:00:00", score: null }

        ],
        "parentPhone": "987-654-3210",
        "notes": "",
        "lastModified": "2025-05-27T08:30:00",
        "createdBy": "admin01",
        "createdAt": "2024-09-01T09:00:00"
    },
    {
        "Id": 4,
        "studentNumber": "S1004",
        "firstName": "David",
        "midlleName": "",
        "surname": "Kim",
        "email": "david.kim@example.com",
        "grade": "grade 9",
        "section": "A",
        "dob": "2009-05-05T00:00:00",
        "gender": "Male",
        "isActive": false,
        "isEligibleForExam": false,
        "eligibilityReason": "Withdrawn from school",
        "assignedExams": [],
        "parentPhone": "456-789-1234",
        "notes": "Moved to another city.",
        "lastModified": "2025-05-20T14:20:00",
        "createdBy": "admin03",
        "createdAt": "2024-09-01T09:15:00"
    },
    {
        "Id": 5,
        "studentNumber": "S1005",
        "firstName": "Emma",
        "midlleName": "",
        "surname": "Brown",
        "email": "emma.brown@example.com",
        "grade": "Year 11",
        "section": "B",
        "dob": "2007-08-30T00:00:00",
        "gender": "Female",
        "isActive": true,
        "isEligibleForExam": true,
        "eligibilityReason": "",
        "assignedExams": [
            { "examId": 104, "subject": "History", "date": "2025-06-18T14:00:00", score: 55 }
        ],
        "parentPhone": "555-444-3333",
        "notes": "Prefect. Shows leadership qualities.",
        "lastModified": "2025-05-25T11:00:00",
        "createdBy": "admin02",
        "createdAt": "2024-09-01T09:30:00"
    },
    {
        "Id": 6,
        "studentNumber": "S1006",
        "firstName": "Farhan",
        "midlleName": "",
        "surname": "Ahmed",
        "email": "farhan.ahmed@example.com",
        "grade": "grade 10",
        "section": "C",
        "dob": "2008-07-19T00:00:00",
        "gender": "Male",
        "isActive": true,
        "isEligibleForExam": false,
        "eligibilityReason": "Behavioral issues",
        "assignedExams": [],
        "parentPhone": "444-888-9999",
        "notes": "On disciplinary watchlist.",
        "lastModified": "2025-05-30T16:00:00",
        "createdBy": "admin03",
        "createdAt": "2024-09-01T10:00:00"
    },
    {
        "Id": 7,
        "studentNumber": "S1007",
        "firstName": "Grace",
        "midlleName": "",
        "surname": "Choi",
        "email": "grace.choi@example.com",
        "grade": "grade 8",
        "section": "D",
        "dob": "2010-12-05T00:00:00",
        "gender": "Female",
        "isActive": true,
        "isEligibleForExam": true,
        "eligibilityReason": "",
        "assignedExams": [],
        "parentPhone": "333-222-1111",
        "notes": "Recently transferred.",
        "lastModified": "2025-05-29T12:30:00",
        "createdBy": "admin04",
        "createdAt": "2025-01-15T08:00:00"
    },
    {
        "Id": 8,
        "studentNumber": "S1008",
        "firstName": "Hassan",
        "midlleName": "",
        "surname": "Malik",
        "email": "hassan.malik@example.com",
        "grade": "Year 10",
        "section": "A",
        "dob": "2008-03-03T00:00:00",
        "gender": "Male",
        "isActive": false,
        "isEligibleForExam": false,
        "eligibilityReason": "Medical leave",
        "assignedExams": [],
        "parentPhone": "777-555-0000",
        "notes": "Returning next semester.",
        "lastModified": "2025-05-22T09:15:00",
        "createdBy": "admin01",
        "createdAt": "2024-09-01T10:15:00"
    },
    {
        "Id": 9,
        "studentNumber": "S1009",
        "firstName": "Isabella",
        "midlleName": "",
        "surname": "Cruz",
        "email": "isabella.cruz@example.com",
        "grade": "grade 11",
        "section": "B",
        "dob": "2007-06-10T00:00:00",
        "gender": "Female",
        "isActive": true,
        "isEligibleForExam": true,
        "eligibilityReason": "",
        "assignedExams": [
            { "examId": 105, "subject": "Chemistry", "date": "2025-06-20T09:00:00" }
        ],
        "parentPhone": "666-777-8888",
        "notes": "",
        "lastModified": "2025-05-31T10:45:00",
        "createdBy": "admin02",
        "createdAt": "2024-09-01T10:30:00"
    },
    {
        "Id": 10,
        "studentNumber": "S1010",
        "firstName": "Jacob",
        "midlleName": "",
        "surname": "White",
        "email": "jacob.white@example.com",
        "grade": "Year 12",
        "section": "C",
        "dob": "2006-01-17T00:00:00",
        "gender": "Male",
        "isActive": true,
        "isEligibleForExam": true,
        "eligibilityReason": "",
        "assignedExams": [
            { "examId": 106, "subject": "Economics", "date": "2025-06-25T13:30:00" }
        ],
        "parentPhone": "888-999-7777",
        "notes": "Athlete - national level sprinter.",
        "lastModified": "2025-05-30T14:10:00",
        "createdBy": "admin03",
        "createdAt": "2024-09-01T10:45:00"
    }

]

export const adminQuestionLoad = [
    {
        "questionId": 1,
        "text": "Which framework is based on PHP?",
        "marks": 5,
        "tag": "Math",
        "isMultipleAnswer": false,
        "provideAnswer": false,
        "options": [
            { "value": "A", "label": "Laravel", "isCorrect": true },
            { "value": "B", "label": "Symfony", "isCorrect": false },
            { "value": "C", "label": "CodeIgniter", "isCorrect": false },
            { "value": "D", "label": "Zend", "isCorrect": false }
        ],
        "createdAt": "2025-10-06T12:00:00Z",
        "updatedAt": "2025-10-06T12:30:00Z"
    },
    {
        "questionId": 2,
        "text": "Which JavaScript libraries use a virtual DOM? (Select all that apply)",
        "marks": 10,
        "tag": "CSC",
        "isMultipleAnswer": true,
        "provideAnswer": false,
        "options": [
            { "value": "A", "label": "React", "isCorrect": true },
            { "value": "B", "label": "Vue.js", "isCorrect": true },
            { "value": "C", "label": "Angular", "isCorrect": false },
            { "value": "D", "label": "Svelte", "isCorrect": false }
        ],
        "createdAt": "2025-10-06T12:05:00Z",
        "updatedAt": "2025-10-06T12:35:00Z"
    },
    {
        "questionId": 3,
        text: "In the context of modern web development, which of the following frameworks or technologies would you choose for building a highly scalable, maintainable, and performant web application? Consider backend, frontend, and full-stack solutions.",
        marks: 5,
        "tag": "Math",
        isMultipleAnswer: true,
        "provideAnswer": false,
        options: [
            {
                "value": "A",
                label: "Laravel with Vue.js and Inertia.js for seamless server-side rendering and SPA-like interactivity",
                isCorrect: false
            },
            {
                "value": "B",
                label: "Symfony with Twig templates for robust backend architecture but minimal frontend dynamic features",
                isCorrect: true
            },
            {
                "value": "C",
                label: "CodeIgniter combined with plain JavaScript for lightweight applications with minimal overhead",
                isCorrect: false
            },
            {
                "value": "D",
                label: "Zend Framework with custom frontend for enterprise-level solutions requiring strict modularity",
                isCorrect: true
            },
            {
                "value": "E",
                label: "Zend Framewohddj jknjdhsgfjn dnhdfjndf hfd arity",
                isCorrect: false
            }
        ],
        "createdAt": "2025-10-06T12:05:00Z",
        "updatedAt": "2025-10-06T12:35:00Z"
    },
    {
        "questionId": 4,
        "text": "Which PHP framework do we use most?",
        "marks": 10,
        "tag": "CSC",
        "isMultipleAnswer": false,
        "provideAnswer": true,
        "createdAt": "2025-10-06T12:05:00Z",
        "updatedAt": "2025-10-06T12:35:00Z"
    }

]

