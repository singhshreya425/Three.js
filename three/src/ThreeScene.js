import React, { useRef,useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeScene() {
  const sceneRef = useRef();
  const [insideCar, setInsideCar] = useState(false);
 

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Set up camera controls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Create the house
    const house = new THREE.Object3D();


     // Create a car
     const carGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.4);
     const carMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Red color for the car
     const car = new THREE.Mesh(carGeometry, carMaterial);
     car.position.set(1.5, 0.15, -1.2); // Adjust the position in the front yard
     house.add(car);
 
      
     // Adjust the camera position to view inside the house
     camera.position.set(0, 1.2, 2.5);
     camera.lookAt(0, 1, 0);


    // Create a camera for inside the car
    const insideCarCamera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      insideCarCamera.position.set(0, 0.2, 0.5); // Adjust the camera position inside the car
      insideCarCamera.lookAt(0, 0.2, 0); // Adjust the lookAt target
  
      const carCameraHelper = new THREE.CameraHelper(insideCarCamera);
      car.add(carCameraHelper);
  
    

    // Create the sky
    const skyGeometry = new THREE.BoxGeometry(3, 3, 3);
    const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    house.add(sky);

    // Create the main building
    const wallGeometry = new THREE.BoxGeometry(1, 1.5, 1);
    const wallTexture = new THREE.TextureLoader().load(
      "../procedural_hong_kong_building/textures/photo-brick.jpg"
    ); // Replace with an actual texture
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 4); // Adjust for texture tiling
    const wallMaterial = new THREE.MeshPhongMaterial({
      color: 0x964b00,
      map: wallTexture,
    });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    house.add(walls);

    // Create additional walls to enclose the house
    const frontWallGeometry = new THREE.BoxGeometry(1, 1.5, 0.05);
    const frontWallMaterial = new THREE.MeshPhongMaterial({ color: 0x964b00 }); // You can set the color for the front wall
    const frontWall = new THREE.Mesh(frontWallGeometry, frontWallMaterial);
    frontWall.position.set(0, 0.75, 0.53);
    house.add(frontWall);

    const backWallGeometry = new THREE.BoxGeometry(1, 1.5, 0.05);
    const backWallMaterial = new THREE.MeshPhongMaterial({ color: 0x964b00 }); // You can set the color for the back wall
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 0.75, -0.53);
    house.add(backWall);

    const leftWallGeometry = new THREE.BoxGeometry(0.05, 1.5, 1);
    const leftWallMaterial = new THREE.MeshPhongMaterial({ color: 0x964b00 }); // You can set the color for the left wall
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.position.set(-0.53, 0.75, 0);
    house.add(leftWall);

    const rightWallGeometry = new THREE.BoxGeometry(0.05, 1.5, 1);
    const rightWallMaterial = new THREE.MeshPhongMaterial({ color: 0x964b00 }); // You can set the color for the right wall
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.position.set(0.53, 0.75, 0);
    house.add(rightWall);

    // Create the roof for the front yard
    const frontYardRoofGeometry = new THREE.BoxGeometry(1, 0.2, 1);
    const frontYardRoofMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b0000,
    });
    const frontYardRoof = new THREE.Mesh(
      frontYardRoofGeometry,
      frontYardRoofMaterial
    );
    frontYardRoof.position.set(0, 1.6, 0.53);
    house.add(frontYardRoof);

    // Create the roof for the back yard
    const backYardRoofGeometry = new THREE.BoxGeometry(1, 0.2, 1);
    const backYardRoofMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b0000,
    });
    const backYardRoof = new THREE.Mesh(
      backYardRoofGeometry,
      backYardRoofMaterial
    );
    backYardRoof.position.set(0, 1.6, -0.53);
    house.add(backYardRoof);

    // Create the roof
    const roofGeometry = new THREE.ConeGeometry(1.2, 0.6, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 1.5, 0); // Adjust the position
    roof.rotation.set(Math.PI / 4, 0, 0);
    house.add(roof);

    // Create the door
    const doorGeometry = new THREE.BoxGeometry(0.2, 1, 0.05);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, -0.25, 0.53);
    house.add(door);

    // Create windows
    const windowGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.05);
    const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x6495ed });
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(0.6, 0.7, 0.6);
    house.add(window1);
    const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
    window2.position.set(-0.6, 0.7, 0.6);
    house.add(window2);


   

    // Create a chimney
    const chimneyGeometry = new THREE.BoxGeometry(0.15, 0.7, 0.15); // Adjust chimney size
    const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(0.8, 1.7, -0.6); // Adjust the position
    house.add(chimney);

    // Add smoke particles coming out of the chimney (similar to the previous modification)
    const smokeGeometry = new THREE.BufferGeometry();
    const smokePositions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      smokePositions[i * 3] = (Math.random() - 0.5) * 0.2; // Adjust position range
      smokePositions[i * 3 + 1] = Math.random() * 0.5 + 1.7; // Adjust Y position
      smokePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Adjust position range
    }
    smokeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(smokePositions, 3)
    );
    const smokeMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.02,
    });
    const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);
    house.add(smokeParticles);

    // Set the camera position
    camera.position.set(1.5, 1.5, 3);

    // ...

    // Create a table
    const tableGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.7);
    const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0.2, 0.55, 0.3); // Adjust the position inside the house
    house.add(table);

    
