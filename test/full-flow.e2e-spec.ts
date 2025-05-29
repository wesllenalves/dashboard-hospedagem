import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Full Flow (e2e)', () => {
  let app: INestApplication;
  let jwt: string;
  let hostingId: number;
  let stayId: number;
  let paymentId: number;
  let scheduleId: number;
  let messageId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve criar um usuário e fazer login', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'test@e2e.com', password: '123456', name: 'Test' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@e2e.com', password: '123456' })
      .expect(201);

    expect(res.body.access_token).toBeDefined();
    jwt = res.body.access_token;
  });

  it('deve criar uma hospedagem', async () => {
    const res = await request(app.getHttpServer())
      .post('/hostings')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        userId: 1,
        title: 'Apartamento Teste',
        address: 'Rua Teste, 123',
        type: 'apartamento',
        rooms: 2,
        rentValue: 1000,
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    hostingId = res.body.id;
  });

  it('deve criar uma estadia', async () => {
    const res = await request(app.getHttpServer())
      .post('/stays')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        guestName: 'Hóspede Teste',
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 86400000).toISOString(),
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    stayId = res.body.id;
  });

  it('deve criar um pagamento', async () => {
    const res = await request(app.getHttpServer())
      .post('/payments')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        amount: 1000,
        paidAt: new Date().toISOString(),
        method: 'pix',
        status: 'pago',
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    paymentId = res.body.id;
  });

  it('deve criar um agendamento', async () => {
    const res = await request(app.getHttpServer())
      .post('/schedules')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        type: 'checkin',
        scheduledAt: new Date().toISOString(),
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    scheduleId = res.body.id;
  });

  it('deve criar uma mensagem', async () => {
    const res = await request(app.getHttpServer())
      .post('/messages')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        to: '5511999999999',
        content: 'Bem-vindo!',
        sentAt: new Date().toISOString(),
        channel: 'whatsapp',
        status: 'enviado',
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    messageId = res.body.id;
  });

  it('deve obter estatísticas do dashboard', async () => {
    const res = await request(app.getHttpServer())
      .get('/dashboard/stats')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(res.body.totalHostings).toBeGreaterThan(0);
    expect(res.body.totalStays).toBeGreaterThan(0);
    expect(res.body.totalPayments).toBeGreaterThan(0);
    expect(res.body.totalSchedules).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });
});