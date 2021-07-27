const router = require('express').Router();
const sequelize = require('../config/connection');
const { Campground_Post, Trail_Post, Campground_Checklist, Trail_Checklist, CampgroundComment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/camp-form', (req, res) => {
    res.render("camp-form") 
})
//POST CAMP GROUND
router.post('/camp-post', async (req, res) => {
    console.log("********* EXECUTING POST CAMGROUND *********");
       try {
        const dbCampData = await Campground_Post.create({
            id : req.body.id,
            published: req.body.published,
            tripStart: req.body.tripStart,
            tripEnd: req.body.tripEnd,
            campgroundName: req.body.campgroundName,
            locationCity: req.body.locationCity,
            locationState: req.body.locationState,
            comfort: req.body.comfort,
            title: req.body.title,
            userStory: req.body.userStory,
            user_id: req.body.user_id
        });
        req.session.save(() => {
            req.session.loggedIn = true;      
            res.status(200).json(dbCampData);
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
});

//UPDATE CAMPGROUND POST
router.put('/camp-post/:id',(req, res) => {
    console.log("*********EXECUTING UPDATE CAMPGROUND **********")
    Campground_Post.update({
        published: req.body.published,
        tripStart: req.body.tripStart,
        tripEnd: req.body.tripEnd,
        campgroundName: req.body.campgroundName,
        locationCity: req.body.locationCity,
        locationState: req.body.locationState,
        comfort: req.body.comfort,
        title: req.body.title,
        userStory: req.body.userStory,
    }, {
        where: {
            id: req.params.id
      }})
      .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

})
//DELETE POST
router.delete('/camp-post/:id', (req,res) => {
    console.log("******** EXECUTING DELETE POST *************")
    Campground_Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// GET ALL CAMP-POSTS for
router.get('/camp-post', async (req, res) => {
    
        console.log("********** EXECUTING CAMPGROUND ALL GET **************");
        Campground_Post.findAll({
            attributes: ['id',
                'published',
                'tripStart',
                'tripEnd',
                'campgroundName',
                'locationCity',
                'locationState',
                'comfort',
                'title',
                'userStory',
                'user_id'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: CampgroundComment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => res.json(dbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//       const dbCampPostData = await Campground_Post.findAll({
//         include: [
//           {
//             model: Campground_Post,
//             attributes: [
//                             'id',
//                             'published',
//                             'tripStart',
//                             'tripEnd',
//                             'campgroundName',
//                             'locationCity',
//                             'locationState',
//                             'comfort',
//                             'title',
//                             'userStory',
//                             'user_id'
//                         ],
//             }
//         ],
//       });
  
//       const campposts = dbCampPostData.map((campposts) =>
//         campposts.get({ plain: true })
//       );
  
//       res.render('camp-post', {
//         campposts,
//         loggedIn: req.session.loggedIn,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

// router.get('/camp-post', (req, res) => {
//     Campground_Post.findAll({
//         attributes: [
//             'published',
//             'tripStart',
//             'tripEnd',
//             'campgroundName',
//             'locationCity',
//             'locationState',
//             'comfort',
//             'title',
//             'userStory'
//         ],
//         include: [{
//             model:User,
//             attributes: ['username']
//         }
//     ]
//     })
//     .then(dbPostData => {
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render("camp-post");
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
    
// })

router.get('/choose-path', (req, res) => {
    res.render("choose-path")
})

router.get('/global-dashboard', (req, res) => {
    res.render("global-dashboard") 
})

router.get('/landing-page', (req, res) => {
    res.render("landing-page") 
})


router.get('/signup', (req, res) => {
    res.render("signup") 
})

router.get('/trail-form', (req, res) => {
    res.render("trail-form") 
})

router.get('/trail-post', (req, res) => {
    res.render("trail-post") 
})

router.get("/user-dashboard", (req, res)=> {

    /*
        TODO
        In order to get the data from the db instead, 
        make a query before the render either right here
        or better yet in another controller file. 

        That query will get you data from your api/db, 
        and then you can pass that as an object the render

        ex psuedocode: 

        let queryData = await api.query()
        res.render('user-dashboard', queryData)


    */
    res.render('user-dashboard', {
        campposts:  [
            {
                title: 'Sleepy Night',
                date: 'July 18th, 2021',
                location: 'yellowstone park',
                user: 'Snow White',
                image: 'https://picsum.photos/id/237/320/240'
            },
            {
                title: 'Twilight Encounter',
                date: 'July 18th, 2021',
                location: 'yellowstone park',
                user: 'John Smith',
                image: 'https://picsum.photos/id/237/320/240'
            },
            {
                title: 'Hungry Bear',
                date: 'July 18th, 2021',
                location: 'yellowstone park',
                user: 'Yogi Bear',
                image: 'https://picsum.photos/id/237/320/240'
            },
        ]
    })
})






//make routes for remaining handlebar files

router.get('/', (req, res) => {
    // Camground_Post.findAll({
    //         where: {
    //             user_id: req.session.user_id
    //         },
    //         attributes: [
    //             'id',
    //             'title',
    //             'content',
    //             'created_at'
    //         ],
    //         include: [{
    //                 model: Comment,
    //                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    //                 include: {
    //                     model: User,
    //                     attributes: ['username']
    //                 }
    //             },
    //             {
    //                 model: User,
    //                 attributes: ['username']
    //             }
    //         ]
    //     })
    //     .then(dbPostData => {
    //         const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('landing-page');
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });
});

// router.get('/', withAuth, (req, res) => {
//     Camground_Post.findAll({
//             where: {
//                 user_id: req.session.user_id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             include: [{
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             const posts = dbPostData.map(post => post.get({ plain: true }));
//             res.render('dashboard', { posts, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });



router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('user-dashboard');
        return;
    }
    res.render('login');
});




module.exports = router;