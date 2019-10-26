import {ProjectCallbacks} from "../../../../store/projects-store/interfaces/project-callbacks";
import {Project} from "../../../../store/projects-store/models/project";

export interface ProjectMeta {
  project: Project;
  callbacks?: ProjectCallbacks;
}
