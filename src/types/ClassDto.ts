// types/Class.ts
export type ClassStatusDto = "" | "Active" | "Planned" | "Inactive";

export interface ClassDto {
    classId: number;

    courseId: number;
    courseName: string;

    termId: number;
    termName: string;

    sectionCode: string;
    startDate: string;
    endDate: string;

    teacherId: number;
    teacherName: string;

    maxStudents: number;
    status: ClassStatusDto;
}
