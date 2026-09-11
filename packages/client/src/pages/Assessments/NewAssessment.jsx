import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const questions = [
  {
    name: 'previousContact',
    label: 'Previous contact with the Cat Judicial System',
    choices: [
      { label: 'No = 0', value: 0 },
      { label: 'Yes = 1', value: 1 },
    ],
  },
  {
    name: 'catAltercations',
    label: 'Physical altercations with other cats',
    choices: [
      { label: '0–3 altercations = 0', value: 0 },
      { label: '3+ altercations = 1', value: 1 },
    ],
  },
  {
    name: 'ownerAltercations',
    label: 'Physical altercations with owner',
    choices: [
      { label: '0–10 altercations = 0', value: 0 },
      { label: '10+ altercations = 1', value: 1 },
    ],
  },
  {
    name: 'playsWellWithDogs',
    label: 'Plays well with dogs',
    choices: [
      { label: 'Yes = 0', value: 0 },
      { label: 'No = 1', value: 1 },
    ],
  },
  {
    name: 'hissesAtStrangers',
    label: 'Hisses at strangers',
    choices: [
      { label: 'No = 0', value: 0 },
      { label: 'Yes = 1', value: 1 },
    ],
  },
];

export const NewAssessment = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchedAnswers = watch();

  const currentScore = questions.reduce((total, question) => {
    const value = watchedAnswers[question.name];

    if (value === undefined) {
      return total;
    }

    return total + Number(value);
  }, 0);

  const getRiskLevel = (score) => {
    if (score <= 1) {
      return 'Low';
    }

    if (score <= 3) {
      return 'Medium';
    }

    return 'High';
  };

  const currentRiskLevel = getRiskLevel(currentScore);

  const onSubmit = async (data) => {
    const score = questions.reduce(
      (total, question) => total + Number(data[question.name]),
      0
    );

    const riskLevel = getRiskLevel(score).toLowerCase();

    const assessment = {
      instrumentType: 'Cat Behavioral Instrument',
      catName: data.catName,
      catDateOfBirth: data.catDateOfBirth,
      score,
      riskLevel,
    };

    try {
      await AssessmentService.submit(assessment);
      alert('Assessment submitted successfully');
      reset();
    } catch (error) {
      alert(`Unable to submit assessment: ${error.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Cat Behavioral Instrument</h2>

      <Form.Group className="mb-3">
        <Form.Label>Cat Name</Form.Label>

        <Form.Control
          type="text"
          {...register('catName', {
            required: 'Cat name is required',
          })}
          isInvalid={Boolean(errors.catName)}
        />

        <Form.Control.Feedback type="invalid">
          {errors.catName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cat Date of Birth</Form.Label>

        <Form.Control
          type="date"
          {...register('catDateOfBirth', {
            required: 'Cat date of birth is required',
          })}
          isInvalid={Boolean(errors.catDateOfBirth)}
        />

        <Form.Control.Feedback type="invalid">
          {errors.catDateOfBirth?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {questions.map((question) => (
        <Form.Group className="mb-3" key={question.name}>
          <Form.Label>{question.label}</Form.Label>

          {question.choices.map((choice) => (
            <Form.Check
              key={choice.label}
              type="radio"
              label={choice.label}
              value={choice.value}
              {...register(question.name, {
                required: 'Please select an answer',
              })}
            />
          ))}

          {errors[question.name] && (
            <div className="text-danger">
              {errors[question.name].message}
            </div>
          )}
        </Form.Group>
      ))}

      <div className="mb-3">
        <h4>Assessment Results</h4>

        <p>
          <strong>Total Score:</strong> {currentScore}
        </p>

        <p>
          <strong>Risk Level:</strong> {currentRiskLevel}
        </p>

        <p className="mb-1">0–1 = Low</p>
        <p className="mb-1">2–3 = Medium</p>
        <p>4–5 = High</p>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};