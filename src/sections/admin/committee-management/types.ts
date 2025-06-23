export interface AcademyYear {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
}

export interface Semester {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  academy_year: AcademyYear | null;
}

export interface Batch {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  semester: Semester;
}

export interface Council {
  id: string;
  name: string;
  major: {
    id: string;
    name: string;
  };
  meeting_time: string;
  location: string;
  note: string;
  members: {
    member_id: string;
    name: string;
    role: number;
    email: string;
    lecturer_code: string;
    department: number;
    department_name: string;
    role_name: string;
  }[];
  theses: {
    id: string;
    title: string;
    description: string;
    status: string;
    thesis_type: number;
    name_thesis_type: string;
    start_date: string;
    end_date: string;
    instructors: {
      name: string;
      email: string;
      lecturer_code: string;
      department: number;
      department_name: string;
    }[];
  }[];
}