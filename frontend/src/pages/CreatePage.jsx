import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/axios'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required')
      return
    }

    try {
      setLoading(true)
      await api.post('/notes', { title, content })
      toast.success('Note created')
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content mb-8"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>

        {/* Card */}
        <div className="rounded-xl border border-base-300 bg-base-100 p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-semibold">New Note</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                placeholder="Note title"
                className="w-full input input-bordered bg-base-100 focus:outline-none focus:border-primary transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Content</label>
              <textarea
                placeholder="Write something..."
                className="w-full textarea textarea-bordered min-h-[160px] bg-base-100 focus:outline-none focus:border-primary transition resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Action */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary px-6"
              >
                {loading ? 'Saving…' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CreatePage
