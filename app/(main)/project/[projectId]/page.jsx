import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import React from "react";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";

const ProjectPage = async ({ params }) => {
  const { projectId } = params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }
  return (
    <div className="container mx-auto">
      {/* {
        sprint creation
    } */}
      <SprintCreationForm
        projectTitle={project.name}
        projectId={projectId}
        projectKey={project.key}
        sprintKey={project.sprints?.length + 1}
      />
      {project.sprints.length > 0 ? (
        <SprintBoard
          orgId={project.organizationId}
          projectId={projectId}
          sprints={project.sprints}
        />
      ) : (
        <div>Create Sprint from button above</div>
      )}
    </div>
  );
};

export default ProjectPage;
