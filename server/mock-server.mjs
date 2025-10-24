import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  checkCourseFilterParams,
  filterCreatedAtSortBy,
  filterEnrollCountSortBy,
  filterEnrollRatioSortBy,
  filterPagination,
} from './mocks/service/courses.js';

import { createUser, getAuthUser } from './mocks/service/user.js';

import {
  checkMyCreateClassBodyData,
  makeClassData,
} from './mocks/service/myCreate.js';
import { classStorage } from './mocks/storage.js';

const app = express();
const PORT = 9090;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  next();
});

// MSW middleware
// app.use('/api', createMiddleware(...handlers));

app.get('/api/user', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (response.user) {
    return res.status(response.status).json(response.user);
  }

  return res.sendStatus(response.status);
});

app.post('/api/user', async (req, res) => {
  try {
    const userResponse = getAuthUser(req.cookies);

    if (userResponse.status === 200) {
      return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
    }

    const response = createUser(req.body);

    res.cookie('authToken', response.user.id, {
      httpOnly: true,
      secure: false,
      path: '/',
    });

    return res.status(response.status).json({
      message: '회원가입이 완료되었습니다.',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// // =============================
// // Classes Handlers
// // =============================

// GET /api/classes (MSW: http.get(`/classes`))
app.get('/api/classes', async (req, res) => {
  const authResponse = getAuthUser(req.cookies);

  if (!authResponse.user) {
    return res.sendStatus(authResponse.status);
  }

  if (!checkCourseFilterParams(req.query)) {
    return res.sendStatus(400);
  }

  const classList = classStorage.getClassList().filter((classItem) => {
    return (
      !authResponse.user.hasEnrolledCourseId(classItem.id) ||
      !authResponse.user.hasCreatedClassId(classItem.id)
    );
  });

  const filterParams = req.query.filter;

  filterCreatedAtSortBy(filterParams, classList);
  filterEnrollCountSortBy(filterParams, classList);
  filterEnrollRatioSortBy(filterParams, classList);

  const limit = parseInt(req.query.limit ?? '10');
  const cursor = req.query.cursor || undefined;

  const { courseList, nextCursor } = filterPagination({
    courseList: classList,
    limit: limit,
    cursor: cursor,
  });

  // MSW의 지연 시간 처리 (Express에서도 가능)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 클라이언트가 기대하는 형태로 응답 구조 변경
  return res.status(200).json({
    classes: courseList, // courseList -> classes로 변경
    hasMore: nextCursor !== null, // hasMore 필드 추가
    nextCursor: nextCursor || '', // nextCursor가 null이면 빈 문자열로
  });
});

// POST /api/classes/enroll (MSW: http.post(`/classes/enroll`))
app.post('/api/classes/enroll', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (!response.user) {
    return res.sendStatus(response.status);
  }

  const courseIds = req.body;

  courseIds.forEach((courseId) => {
    const classList = classStorage.getClassList();
    const classItem = classList.find((item) => item.id === courseId);

    if (classItem && classItem.enrolledUserIds.length < classItem.total) {
      if (!classItem.enrolledUserIds.includes(response.user.id)) {
        classStorage.addEnrolledUserId(courseId, response.user.id);

        response.user.addEnrolledCourseId(courseId);
      }
    }
  });

  return res.status(201).json({
    message: '강의 신청이 완료되었습니다.',
  });
});

// GET /api/classes/enroll (MSW: http.get(`/classes/enroll`))
app.get('/api/classes/enroll', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (!response.user) {
    return res.sendStatus(response.status);
  }

  const allClasses = classStorage.getClassList();
  const enrolledClasses = allClasses.filter((classItem) =>
    response.user.enrolledCourseIds.includes(classItem.id)
  );

  return res.status(200).json([...enrolledClasses]);
});

// GET /api/classes/myCreated (MSW: http.get(`/classes/myCreated`))
app.get('/api/classes/myCreated', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (!response.user) {
    return res.sendStatus(response.status);
  }

  if (response.user.isTeacher) {
    const createdClasses = classStorage
      .getClassList()
      .filter((classItem) =>
        response.user.createdClassIds.includes(classItem.id)
      );

    return res.status(200).json(createdClasses);
  }

  if (response.user.isStudent) {
    return res
      .status(200)
      .json({ message: '학생은 강의 개설 권한이 없습니다.' });
  }

  return res.sendStatus(500);
});

// POST /api/classes/create (MSW: http.post(`/classes/create`))
app.post('/api/classes/create', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (!response.user) {
    return res.sendStatus(response.status);
  }

  if (!response.user.isTeacher) {
    return res.sendStatus(403);
  }

  const classData = req.body;

  if (checkMyCreateClassBodyData(classData)) {
    const newClass = makeClassData({
      courseData: classData,
      username: response.user.username,
    });

    classStorage.addClassList(newClass);
    response.user.addCreatedClassId(newClass.id);

    return res.status(201).json({
      message: '강의 개설이 완료되었습니다.',
    });
  }

  // 수정: res.status(400).json() 사용
  return res.status(400).json({
    message: '강의 개설에 실패했습니다.',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
});
