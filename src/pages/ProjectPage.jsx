import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import projects from "../data/projects";

function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-white p-10">Project not found</div>;
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 py-24">

      <div className="max-w-4xl mx-auto">

        <Link
          to="/"
          className="text-blue-400 hover:text-blue-300 mb-10 inline-block"
        >
          ← Back to Portfolio
        </Link>

        <h1 className="text-4xl font-bold mb-6">
          {project.title}
        </h1>

        <p className="text-gray-400 mb-10">
          {project.description}
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Architecture
        </h2>

        <p className="text-gray-400 mb-10">
          {project.architecture}
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Technology Stack
        </h2>

        <ul className="list-disc list-inside text-gray-400 mb-10">
          {project.tech.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          Results
        </h2>

        <p className="text-gray-400">
          {project.results}
        </p>

      </div>

    </div>
  );
}

export default ProjectPage;