// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
let sceneContainer = document.querySelector
("#scene-container");

let happyghost;


import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3a3a3a);
scene.fog = new THREE.Fog(0xcce0ff, 10, 50);



const camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(1,1,5);
scene.add(light);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);




camera.position.z = 14.5;

function animate(){
requestAnimationFrame(animate);

    if (happyghost) {
        let time = Date.now() * 0.001; // convert to seconds
        let radiusX = 0.05; // how wide the path is
        let radiusZ = 0.05; // how tall the path is
        let speed = 0.75; // how fast the ghost moves

        // Move in an elliptical path
        let x = Math.cos(time * speed) * radiusX;
        let z = Math.sin(time * speed) * radiusZ;

        happyghost.position.x = x;
        happyghost.position.z = z;
        
        let bounceHeight = 0.7;
        let bounceSpeed = 9; 
        let y = -3 + Math.sin(time * bounceSpeed) * bounceHeight;

         happyghost.position.set(x, y, z);

        // Make the ghost face the direction it's moving
        let nextX = Math.cos((time + 0.05) * speed) * radiusX;
        let nextZ = Math.sin((time + 0.05) * speed) * radiusZ;
        let angle = Math.atan2(nextZ - z, nextX - x);
        happyghost.rotation.y = -angle; // rotate to face movement direction
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

}

window.addEventListener('resize', onWindowResize, false);


const lightleft = new THREE.DirectionalLight(0x404040, 1.5); // Main light
lightleft.position.set(3, 4, 5);
scene.add(lightleft);


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/HappyGhost(test).gltf', function(gltf){
    happyghost = gltf.scene;
    scene.add(happyghost);
    happyghost.scale.set(1.5,1.5,1.5);
    happyghost.position.y = -3;


});



// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

animate();

