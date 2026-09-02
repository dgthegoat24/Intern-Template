import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {
        this.validateScore(assessmentData.score);

          const calculatedRiskLevel = this.calculateRiskLevel(assessmentData.score);

    // Validate that the provided risk level matches the score
    if (assessmentData.riskLevel !== calculatedRiskLevel) {
      throw new Error('Risk level does not match the score');
    }


    
    // HINT: Validate that the score is between 0 and 5
    // HINT: Validate that the risk level matches the score calculation

    // HINT: use this.assessmentRepository.create(assessmentData)
    return await this.assessmentRepository.create(assessmentData);
  }
  private validateScore(score: number): void {
    if (score < 0 || score > 5) {
      throw new Error('Score must be between 0 and 5');
    }
  }
  private calculateRiskLevel(score: number): string {
  if (score <= 1) {
    return 'low';
  }

  if (score <= 3) {
    return 'medium';
  }

  return 'high';
}

}
