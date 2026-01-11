// owner.js
const ADMIN_KEY = 'fg5723b2cxzvuzt24irg634x';

module.exports = async function (fastify) {
  // Track requests globally
  fastify.addHook('onRequest', async (request, reply) => {
    // You could increment a counter here if needed
    request.raw._startTime = Date.now();
  });

  // /owner route
  fastify.get('/owner', async (request, reply) => {
    const key = request.query.key;

    if (key !== ADMIN_KEY) {
      return reply.code(403).send({ error: 'Forbidden' });
    }

    const ownerData = {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      time: new Date().toISOString(),
      url: request.url,
      totalVisits: fastify.totalVisits || 0,
      proxyUsed: request.headers['x-forwarded-for'] || null,
      errors: 0
    };

    reply.code(200).send(ownerData);
  });
};
