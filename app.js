const express = require('express');
const { sequelize } = require('./models');
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');

const app = express();
app.use(express.json());

// Routes will go here later
// Routes
app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
