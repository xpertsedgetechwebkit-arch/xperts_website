/**
 * Student video slots. No fake testimonials or sample portraits are displayed.
 *
 * To publish a student video, put an approved MP4 at:
 * public/student-reviews/videos/student-01.mp4
 * public/student-reviews/videos/student-02.mp4
 * ... through student-08.mp4
 *
 * The client checks which files exist and enables those cards automatically.
 * No data-file edits are needed just to add a numbered video.
 *
 * If you later want to show an actual student's name and course, edit the
 * corresponding entry only after getting that student's permission.
 */
export type ReviewCategory =
  | 'Student Experience'
  | 'Software Testing'
  | 'Full Stack'
  | 'Cloud & DevOps'
  | 'Career Growth'

export type StudentStory = {
  id: string
  displayName: string
  course: ReviewCategory
  summary: string
  thumbnail: string
  videoUrl: string
  isDemo: boolean
}

const courses: ReviewCategory[] = Array.from({ length: 8 }, () => 'Student Experience')

export const studentStories: StudentStory[] = courses.map((course, index) => {
  const number = String(index + 1).padStart(2, '0')
  return {
    id: number,
    displayName: `Student Video ${number}`,
    course,
    summary: 'Approved student experience video.',
    thumbnail: '',
    videoUrl: `/student-reviews/videos/student-${number}.mp4`,
    isDemo: false,
  }
})
