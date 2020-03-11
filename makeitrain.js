

Matter.use('matter-collision-events');
console.log(Matter);
const cats = ["https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_1.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_2.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_3.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_4.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_5.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_6.png"
];
const rainbow_cats = ["https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_1_red.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_2_yellow.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_3_purple.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_4_green.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_5_blue.png", "https://3681a2d2784956323369-b57f388ffba74a9d5600392ce75da4b1.ssl.cf2.rackcdn.com/cats/cat_6_orange.png"
];
let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Events = Matter.Events;
let Body = Matter.Body;
let Svg = Matter.Svg;
let Vertices = Matter.Vertices;
let MouseConstraint = Matter.MouseConstraint;
let Mouse = Matter.Mouse;
let engine = Engine.create();
const defaultCategory = 0x0001;
const redCategory = 0x0002;
const greenCategory = 0x0004;
const blueCategory = 0x0008;
// INIT
function init() {
  $("canvas").remove();
  let colorOne = `#${Math.random().toString(16).slice(2, 8).toUpperCase()}`
  let colorTwo = '#fff'
  let orientation = '180deg'
  document.body.style.backgroundImage = `linear-gradient(${orientation}, ${colorOne}, ${colorTwo})`;
  let width = $(window).width();
  let height = $(window).height();
  let sx = width >= 414 ? 1 : 0.5
  let sy = width >= 414 ? 1 : 0.5
  let vmin = Math.min(width, height);
  World.clear(engine.world);
  Engine.clear(engine);
  engine = Engine.create({
    //positionIterations: 4,
    //velocityIterations: 4,
    //constraintIterations: 4
  });
  engine.timing.timeScale = 1
  let render = Render.create({
    element: document.body,
    engine,
    setPixelRatio: 'auto',
    options: {
      showAngleIndicator: false,
      showDebug: false,
      wireframes: false,
      background: 'transparent',
      width,
      height
    }
  });
  World.add(engine.world, [
    Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true
    }),
    Bodies.rectangle(width / 2, -1000, width, 100, {
      isStatic: true
    }),
    Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true
    }),
    Bodies.rectangle(width + 50, height / 2, 100, height, {
      isStatic: true
    })
  ]);
  let cArr = [];
  cats.forEach((i, v) => {
    cArr[v] = Bodies.circle(Math.random() * width, Math.random() * height - height, 100, {
      restitution: 0.75 + Math.random(),
      friction: 1 + Math.random(),
      //frictionAir: 0.0001,
      frictionStatic: 0,
      density: 0.0000000001 + Math.random(),
      //inertia: Infinity,
      collisionFilter: {
        category: redCategory,
        mask: defaultCategory
      },
      render: {
        sprite: {
          texture: i,
          xScale: sx,
          yScale: sy
        }
      }
    })
    World.add(engine.world, cArr[v]);
  })
  $('#makeItRain').off('click')
  $('#makeItRain').on('click', event => {
  let cArr2 = [];
  for (let i = 4 - 1; i >= 0; i--) {
  cats.forEach((i, v) => {
    cArr2[v] = Bodies.circle(Math.random() * width, Math.random() * (height / 10) - height, 100, {
      restitution: 1.0001,
      friction: 0.1,
      frictionAir: 0,
      frictionStatic: 10,
      density: 0.01,
      //inertia: Infinity,
      collisionFilter: {
        category: redCategory , 
        mask: redCategory | greenCategory | blueCategory
      },
      render: {
        sprite: {
          texture: i,
          xScale: sx,
          yScale: sy
        }
      }
    })
    World.add(engine.world, cArr2[v]);
  })
 }
 cArr2.forEach((i, v) => {
   Body.setAngularVelocity(i, (0.02 * Math.random() * v));
   Body.setAngle(i, -Math.PI * 0.26);
   Body.setVelocity(i, { x: 0, y: -10 });
 })
});

  $('#makeItRainbow').off('click')
  $('#makeItRainbow').on('click', event => {
  let cArr2 = [];
  for (let i = 4 - 1; i >= 0; i--) {
  rainbow_cats.forEach((i, v) => {
    cArr2[v] = Bodies.circle(Math.random() * width, Math.random() * (height / 10) - height, 100, {
      restitution: 1.0001,
      friction: 0.1,
      frictionAir: 0,
      frictionStatic: 10,
      density: 0.01,
      //inertia: Infinity,
      collisionFilter: {
        category: redCategory , 
        mask: redCategory | greenCategory | blueCategory
      },
      render: {
        sprite: {
          texture: i,
          xScale: sx,
          yScale: sy
        }
      }
    })
    World.add(engine.world, cArr2[v]);
  })
 }
 cArr2.forEach((i, v) => {
   Body.setAngularVelocity(i, (0.02 * Math.random() * v));
   Body.setAngle(i, -Math.PI * 0.26);
   Body.setVelocity(i, { x: 0, y: -10 });
 })
});

  // add mouse control
  const mouse = Mouse.create(render.canvas);

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  let counter = 0;
  let scaleFactor = 1.01;
  Events.on(engine, 'beforeUpdate', event => {
    counter += 1;
    if (counter >= 60 * 10) {
    cArr.forEach((i, v) => {

      console.log(v + ' : ' + i.position.y)
      //Body.applyForce( i, {x: i.position.x, y: i.position.y}, {x: 0, y: -35 + Math.random()});
      counter = 0;
      scaleFactor = 1;
      /*
      if (counter >= 60 * 1.5) {
        //Body.setVelocity(i, { x: 0, y: -10 });
        //Body.setAngle(i, -Math.PI * 0.26);
        cArr.forEach((i, v) => {
          // Body.setAngularVelocity(i, (2 * Math.random() * v));
        })
        // reset counter
        // counter = 0;
        // scaleFactor = 1;
      } else {
        cArr.forEach((i, v) => {
          // Body.setAngularVelocity(i, (-2 * Math.random() * v));
        })
      }
      */
    })
    }
  });
  World.add(engine.world, mouseConstraint);
  // keep the mouse in sync with rendering
  render.mouse = mouse;
  Engine.run(engine);
  Render.run(render);
}
init();
$(window).resize(() => {
  init();
});
(function render() {
  window.requestAnimationFrame(render);
})();