import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';

export default function Graphs() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Graph 1</h1>
        <Graph1 />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Graph 2</h1>
        <Graph2 />
      </div>
    </div>
  )
}