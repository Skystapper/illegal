'use client'

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
  subject?: string
}

export const MessageModal = ({ isOpen, onClose, message, subject }: MessageModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {subject && (
          <h3 className="text-lg font-semibold mb-2">
            Subject: {subject}
          </h3>
        )}
        <div className="whitespace-pre-wrap">{message}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 w-full"
        >
          Close
        </button>
      </div>
    </div>
  )
} 