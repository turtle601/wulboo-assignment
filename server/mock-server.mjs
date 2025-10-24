import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  checkCourseFilterParams,
  checkMyCreated,
  checkMyEnrolled,
  filterCreatedAtSortBy,
  filterEnrollCountSortBy,
  filterEnrollRatioSortBy,
  filterPagination,
} from './mocks/service/courses.js';
import { createUser, getAuthUser } from './mocks/service/user.js';
import { enrollCourses } from './mocks/service/enroll.js';
import {
  checkMyCreateClassBodyData,
  makeClassData,
} from './mocks/service/myCreate.js';
import { AUTH_TOKEN_COOKIE_NAME, classList } from './mocks/storage.js';

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

    res.cookie('authToken', AUTH_TOKEN_COOKIE_NAME, {
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

// =============================
// Classes Handlers
// =============================

// GET /api/classes (MSW: http.get(`/classes`))
app.get('/api/classes', async (req, res) => {
  const authResponse = getAuthUser(req.cookies);

  if (!authResponse.user) {
    return res.sendStatus(authResponse.status);
  }

  if (!checkCourseFilterParams(req.query)) {
    // 🚨 400 에러가 여기서 발생합니다.
    return res.sendStatus(400);
  }

  // 필터링 및 정렬 로직은 그대로 유지
  const sortedClasses = classList.filter(
    (classListItem) =>
      !checkMyCreated(classListItem, authResponse.user) &&
      !checkMyEnrolled(classListItem, authResponse.user)
  );

  const filterParams = req.query.filter;

  filterCreatedAtSortBy(filterParams, sortedClasses);
  filterEnrollCountSortBy(filterParams, sortedClasses);
  filterEnrollRatioSortBy(filterParams, sortedClasses);

  const limit = parseInt(req.query.limit ?? '10');
  const cursor = req.query.cursor || undefined;

  const response = filterPagination({
    courseList: sortedClasses,
    limit: limit,
    cursor: cursor,
  });

  // MSW의 지연 시간 처리 (Express에서도 가능)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return res.status(200).json(response);
});

// POST /api/classes/enroll (MSW: http.post(`/classes/enroll`))
app.post('/api/classes/enroll', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (!response.user) {
    return res.sendStatus(response.status);
  }

  // MSW의 request.json() 대신 req.body 사용
  enrollCourses({ courseIds: req.body, user: response.user });

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

  return res.status(200).json([...response.user.enrolledCourses]);
});

// GET /api/classes/myCreated (MSW: http.get(`/classes/myCreated`))
app.get('/api/classes/myCreated', async (req, res) => {
  const response = getAuthUser(req.cookies);

  if (!response.user) {
    return res.sendStatus(response.status);
  }

  if (response.user.isTeacher) {
    return res.status(200).json([...response.user.createdClasses]);
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

    classList.push(newClass);
    response.user.createdClasses.push(newClass);

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
