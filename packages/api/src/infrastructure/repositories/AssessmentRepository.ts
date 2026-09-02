import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment as AssessmentModel } from '../sequelize/models';
export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    
  const assessment = await AssessmentModel.create(assessmentData);

  return assessment.toJSON() as AssessmentType;
  }

  public async findAll(): Promise<AssessmentType[]> {
  
    const assessment = await AssessmentModel.findAll();
    return assessment.map(
      assessment => assessment.toJSON() as AssessmentType
    );
  }

  public async delete(id: number): Promise<boolean> {
    return Promise.reject(new Error(`Not implemented`));
  }
}
