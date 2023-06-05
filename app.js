const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = process.env.PORT ?? 8080;

app.get('/', (req, res) => {
    res.json({ message: 'Hello world'});
})

app.get('/api/products', async (req, res) => {
    const products = await prisma.nombreModel.findMany({
        include: {
            reviews: {
                select: {
                    text: true,
                    rating: true
                },
            }
        }
    });

    return res.json(products);
})

app.post('/api/products', async (req, res) => {
    const data = req.body;
    const productCreated = await prisma.nombreModel.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price
        }
    });

    return res.json(productCreated);
})

app.post('/api/reviews', async (req, res) => {
    const data = req.body;
    const reviewCreated = await prisma.Review.create({
        data: {
            text: data.text,
            rating: data.rating,
            nombreModel: {
                connect: {
                    id: data.nombreModelId,                    
                }
            }
                        
        }
    });

    return res.json(reviewCreated);
})

app.get('/api/productss', async (req, res) => {
    const products = await prisma.nombreModel.findMany({
        where: {
            name: 'Anything'
        }
    });

    return res.json(products);
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
