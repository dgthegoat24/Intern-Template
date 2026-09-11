import { inject, injectable } from 'inversify';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class DeleteAssessmentUseCase {
  public constructor(
    @inject(IAssessmentRepository)
    private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    return this.assessmentRepository.delete(id);
  }
}