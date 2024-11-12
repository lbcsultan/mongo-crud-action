import { getAllTopics } from '@/actions/topicActions'

export default async function TopicsPage() {
  const { topics } = await getAllTopics()

  return (
    <div>
      {topics.map((topic) => (
        <div key={topic._id}>
          <h2>{topic.title}</h2>
          <p>{topic.description}</p>
        </div>
      ))}
    </div>
  )
}
