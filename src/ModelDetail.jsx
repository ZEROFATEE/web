import { useParams } from 'react-router-dom'

export default function ModelDetail() {
  const { slug } = useParams()
  return <section className="pt-24 px-4 max-w-7xl mx-auto"><h1>{slug}</h1></section>
}