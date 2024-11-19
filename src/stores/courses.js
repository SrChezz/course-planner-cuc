// stores/courses.js
import { defineStore } from 'pinia';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// Obtener Firestore
import { db } from '@/js/firebase';

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [], // Lista de cursos
    currentCourse: null, // Curso seleccionado
  }),
  actions: {
    // Obtener todos los cursos
    async fetchCourses() {
      try {
        const coursesCollection = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        this.courses = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    },

    // Obtener un curso por ID
    async fetchCourse(id) {
      try {
        const courseDoc = doc(db, 'courses', id);
        const courseSnapshot = await getDoc(courseDoc);
        if (courseSnapshot.exists()) {
          this.currentCourse = {
            id: courseSnapshot.id,
            ...courseSnapshot.data(),
          };
        } else {
          this.currentCourse = null;
          console.warn('El curso no existe.');
        }
      } catch (error) {
        console.error('Error al obtener el curso:', error);
      }
    },

    // Crear un nuevo curso
    async createCourse(courseData) {
      try {
        const coursesCollection = collection(db, 'courses');
        const docRef = await addDoc(coursesCollection, courseData);
        console.log('Curso creado con ID:', docRef.id);
        this.fetchCourses(); // Actualizar lista de cursos
      } catch (error) {
        console.error('Error al crear el curso:', error);
      }
    },

    // Actualizar un curso existente
    async updateCourse(id, updatedData) {
      try {
        const courseDoc = doc(db, 'courses', id);
        await updateDoc(courseDoc, updatedData);
        console.log('Curso actualizado:', id);
        this.fetchCourses(); // Actualizar lista de cursos
      } catch (error) {
        console.error('Error al actualizar el curso:', error);
      }
    },

    // Eliminar un curso
    async deleteCourse(id) {
      try {
        const courseDoc = doc(db, 'courses', id);
        await deleteDoc(courseDoc);
        console.log('Curso eliminado:', id);
        this.fetchCourses(); // Actualizar lista de cursos
      } catch (error) {
        console.error('Error al eliminar el curso:', error);
      }
    },
  },
});
