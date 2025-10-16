const request = require('supertest');
const app = require('../app'); // ملف التطبيق الرئيسي

describe("API جولات التمريض", () => {
  it("يضيف جولة جديدة", async () => {
    const res = await request(app)
      .post('/api/rounds')
      .send({
        nurse: "سارة محمد",
        mrn: "123456",
        patient: "أحمد محمد",
        department: "3B",
        room: "305",
        bed: "A",
        date: "2025-10-15",
        time: "09:00",
        pain: "2",
        position: "نعم",
        potty: "لا",
        possessions: "نعم",
        pump: "تم الفحص",
        extra: "",
        else: "",
        status: "مكتمل"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.nurse).toBe("سارة محمد");
  });

  it("يعرض كل الجولات", async () => {
    const res = await request(app).get('/api/rounds');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});