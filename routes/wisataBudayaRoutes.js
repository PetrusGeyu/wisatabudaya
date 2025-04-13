// wisataBudayaRoutes.js
const wisataBudayaRoutes = [
    {
      method: 'GET',
      path: '/api/wisata',
      handler: async (request, h) => {
        const [rows] = await request.mysql.query('SELECT * FROM wisata');
        return rows;
      },
    },
    {
      method: 'POST',
      path: '/api/wisata',
      handler: async (request, h) => {
        const { nama, kota, jenis, rating, deskripsi, user_id } = request.payload;
        const [result] = await request.mysql.query(
          'INSERT INTO wisata (nama, kota, jenis, rating, deskripsi, user_id) VALUES (?, ?, ?, ?, ?, ?)',
          [nama, kota, jenis, rating, deskripsi, user_id]
        );
        return h.response({ message: 'Wisata ditambahkan', id: result.insertId }).code(201);
      },
    },
    {
      method: 'DELETE',
      path: '/api/wisata/{id}',
      handler: async (request, h) => {
        const { id } = request.params;
        await request.mysql.query('DELETE FROM wisata WHERE id = ?', [id]);
        return { message: 'Wisata dihapus' };
      },
    },
    {
      method: 'GET',
      path: '/api/budaya',
      handler: async (request, h) => {
        const [rows] = await request.mysql.query('SELECT * FROM budaya');
        return rows;
      },
    },
    {
      method: 'POST',
      path: '/api/budaya',
      handler: async (request, h) => {
        const { budaya, kota, jenis, rating, deskripsi, user_id } = request.payload;
        const [result] = await request.mysql.query(
          'INSERT INTO budaya (budaya, kota, jenis, rating, deskripsi, user_id) VALUES (?, ?, ?, ?, ?, ?)',
          [budaya, kota, jenis, rating, deskripsi, user_id]
        );
        return h.response({ message: 'Budaya ditambahkan', id: result.insertId }).code(201);
      },
    },
    {
      method: 'DELETE',
      path: '/api/budaya/{id}',
      handler: async (request, h) => {
        const { id } = request.params;
        await request.mysql.query('DELETE FROM budaya WHERE id = ?', [id]);
        return { message: 'Budaya dihapus' };
      },
    },
  ];
  
  module.exports = wisataBudayaRoutes;
  