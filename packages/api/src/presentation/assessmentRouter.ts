import { Router } from 'express';
import { CreateAssessmentController } from '../application/features/assessments/create/controller';
import { GetAssessmentListController } from '../application/features/assessments/getList/controller';
import { DeleteAssessmentController } from '../application/features/assessments/delete/controller';
import { container } from '../infrastructure/di/container';

const assessmentRouter = Router();

const createAssessmentController = container.get(CreateAssessmentController);
const getAssessmentListController = container.get(GetAssessmentListController);
const deleteAssessmentController = container.get(DeleteAssessmentController);
// POST /api/assessments - Create assessment
assessmentRouter.post(
  `/`,
  createAssessmentController.execute,
);

// GET /api/assessments - Get assessment list
assessmentRouter.get(
  `/`,
  getAssessmentListController.execute,
);

// DELETE /api/assessments/:id - Soft delete assessment
assessmentRouter.delete(
  '/:id',
  deleteAssessmentController.execute,
);

export { assessmentRouter };
