import {Project} from "../../../../store/projects-store/models/project";
import {Callbacks} from "../../../../store/shared/utils/interfaces/callbacks";

export interface ProjectMeta {
  project: Project;
  callbacks?: Callbacks;
}
