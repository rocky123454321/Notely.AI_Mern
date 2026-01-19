import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from 'lucide-react'
import api from '../../lib/axios'

const NoteDetailPage = () => {
  const [note, setNote] = useState({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.error('Error fetching note:', error)
      } finally {
     setLoading(false)
      }
    }

    if (id) fetchNote()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this note?')) return
    try {
      await api.delete(`/notes/${id}`)
      navigate('/')
    } catch {
      alert('Failed to delete note')
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // Delete note if title/content is empty
      if ((!note.title?.trim() && !note.content?.trim()) || note.title?.trim().length === 0) {
        await api.delete(`/notes/${id}`)
        navigate('/')
        return
      }

      await api.put(`/notes/${id}`, note)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Failed to save note')
    } finally {
      setSaving(false)
    }
  }

  const wordCount = (text = '') => (text.trim() ? text.trim().split(/\s+/).length : 0)

  return (
    <div className="min-h-screen bg-base-100">
      {loading ? (
      <div className="flex items-start justify-center min-h-screen pt-10">
  <div className="w-full max-w-3xl px-4">
    {/* Header skeleton */}
    <div className="flex items-center justify-between mb-8 animate-pulse">
      <div className="h-4 w-24 bg-base-300 rounded-md"></div>
      <div className="h-4 w-16 bg-base-300 rounded-md"></div>
    </div>

    {/* Editor skeleton */}
    <div className="rounded-xl border border-base-300 bg-base-100 p-6 sm:p-8 space-y-6 shadow-sm animate-pulse">
      {/* Title skeleton */}
      <div className="h-10 w-full bg-base-300 rounded-md"></div>

      {/* Content skeleton */}
      <div className="h-[320px] w-full bg-base-300 rounded-md"></div>

      {/* Word count skeleton */}
      <div className="h-4 w-20 bg-base-300 rounded-md"></div>

      {/* Save button skeleton */}
      <div className="flex justify-end">
        <div className="h-10 w-24 bg-base-300 rounded-md"></div>
      </div>
    </div>
  </div>
</div>



      ) : (
        <main className="max-w-3xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content"
            >
              <ArrowLeftIcon className="size-4" />
              Back
            </Link>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 text-sm text-error hover:underline"
            >
              <Trash2Icon className="size-4" />
              Delete
            </button>
          </div>

          {/* Note Editor */}
          <div className="rounded-xl border border-base-300 bg-base-100 p-6 sm:p-8 space-y-6 shadow-sm hover:shadow transition">
            <input
              autoFocus
              type="text"
              placeholder="Title"
              className="w-full text-3xl font-semibold bg-transparent outline-none border-b border-base-300 pb-2 focus:border-primary transition"
              value={note.title || ''}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />

            <textarea
              placeholder="Start writing..."
              className="w-full min-h-[320px] bg-transparent resize-none outline-none text-base leading-relaxed focus:outline-none"
              value={note.content || ''}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />

            <p className="text-sm text-base-content/60">{wordCount(note.content)} words</p>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary px-6"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <LoaderIcon className="size-4 animate-spin" />
                    Saving
                  </span>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default NoteDetailPage
