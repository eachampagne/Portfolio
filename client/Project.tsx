import type { Project } from '../types/project';

export default function Project ({project}: {project: Project}) {
  // prevents ending up with, e.g., Jan 2026 - Jan 2026, which looks like of dumb
  // TODO: more granularity, ex. removing duplicate years (i.e. Jan - May 2026)
  const renderProjectDates = ({start, end}: {start: string, end: string}) => {
    if (start === end) {
      return start;
    } else {
      return `${start} - ${end}`;
    }
  };

  const renderLinks = () => {
    if (!project.link) {
      return <a href={project.repository} className="underline text-[cyan] visited:text-[#00DDDD] my-2">View Repository</a>;
    } else {
      return (
        <span className="my-2">
          <a href={project.link} className="underline text-[cyan] visited:text-[#00DDDD] mr-2">View Project</a>
          <a href={project.repository} className="underline text-[cyan] visited:text-[#00DDDD]">View Repository</a>
        </span>
      );
    }
  }

  return (
    <div className="p-4 m-4 text-white border-1 border-[cyan] bg-[darkcyan]/30">
      <span className="flex mb-2">
        <h3 className="text-xl flex-none">{project.name}</h3>
        <span className="flex-1"></span> {/* "spacer" */}
        <p className="flex-none">{renderProjectDates(project.dates)}</p>
      </span>
      {renderLinks()}
      <p className="">{project.description}</p>
      <p className="font-bold text-l mt-2">Tasks:</p>
      <ul className="list-disc list-inside">
        {project.bullets.map(bullet => <li>{bullet}</li>)}
      </ul>
      <p className="font-bold text-l mt-2">Tech Stack:</p>
       <ul className="list-disc list-inside">
        {Object.entries(project.techstack).map(([key, value]) => {
          if (value.length === 0) return null;

          return (
            <li>
              <span className="font-bold">{key[0].toUpperCase() + key.slice(1)}: </span>
              {value.join(', ')}
            </li>
          );
        })}
      </ul>
    </div>
  )
}