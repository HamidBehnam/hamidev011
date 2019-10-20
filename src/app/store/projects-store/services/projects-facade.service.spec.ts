import { TestBed } from '@angular/core/testing';

import { ProjectsFacadeService } from './projects-facade.service';

describe('ProjectsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectsFacadeService = TestBed.get(ProjectsFacadeService);
    expect(service).toBeTruthy();
  });
});
