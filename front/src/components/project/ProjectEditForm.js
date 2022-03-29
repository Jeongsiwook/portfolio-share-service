import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentProject.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentProject.description);
  //useState로 fromDate 상태를 생성함
  const [fromDate, setFromDate] = useState(new Date(currentProject.from_date));
  //useState로 toDate 상태를 생성함
  const [toDate, setToDate] = useState(new Date(currentProject.to_date));

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const user_id = currentProject.user_id;
    const fromDateToString = fromDate.toISOString().substring(0, 10);
    const toDateToString = toDate.toISOString().substring(0, 10);
    // "projects/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`projects/${currentProject.id}`, {
      user_id,
      title,
      description,
      from_date: fromDateToString,
      to_date: toDateToString,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get('projectlist', user_id);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formBasicTitle'>
        <Form.Control
          type='text'
          placeholder='프로젝트 제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicDescription' className='mt-3'>
        <Form.Control
          type='text'
          placeholder='상세내역'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicDatepicker' className='mt-3 row'>
        <div className='col-auto'>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </div>
        <div className='col-auto'>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </div>
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center mb-4'>
        <Col sm={{ span: 20 }}>
          <Button variant='primary' type='submit' className='me-3'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
