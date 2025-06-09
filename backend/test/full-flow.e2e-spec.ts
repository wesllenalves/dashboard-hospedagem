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
  let userId: number;
  let reviewId: number;
  let availabilityId: number;
  let priceId: number;

  const uniqueEmail = `test+${Date.now()}@e2e.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve criar um usuário e fazer login', async () => {
    const resUser = await request(app.getHttpServer())
      .post('/users')
      .send({ email: uniqueEmail, password: '123456', name: 'Test' })
      .expect(201);

    userId = resUser.body.id; 

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: uniqueEmail, password: '123456' })
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

  it('deve criar uma disponibilidade', async () => {
    const res = await request(app.getHttpServer())
      .post('/availability')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        date: new Date().toISOString(),
        status: 'disponível',
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    availabilityId = res.body.id;
  });

  it('deve criar um preço dinâmico', async () => {
    const res = await request(app.getHttpServer())
      .post('/prices')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        date: new Date().toISOString(),
        value: 300.0,
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    priceId = res.body.id;
  });

  it('deve criar uma avaliação', async () => {
    // Primeiro, cria uma estadia para associar a avaliação
    const stayRes = await request(app.getHttpServer())
      .post('/stays')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        hostingId,
        guestName: 'Hóspede Avaliação',
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 86400000).toISOString(),
      })
      .expect(201);

    const stayReviewId = stayRes.body.id;

    const res = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        stayId: stayReviewId,
        rating: 5,
        comment: 'Excelente!',
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    reviewId = res.body.id;

  });

  afterAll(async () => {
    if (hostingId) {
      const staysRes = await request(app.getHttpServer())
        .get('/stays')
        .set('Authorization', `Bearer ${jwt}`);
      const stays = staysRes.body.filter(s => s.hostingId === hostingId);

      for (const stay of stays) {
        const reviewsRes = await request(app.getHttpServer())
          .get('/reviews')
          .set('Authorization', `Bearer ${jwt}`);
        const reviews = reviewsRes.body.filter(r => r.stayId === stay.id);
        for (const review of reviews) {
          await request(app.getHttpServer())
            .delete(`/reviews/${review.id}`)
            .set('Authorization', `Bearer ${jwt}`);
        }
      }

      // Aguarde um pequeno tempo para garantir que as deleções sejam processadas
      await new Promise(res => setTimeout(res, 200));

      for (const stay of stays) {
        await request(app.getHttpServer())
          .delete(`/stays/${stay.id}`)
          .set('Authorization', `Bearer ${jwt}`);
      }
    }

    // 4. Demais deleções (availability, price, message, schedule, payment)
    if (availabilityId) {
      await request(app.getHttpServer())
        .delete(`/availability/${availabilityId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }
    if (priceId) {
      await request(app.getHttpServer())
        .delete(`/prices/${priceId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }
    if (messageId) {
      await request(app.getHttpServer())
        .delete(`/messages/${messageId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }
    if (scheduleId) {
      await request(app.getHttpServer())
        .delete(`/schedules/${scheduleId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }
    if (paymentId) {
      await request(app.getHttpServer())
        .delete(`/payments/${paymentId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }

    // 5. Agora pode deletar a hospedagem
    if (hostingId) {
      await request(app.getHttpServer())
        .delete(`/hostings/${hostingId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }

    // 6. Por último, delete o usuário
    if (userId) {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${jwt}`);
    }

    await app.close();
  });
});