import React from 'react'
import { Link } from 'react-router'
import { PenSquare, Trash2 } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import api from '../../lib/axios.js'

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`notes/${id}`)
      setNotes((prev)=> prev.filter(note => note._id !== id))

    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note')
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="
        group relative rounded-xl bg-base-100/80 backdrop-blur
        border border-base-300 hover:border-primary/40
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Accent line */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-primary to-emerald-400" />

      <div className="p-5">
        <h3 className="text-lg font-semibold text-base-content line-clamp-1">
          {note.title}
        </h3>

        <p className="mt-2 text-sm text-base-content/70 line-clamp-3">
          {note.content}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-base-content/50">
            {formatDate(note.createdAt)}
          </span>

          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
            <PenSquare className="w-4 h-4 text-base-content/60 hover:text-primary" />

            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="text-base-content/60 hover:text-error transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
