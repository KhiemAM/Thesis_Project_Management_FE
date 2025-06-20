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
