const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express()


// connect to mongo DB - from mongoDb cluster - make sure you have not used any special character in url/password like...   @,-,+,>
const dbURI = 'mongodb+srv://nodeSSRblogEJS:567324rtzhjDFRGTH@cluster0.qt3ih.mongodb.net/Node-EJSr-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log("error" + err))

// register view engine
app.set('view engine', 'ejs')

// custom views express/ejs folder
//app.set('views', 'myViews')


// listen for requests after connect to mongodb
// app.listen(3000) 



// CUSTOM MIDDLEWARE - add next() to continue to the next MIDDLEWARE
// app.use((req ,res, next) => {
//     console.log('new request made:')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })

// app.use((req ,res, next) => {
//     console.log('in the next middleware')
//     next()
// })


// express middleware - static files - all in the folder "public" is public to the browser - eg. "styles.css" http://localhost:3000/styles.css
app.use(express.static('public'))


// middleware - collects all form encoded data and it pass in object 
app.use(express.urlencoded({ extended: true }))

// morgan middleware logs
app.use(morgan('dev'))
// app.use(morgan('tiny'))


// create new blog
// mongoose and mongo sandbox routes - test interaction with db
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog from db 2',
//         snippet: 'blog snippet from db',
//         body: 'blog body from db'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })


// // display all blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((results) => {
//             res.send(results)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })


// // display single blog by ID
// app.get('/single-blog', (req, res) => {
//     Blog.findById('5f2a25c0a5f7ef0214731d5e')
//         .then((results) => {
//             res.send(results)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})


// blog routes
app.use('/blogs', blogRoutes)


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})