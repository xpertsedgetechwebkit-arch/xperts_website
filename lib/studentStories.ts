/**
 * Student Reviews content. DEMO ENTRIES ONLY — replace before public launch.
 *
 * For each verified student review:
 * - set displayName, course, summary, thumbnail and videoUrl to consented real assets;
 * - current sample-portrait images are generated examples, NOT photographs of real students;
 * - change isDemo to false only once the video and student details are verified;
 * - store approved videos in /public/student-reviews/ or use a trusted CDN;
 * - do not expose students' contact details here.
 *
 * The home page automatically uses the first four items.
 */
export type ReviewCategory = 'Software Testing' | 'Full Stack' | 'Cloud & DevOps' | 'Career Growth'

export type StudentStory = {
  id: string
  displayName: string
  course: ReviewCategory
  summary: string
  thumbnail: string
  videoUrl: string
  isDemo: boolean
}

export const studentStories: StudentStory[] = [
  { id: '01', displayName: 'Student Story 01', course: 'Software Testing', summary: 'An introduction to our learning experience.', thumbnail: '/student-reviews/sample-portrait-01.webp', videoUrl: '/student-reviews/demo-preview-01.mp4', isDemo: true },
  { id: '02', displayName: 'Student Story 02', course: 'Full Stack', summary: 'A look at practical, project-based learning.', thumbnail: '/student-reviews/sample-portrait-02.webp', videoUrl: '/student-reviews/demo-preview-02.mp4', isDemo: true },
  { id: '03', displayName: 'Student Story 03', course: 'Cloud & DevOps', summary: 'Discover a hands-on technology learning journey.', thumbnail: '/student-reviews/sample-portrait-03.webp', videoUrl: '/student-reviews/demo-preview-03.mp4', isDemo: true },
  { id: '04', displayName: 'Student Story 04', course: 'Career Growth', summary: 'The value of guidance and interview preparation.', thumbnail: '/student-reviews/sample-portrait-04.webp', videoUrl: '/student-reviews/demo-preview-04.mp4', isDemo: true },
  { id: '05', displayName: 'Student Story 05', course: 'Software Testing', summary: 'Build confidence with real practice.', thumbnail: '/student-reviews/sample-portrait-01.webp', videoUrl: '/student-reviews/demo-preview-01.mp4', isDemo: true },
  { id: '06', displayName: 'Student Story 06', course: 'Full Stack', summary: 'Learn to ship more complete projects.', thumbnail: '/student-reviews/sample-portrait-02.webp', videoUrl: '/student-reviews/demo-preview-02.mp4', isDemo: true },
  { id: '07', displayName: 'Student Story 07', course: 'Cloud & DevOps', summary: 'Explore practical infrastructure workflows.', thumbnail: '/student-reviews/sample-portrait-03.webp', videoUrl: '/student-reviews/demo-preview-03.mp4', isDemo: true },
  { id: '08', displayName: 'Student Story 08', course: 'Career Growth', summary: 'Preparing for the next professional step.', thumbnail: '/student-reviews/sample-portrait-04.webp', videoUrl: '/student-reviews/demo-preview-04.mp4', isDemo: true },
]
