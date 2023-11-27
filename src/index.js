const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const sequelize = require('./db');
const Product = require('./models/Product');
const Category = require('./models/Category')
const Product_Category = require('./models/Product_Category')

const app = express();
const PORT = process.env.PORT || 3001;

Product.belongsToMany(Category, { through: 'Product_Category' })
Category.belongsToMany(Product, { through: 'Product_Category' });

app.use(bodyParser.json());

app.use('/api', apiRoutes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
