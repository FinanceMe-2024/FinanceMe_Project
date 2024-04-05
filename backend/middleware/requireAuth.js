const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = async (req, res, next) => {
  // Verificar si existe el encabezado de autorización
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // Extraer el token JWT
  const token = authorization.split(' ')[1];

  try {
    // Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // Obtener el usuario asociado con el token
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new Error('User not found');
    }

    // Agregar el usuario al objeto de solicitud (req) para que esté disponible en las rutas protegidas
    req.user = user;
    console.log('User authenticated:', user.email); // Log de depuración
    next(); // Continuar con la siguiente función de middleware o controlador
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = requireAuth;