// Create a chair
const chairGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.4);
const chairMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const chair1 = new THREE.Mesh(chairGeometry, chairMaterial);
chair1.position.set(0.4, 0.3, 0.3); // Adjust the position
house.add(chair1);

// Adjust the camera position to view inside the house
camera.position.set(0, 1.2, 2.5);
camera.lookAt(0, 1, 0);


// Create a lawn and garden
const lawnGeometry = new THREE.PlaneGeometry(2.5, 2.5,10, 10);

const lawnMaterial = new THREE.MeshPhongMaterial({color: 0x00aa00  });
const lawn = new THREE.Mesh(lawnGeometry, lawnMaterial);
lawn.rotation.x = -Math.PI / 2; // Lay the lawn flat on the ground
lawn.scale.set(1, 1, 1);//// Adjust the size of the lawn
lawn.position.set(1.5, 0, 0); // Position the lawn
scene.add(lawn);

// Create a tree
const treeTrunkGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 16);
const treeTrunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
treeTrunk.position.set(1.2, 0.1, 0); // Adjust the position
scene.add(treeTrunk);

const treeLeavesGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const treeLeavesMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const treeLeaves = new THREE.Mesh(treeLeavesGeometry, treeLeavesMaterial);
treeLeaves.position.set(1.2, 0.3, 0); // Adjust the position
scene.add(treeLeaves);

 // Create apples and attach them to the tree
 for (let i = 0; i < 20; i++) { // You can change the number of apples
    const appleGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const appleMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const apple = new THREE.Mesh(appleGeometry, appleMaterial);

    // Position apples on the tree branches randomly
    const randomX = Math.random() * 0.1 - 0.05; // Adjust the range to place apples
    const randomY = Math.random() * 0.1 - 0.05; // Adjust the range to place apples
    const randomZ = Math.random() * 0.1 - 0.05; // Adjust the range to place apples
    apple.position.set(1.2 + randomX, 0.25 + randomY, randomZ);

    scene.add(apple);
  }

// Create humans standing outside the house
const humanMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, flatShading: false });

const human1Geometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);

const human1 = new THREE.Mesh(human1Geometry, humanMaterial);
human1.position.set(0.2, 0.15, 0.8); // Adjust the position

scene.add(human1);

const human2Geometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
const human2Material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const human2 = new THREE.Mesh(human2Geometry, human2Material);
human2.position.set(-0.2, 0.15, 0.8); // Adjust the position
scene.add(human2);


// Create a floor with basic color
const floorGeometry = new THREE.PlaneGeometry(3, 3);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // Brown color for the floor
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, 0, 0);
scene.add(floor);

// Create a ball
const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0.2, 0.1, 0.4); // Adjust the ball's position inside the house
house.add(ball);




    // Add lights for better shading
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);

    scene.add(house);

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (insideCar) {
        renderer.render(scene, camera);
      } else {
        renderer.render(scene, camera);
      }

      // Rotate the house
      house.rotation.y += 0.005;

      controls.update();
    //   renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }}/>;
}

export default ThreeScene;
