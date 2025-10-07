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
        text: "Which library is used for building dynamic single-page applications (SPAs) in JavaScript?",
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
        "Date": "2025-08-21T11:30:00",
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
        "Date": "2025-10-06T15:45:00",
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
        "StudentNumber": "S1001",
        "FullName": "Alice Johnson",
        "Email": "alice.johnson@example.com",
        "Grade": "Grade 10",
        "Section": "A",
        "DateOfBirth": "2008-04-12T00:00:00",
        "Gender": "Female",
        "IsActive": true,
        "IsEligibleForExam": true,
        "EligibilityReason": "",
        "AssignedExams": [
            { "ExamId": 101, "Subject": "Mathematics", "Date": "2025-06-10T09:00:00", score: 88 },
            { "ExamId": 102, "Subject": "English", "Date": "2025-06-12T13:00:00", score: 60 },
            { "ExamId": 104, "Subject": "History", "Date": "2025-06-18T14:00:00", score: null },
            { "ExamId": 101, "Subject": "Mathematics", "Date": "2025-06-10T09:00:00", score: 88 },
            { "ExamId": 102, "Subject": "English", "Date": "2025-06-12T13:00:00", score: 60 },
            { "ExamId": 104, "Subject": "History", "Date": "2025-06-18T14:00:00", score: null },
            { "ExamId": 101, "Subject": "Mathematics", "Date": "2025-06-10T09:00:00", score: 88 },
            { "ExamId": 102, "Subject": "English", "Date": "2025-06-12T13:00:00", score: 60 },
            { "ExamId": 104, "Subject": "History", "Date": "2025-06-18T14:00:00", score: null },
            { "ExamId": 101, "Subject": "Mathematics", "Date": "2025-06-10T09:00:00", score: 88 },
            { "ExamId": 102, "Subject": "English", "Date": "2025-06-12T13:00:00", score: 60 },
            { "ExamId": 104, "Subject": "History", "Date": "2025-06-18T14:00:00", score: null },
            { "ExamId": 101, "Subject": "Mathematics", "Date": "2025-06-10T09:00:00", score: 88 },
            { "ExamId": 102, "Subject": "English", "Date": "2025-06-12T13:00:00", score: 60 },
            { "ExamId": 104, "Subject": "History", "Date": "2025-06-18T14:00:00", score: null }
        ],
        "ParentContact": "123-456-7890",
        "Notes": "Allergic to peanuts.",
        "LastModified": "2025-05-30T15:45:00",
        "CreatedBy": "admin01",
        "CreatedAt": "2024-09-01T08:30:00"
    },
    {
        "Id": 2,
        "StudentNumber": "S1002",
        "FullName": "Brian Smith",
        "Email": "brian.smith@example.com",
        "Grade": "Year 12",
        "Section": "B",
        "DateOfBirth": "2006-11-23T00:00:00",
        "Gender": "Male",
        "IsActive": true,
        "IsEligibleForExam": false,
        "EligibilityReason": "Outstanding tuition fees",
        "AssignedExams": [],
        "ParentContact": "321-654-0987",
        "Notes": "Needs extra time for exams.",
        "LastModified": "2025-05-28T10:00:00",
        "CreatedBy": "admin02",
        "CreatedAt": "2024-09-01T08:45:00"
    },
    {
        "Id": 3,
        "StudentNumber": "S1003",
        "FullName": "Catherine Lee",
        "Email": "catherine.lee@example.com",
        "Grade": "Grade 11",
        "Section": "C",
        "DateOfBirth": "2007-02-01T00:00:00",
        "Gender": "Female",
        "IsActive": true,
        "IsEligibleForExam": true,
        "EligibilityReason": "",
        "AssignedExams": [
            { "ExamId": 103, "Subject": "Science", "Date": "2025-06-15T10:00:00", score: 45 },
            { "ExamId": 101, Subject: "Mathematics", Date: "2025-06-15T10:00:00", score: null }

        ],
        "ParentContact": "987-654-3210",
        "Notes": "",
        "LastModified": "2025-05-27T08:30:00",
        "CreatedBy": "admin01",
        "CreatedAt": "2024-09-01T09:00:00"
    },
    {
        "Id": 4,
        "StudentNumber": "S1004",
        "FullName": "David Kim",
        "Email": "david.kim@example.com",
        "Grade": "Grade 9",
        "Section": "A",
        "DateOfBirth": "2009-05-05T00:00:00",
        "Gender": "Male",
        "IsActive": false,
        "IsEligibleForExam": false,
        "EligibilityReason": "Withdrawn from school",
        "AssignedExams": [],
        "ParentContact": "456-789-1234",
        "Notes": "Moved to another city.",
        "LastModified": "2025-05-20T14:20:00",
        "CreatedBy": "admin03",
        "CreatedAt": "2024-09-01T09:15:00"
    },
    {
        "Id": 5,
        "StudentNumber": "S1005",
        "FullName": "Emma Brown",
        "Email": "emma.brown@example.com",
        "Grade": "Year 11",
        "Section": "B",
        "DateOfBirth": "2007-08-30T00:00:00",
        "Gender": "Female",
        "IsActive": true,
        "IsEligibleForExam": true,
        "EligibilityReason": "",
        "AssignedExams": [
            { "ExamId": 104, "Subject": "History", "Date": "2025-06-18T14:00:00", score: 55 }
        ],
        "ParentContact": "555-444-3333",
        "Notes": "Prefect. Shows leadership qualities.",
        "LastModified": "2025-05-25T11:00:00",
        "CreatedBy": "admin02",
        "CreatedAt": "2024-09-01T09:30:00"
    },
    {
        "Id": 6,
        "StudentNumber": "S1006",
        "FullName": "Farhan Ahmed",
        "Email": "farhan.ahmed@example.com",
        "Grade": "Grade 10",
        "Section": "C",
        "DateOfBirth": "2008-07-19T00:00:00",
        "Gender": "Male",
        "IsActive": true,
        "IsEligibleForExam": false,
        "EligibilityReason": "Behavioral issues",
        "AssignedExams": [],
        "ParentContact": "444-888-9999",
        "Notes": "On disciplinary watchlist.",
        "LastModified": "2025-05-30T16:00:00",
        "CreatedBy": "admin03",
        "CreatedAt": "2024-09-01T10:00:00"
    },
    {
        "Id": 7,
        "StudentNumber": "S1007",
        "FullName": "Grace Choi",
        "Email": "grace.choi@example.com",
        "Grade": "Grade 8",
        "Section": "D",
        "DateOfBirth": "2010-12-05T00:00:00",
        "Gender": "Female",
        "IsActive": true,
        "IsEligibleForExam": true,
        "EligibilityReason": "",
        "AssignedExams": [],
        "ParentContact": "333-222-1111",
        "Notes": "Recently transferred.",
        "LastModified": "2025-05-29T12:30:00",
        "CreatedBy": "admin04",
        "CreatedAt": "2025-01-15T08:00:00"
    },
    {
        "Id": 8,
        "StudentNumber": "S1008",
        "FullName": "Hassan Malik",
        "Email": "hassan.malik@example.com",
        "Grade": "Year 10",
        "Section": "A",
        "DateOfBirth": "2008-03-03T00:00:00",
        "Gender": "Male",
        "IsActive": false,
        "IsEligibleForExam": false,
        "EligibilityReason": "Medical leave",
        "AssignedExams": [],
        "ParentContact": "777-555-0000",
        "Notes": "Returning next semester.",
        "LastModified": "2025-05-22T09:15:00",
        "CreatedBy": "admin01",
        "CreatedAt": "2024-09-01T10:15:00"
    },
    {
        "Id": 9,
        "StudentNumber": "S1009",
        "FullName": "Isabella Cruz",
        "Email": "isabella.cruz@example.com",
        "Grade": "Grade 11",
        "Section": "B",
        "DateOfBirth": "2007-06-10T00:00:00",
        "Gender": "Female",
        "IsActive": true,
        "IsEligibleForExam": true,
        "EligibilityReason": "",
        "AssignedExams": [
            { "ExamId": 105, "Subject": "Chemistry", "Date": "2025-06-20T09:00:00" }
        ],
        "ParentContact": "666-777-8888",
        "Notes": "",
        "LastModified": "2025-05-31T10:45:00",
        "CreatedBy": "admin02",
        "CreatedAt": "2024-09-01T10:30:00"
    },
    {
        "Id": 10,
        "StudentNumber": "S1010",
        "FullName": "Jacob White",
        "Email": "jacob.white@example.com",
        "Grade": "Year 12",
        "Section": "C",
        "DateOfBirth": "2006-01-17T00:00:00",
        "Gender": "Male",
        "IsActive": true,
        "IsEligibleForExam": true,
        "EligibilityReason": "",
        "AssignedExams": [
            { "ExamId": 106, "Subject": "Economics", "Date": "2025-06-25T13:30:00" }
        ],
        "ParentContact": "888-999-7777",
        "Notes": "Athlete - national level sprinter.",
        "LastModified": "2025-05-30T14:10:00",
        "CreatedBy": "admin03",
        "CreatedAt": "2024-09-01T10:45:00"
    }

]

export const adminQuestionLoad = [
    {
        "questionId": 1,
        "text": "Which framework is based on PHP?",
        "marks": 5,
        "isCheckbox": false,
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
        "isCheckbox": true,
        "options": [
            { "value": "A", "label": "React", "isCorrect": true },
            { "value": "B", "label": "Vue.js", "isCorrect": true },
            { "value": "C", "label": "Angular", "isCorrect": false },
            { "value": "D", "label": "Svelte", "isCorrect": false }
        ],
        "createdAt": "2025-10-06T12:05:00Z",
        "updatedAt": "2025-10-06T12:35:00Z"
    }
]

