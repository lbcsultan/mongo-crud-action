'use client'

import { createTopic, updateTopic } from '@/actions/topicActions'
import { useState } from 'react'

interface TopicFormProps {
  id?: string
  initialTitle?: string
  initialDescription?: string
}

export default function TopicForm({
  id,
  initialTitle = '',
  initialDescription = '',
}: TopicFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (id) {
        // 수정
        await updateTopic(id, title, description)
      } else {
        // 생성
        await createTopic(title, description)
      }
      // 성공 후 처리 (예: 폼 초기화 또는 리다이렉트)
    } catch (error) {
      setError(error instanceof Error ? error.message : '오류가 발생했습니다')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
      />
      <button type="submit">{id ? '수정하기' : '생성하기'}</button>
    </form>
  )
}
