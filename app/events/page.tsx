import { notFound } from 'next/navigation'

// Events & Gallery has been retired. Keep old bookmarks from showing the old page.
export default function EventsPage() {
  notFound()
}
