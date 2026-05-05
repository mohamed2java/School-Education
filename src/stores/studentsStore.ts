import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Student } from '@/types';
import { mockStudents } from '@/constants/mockData';
import { generateId } from '@/lib/utils';

interface StudentsState {
  students: Student[];
  isLoading: boolean;
  fetchStudents: () => Promise<void>;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudent: (id: string) => Student | undefined;
  addPaymentToStudent: (id: string, amount: number) => void;
}

export const useStudentsStore = create<StudentsState>()(
  persist(
    (set, get) => ({
      students: [],
      isLoading: false,
      fetchStudents: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch('http://127.0.0.1:4000/api/students');
          const data = await response.json();
          set({ students: data, isLoading: false });
        } catch (error) {
          console.error('Fetch students error:', error);
          set({ isLoading: false });
        }
      },
      addStudent: async (student) => {
        try {
          const response = await fetch('http://127.0.0.1:4000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
          });
          const newStudent = await response.json();
          set((state) => ({ students: [newStudent, ...state.students] }));
        } catch (error) {
          console.error('Add student error:', error);
        }
      },
      updateStudent: (id, data) => set((state) => ({
        students: state.students.map((s) => s.id === id ? { ...s, ...data } : s),
      })),
      deleteStudent: (id) => set((state) => ({
        students: state.students.filter((s) => s.id !== id),
      })),
      getStudent: (id) => get().students.find((s) => s.id === id),
      addPaymentToStudent: (id, amount) => set((state) => ({
        students: state.students.map((s) =>
          s.id === id ? { ...s, paidAmount: s.paidAmount + amount } : s
        ),
      })),
    }),
    { name: 'school-students' }
  )
);
