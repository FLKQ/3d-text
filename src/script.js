import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import typeface from '../static/fonts/helvetiker_regular.typeface.json'


const scene = new THREE.Scene()
const gui = new dat.GUI()


const font = new THREE.Font(typeface);
console.log(font);

const textGeometry = new THREE.TextBufferGeometry(
    'FLKQCODE',
    {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
    }
)
textGeometry.computeBoundingBox()

textGeometry.center()

//  textGeometry.translate(
//      (textGeometry.boundingBox.max.x - 0.02)  * -0.5,
//      (textGeometry.boundingBox.max.y - 0.02)  * -0.5,
//      (textGeometry.boundingBox.max.z - 0.03)  * -0.5
//  )

const material = new THREE.MeshStandardMaterial()

material.roughness = 0.5
material.metalness = 1

const ambientLight = new THREE.AmbientLight(0xfff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xfffff, 0.5)

pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

gui.add(material, 'metalness', 0, 1, 0.0001)
gui.add(material, 'roughness', 0, 1, 0.0001)


const text = new THREE.Mesh(textGeometry, material)
scene.add(text)

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)


for (let i = 0; i < 100; i++) {

    const donut = new THREE.Mesh(donutGeometry, material)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
}

/**
 * Base
 */
// Debug


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene


//axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('textures/matcaps/4.png')

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()