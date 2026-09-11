import { injectable } from 'inversify';
import { Request } from 'express';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { DeleteAssessmentUseCase } from './useCase';

@injectable()
export class DeleteAssessmentController extends BaseController {
  public constructor(
    private deleteAssessmentUseCase: DeleteAssessmentUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request): Promise<boolean> {
    const id = Number(req.params.id);

    return this.deleteAssessmentUseCase.execute(id);
  }
}