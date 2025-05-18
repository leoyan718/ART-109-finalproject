// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
let sceneContainer = document.querySelector
("#scene-container");

let happyghost, sadghost, lamp;
let currentGhost = 'happy';
let lampOn, lampOff;
let isLampOn = true;


import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3a3a3a);
scene.fog = new THREE.Fog(0xcce0ff, 100, 100); //100 = farther



const camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(1,1,5);
scene.add(light);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);


camera.position.z = 14.5; //14.5

function animate(){
requestAnimationFrame(animate);

const ghost = currentGhost === 'happy' ? happyghost : sadghost; //model swap

if (ghost) {
let time = Date.now() * 0.001; //animation/ timeee
let radiusX = 0.05; 
let radiusZ = 0.05;
let speed = 0.75; //LITTLE GHOST's RUN SPEED

let x = Math.cos(time * speed) * radiusX;
let z = Math.sin(time * speed) * radiusZ;
let y = -3 + Math.sin(time * 9) * 0.7;
//helped from tutorial

ghost.position.set(x, y, z);

let nextX = Math.cos((time + 0.05) * speed) * radiusX;
let nextZ = Math.sin((time + 0.05) * speed) * radiusZ;
let angle = Math.atan2(nextZ - z, nextX - x);
ghost.rotation.y = -angle;
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
controls.enableZoom = false;    // Disabling any movement for the viewer
controls.enableRotate = false; 
controls.enablePan = false;    

const loader = new GLTFLoader(); 

loader.load('assets/HappyGhost(test).gltf', function(gltf){
    happyghost = gltf.scene;
    scene.add(happyghost);
    happyghost.scale.set(1.5,1.5,1.5);
    happyghost.position.y = -3;


});

loader.load('assets/SadGhost(test).gltf', function (gltf) {
    sadghost = gltf.scene;
    sadghost.scale.set(1.5, 1.5, 1.5);
    sadghost.position.y = -3;
});

const envLoader = new GLTFLoader();

envLoader.load('assets/ghostroom3.gltf', function(gltf) {
    const environment = gltf.scene;
    scene.add(environment);
    environment.position.set(0, -4, 0); 
    environment.scale.set(4, 4, 4); 
});

const lampLoader = new GLTFLoader();

lampLoader.load('assets/litlamptest3.gltf', function(gltf) {
    lampOn = gltf.scene;
    lampOn.scale.set(1.5, 1.5, 1.5);
    lampOn.position.set(4, -3, 5);
    scene.add(lampOn);
});

// unlit lamp
lampLoader.load('assets/lamp.gltf', function(gltf) {
    lampOff = gltf.scene;
    lampOff.scale.set(1.5, 1.5, 1.5);
    lampOff.position.set(4, -3, 5);
});


    
   
    window.addEventListener('click', () => {
        if (currentGhost === 'happy') {
            scene.remove(happyghost);
            scene.add(sadghost);
            currentGhost = 'sad';
        } else {
            scene.remove(sadghost);
            scene.add(happyghost);
            currentGhost = 'happy';
        }

        if (isLampOn && lampOn && lampOff) {
        scene.remove(lampOn);
        scene.add(lampOff);
        isLampOn = false;
    } else if (!isLampOn && lampOn && lampOff) {
        scene.remove(lampOff);
        scene.add(lampOn);
        isLampOn = true;
    }
    });





// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

animate();

