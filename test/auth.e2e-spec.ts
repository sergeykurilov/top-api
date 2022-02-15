import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'a2@a.ru',
  password: '1',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - fail', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'aa' })
      .expect(401)
      .then(({ body }: request.Response) => {
        expect(body.access_token).not.toBeDefined();
        done();
      });
  });

  it('/auth/register (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...loginDto, login: 'aaaa@ru.com' })
      .expect(400, {
        statusCode: 400,
        message: 'Такой пользователь уже был зарегистрирован.',
        error: 'Bad Request',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
