import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const questions = [
  {
    name: 'previousContact',
    label: 'Previous contact with the Cat Judicial System',
    choices: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
  },
  {
    name: 'catAltercations',
    label: 'Physical altercations with other cats',
    choices: [
      { label: '0–3 altercations', value: 0 },
      { label: '3+ altercations', value: 1 },
    ],
  },
  {
    name: 'ownerAltercations',
    label: 'Physical altercations with owner',
    choices: [
      { label: '0–10 altercations', value: 0 },
      { label: '10+ altercations', value: 1 },
    ],
  },
  {
    name: 'playsWellWithDogs',
    label: 'Plays well with dogs',
    choices: [
      { label: 'Yes', value: 0 },
      { label: 'No', value: 1 },
    ],
  },
  {
    name: 'hissesAtStrangers',
    label: 'Hisses at strangers',
    choices: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
  },
];

export const NewAssessment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const score = questions.reduce(
      (total, question) => total + Number(data[question.name]),
      0
    );

    let riskLevel = 'high';

    if (score <= 1) {
      riskLevel = 'low';
    } else if (score <= 3) {
      riskLevel = 'medium';
    }

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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};